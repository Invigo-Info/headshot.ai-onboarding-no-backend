import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database, Tables } from '@/types/database.types'

type EditedRowSlim = Pick<Tables<'edited_images'>, 'id' | 'user_id' | 'storage_path' | 'created_at'>
import { CACHE_TAGS } from '@/lib/cache-config'

// DRY RUN toggle: keep true for testing; when ready, switch to false and uncomment ops
const DRY_RUN = true

export const maxDuration = 600; // 10 minutes

// Buckets
const BUCKETS = {
	trainingUploads: 'user-uploads',
	generatedOutputs: 'output-images',
	editorUploads: 'recent-uploads',
	editedImages: 'edited-images',
} as const

// Helpers
function chunkArray<T>(items: T[], size: number): T[][] {
	const chunks: T[][] = []
	for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
	return chunks
}

function toIsoAgo(days: number): string {
	const d = new Date()
	d.setUTCDate(d.getUTCDate() - days)
	return d.toISOString()
}

function normalizeStoragePaths(input: unknown): string[] {
	if (!input) return []
	if (Array.isArray(input)) return input.map(v => String(v)).filter(Boolean)
	if (typeof input === 'string') return [input]
	if (typeof input === 'object') {
		try {
			const maybe = JSON.parse(JSON.stringify(input))
			if (Array.isArray(maybe)) return maybe.map(v => String(v)).filter(Boolean)
			if (typeof maybe.path === 'string') return [maybe.path]
			if (Array.isArray(maybe.paths)) return maybe.paths.map((p: unknown) => String(p)).filter(Boolean)
		} catch {}
	}
	return []
}

async function deleteObjectsBatch(
	supabase: SupabaseClient<Database>,
	bucket: string,
	paths: string[],
): Promise<{ bucket: string; attempted: number; ok: number; errors: number }[]> {
	const results: { bucket: string; attempted: number; ok: number; errors: number }[] = []
	const chunks = chunkArray(paths, 100)
	for (const c of chunks) {
		if (c.length === 0) continue
		if (DRY_RUN) {
			console.log(`[DRY] delete from bucket=${bucket}`, c)
			results.push({ bucket, attempted: c.length, ok: c.length, errors: 0 })
			continue
		}
		const { error } = await supabase.storage.from(bucket).remove(c)
		results.push({ bucket, attempted: c.length, ok: error ? 0 : c.length, errors: error ? c.length : 0 })
	}
	return results
}

async function deleteReplicateResources(modelId?: string | null, versionId?: string | null) {
	if (!modelId && !versionId) {
		console.log('[INFO] Replicate cleanup skipped — no modelId or versionId found')
		return { attempted: 0, ok: 0, errors: 0 }
	}

	console.log('[INFO] Replicate cleanup', { modelId: modelId ?? 'N/A', versionId: versionId ?? 'N/A' })

	if (DRY_RUN) {
		if (versionId && modelId) {
			console.log(`[DRY] Would delete Replicate model version: ${modelId}/versions/${versionId}`)
		}
		if (modelId) {
			console.log(`[DRY] Would delete Replicate model: ${modelId}`)
		}
		if (!modelId) {
			console.log(`[DRY] Skipping model deletion — modelId is missing`)
		}
		if (!versionId) {
			console.log(`[DRY] Skipping version deletion — versionId is missing`)
		}
		return { attempted: Number(Boolean(modelId)) + Number(Boolean(versionId)), ok: Number(Boolean(modelId)) + Number(Boolean(versionId)), errors: 0 }
	}

	let ok = 0
	let errors = 0
	const attempted = Number(Boolean(modelId)) + Number(Boolean(versionId))

	if (versionId && modelId) {
		try {
			const res = await fetch(`https://api.replicate.com/v1/models/${modelId}/versions/${versionId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` },
			})
			if (res.ok) {
				ok++
				console.log(`[OK] Deleted Replicate model version: ${modelId}/versions/${versionId}`)
			} else {
				errors++
				console.error(`[ERROR] Failed to delete Replicate model version: ${modelId}/versions/${versionId} — ${res.status} ${res.statusText}`)
			}
		} catch (e) {
			errors++
			console.error(`[ERROR] Network error deleting Replicate model version: ${modelId}/versions/${versionId}`, e)
		}
	}

	if (modelId) {
		try {
			const res = await fetch(`https://api.replicate.com/v1/models/${modelId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` },
			})
			if (res.ok) {
				ok++
				console.log(`[OK] Deleted Replicate model: ${modelId}`)
			} else {
				errors++
				console.error(`[ERROR] Failed to delete Replicate model: ${modelId} — ${res.status} ${res.statusText}`)
			}
		} catch (e) {
			errors++
			console.error(`[ERROR] Network error deleting Replicate model: ${modelId}`, e)
		}
	}

	return { attempted, ok, errors }
}

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get('authorization')
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new NextResponse('Unauthorized', { status: 401 })
	}

	const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	)

	const now = new Date().toISOString()
	const sevenDaysAgoIso = toIsoAgo(7)
	const thirtyDaysAgoIso = toIsoAgo(30)

	console.log('[START] Cleanup job', { now, sevenDaysAgoIso, thirtyDaysAgoIso, DRY_RUN })

	// Collect IDs to revalidate caches efficiently
	const userIdsForUploads = new Set<string>()
	const userIdsForAlbums = new Set<string>()
	const userIdsForRecentUploads = new Set<string>()
	const userIdsForRecentEdits = new Set<string>()
	const trainingIdsTouched = new Set<string>()

	// 1) Trainings: >7 days → delete training uploads, clear uploaded_images
	const trainingsPromise = (async () => {
		const { data: trainings, error } = await supabaseAdmin
			.from('trainings')
			.select('id, user_id, created_at, uploaded_images, replicate_training_id, replicate_trained_model_version')
			.lt('created_at', sevenDaysAgoIso)

		if (error) {
			console.error('Trainings fetch error', error)
			return { purged: 0 }
		}

		const deletions = await Promise.allSettled(
			(trainings || []).map(async t => {
				const paths = normalizeStoragePaths(t.uploaded_images)
				const res = await deleteObjectsBatch(supabaseAdmin, BUCKETS.trainingUploads, paths)
				if (DRY_RUN) {
					console.log(`[DRY] Would set trainings.uploaded_images=[] for id=${t.id}`)
				} else {
					await supabaseAdmin.from('trainings').update({ uploaded_images: [] }).eq('id', t.id)
				}
				// collect for cache invalidation
				if (t.user_id) userIdsForUploads.add(t.user_id as unknown as string)
				trainingIdsTouched.add(String(t.id))
				return { id: t.id, deleted: res.reduce((a, r) => a + r.ok, 0) }
			})
		)
		return { purged: deletions.length }
	})()

	// 2) Albums: >30 days → delete generated images, delete replicate model, then rows
	const albumsPromise = (async () => {
		const { data: albums, error } = await supabaseAdmin
			.from('albums')
			.select('id, training_id, created_at')
			.lt('created_at', thirtyDaysAgoIso)

		if (error) {
			console.error('Albums fetch error', error)
			return { purged: 0 }
		}

		const perAlbum = await Promise.allSettled(
			(albums || []).map(async a => {
				// load generated images for album
				const { data: genImgs, error: giErr } = await supabaseAdmin
					.from('generated_images')
					.select('id, storage_path')
					.eq('album_id', a.id)
				if (giErr) console.error('generated_images fetch error', giErr, a.id)

				const genPaths = (genImgs || []).map(g => String(g.storage_path))
				await deleteObjectsBatch(supabaseAdmin, BUCKETS.generatedOutputs, genPaths)

				// replicate model and owner info from trainings
				const { data: training, error: trErr } = await supabaseAdmin
					.from('trainings')
					.select('user_id, replicate_training_id, replicate_trained_model_version')
					.eq('id', a.training_id)
					.single()
				if (trErr) console.error('training fetch error', trErr, a.training_id)

				const modelId = training?.replicate_trained_model_version?.split(":")[0]	
				const modelVersion = training?.replicate_trained_model_version?.split(":")[1]	
               
				await deleteReplicateResources(
					modelId ?? null,
					modelVersion ?? null,
				)

				if (DRY_RUN) {
					console.log(`[DRY] Would delete album id=${a.id} then its training id=${a.training_id}`)
				} else {
					await supabaseAdmin.from('albums').delete().eq('id', a.id)
					await supabaseAdmin.from('trainings').delete().eq('id', a.training_id)
				}
				// collect for cache invalidation
				if (training?.user_id) userIdsForAlbums.add(training.user_id as unknown as string)
				trainingIdsTouched.add(String(a.training_id))
				return { id: a.id }
			})
		)
		return { purged: perAlbum.length }
	})()

	// 3) Editor tables
	const editorPromise = (async () => {
		// image_uplods_for_edit (7 days)
		const { data: up4edit, error: uErr } = await supabaseAdmin
			.from('image_uplods_for_edit')
			.select('id, user_id, storage_path, created_at')
			.lt('created_at', sevenDaysAgoIso)
		if (uErr) console.error('image_uplods_for_edit fetch error', uErr)

		const uOps = await Promise.allSettled(
			(up4edit || []).map(async (r: Tables<'image_uplods_for_edit'>) => {
				const paths = normalizeStoragePaths(r.storage_path)
				await deleteObjectsBatch(supabaseAdmin, BUCKETS.editorUploads, paths)
				if (DRY_RUN) {
					console.log(`[DRY] Would delete row image_uplods_for_edit id=${r.id}`)
				} else {
					await supabaseAdmin.from('image_uplods_for_edit').delete().eq('id', r.id)
				}
				// collect for cache invalidation
				if (r.user_id) userIdsForRecentUploads.add(String(r.user_id))
				return { id: r.id }
			})
		)

		// edited_images (30 days)
		const { data: edited, error: eErr } = await supabaseAdmin
			.from('edited_images')
			.select('id, user_id, storage_path, created_at')
			.lt('created_at', thirtyDaysAgoIso)
		if (eErr) console.error('edited_images fetch error', eErr)

		const eOps = await Promise.allSettled(
			(edited || []).map(async (r: EditedRowSlim) => {
				const paths = normalizeStoragePaths(r.storage_path)
				await deleteObjectsBatch(supabaseAdmin, BUCKETS.editedImages, paths)
				if (DRY_RUN) {
					console.log(`[DRY] Would delete row edited_images id=${r.id}`)
				} else {
					await supabaseAdmin.from('edited_images').delete().eq('id', r.id)
				}
				// collect for cache invalidation
				if (r.user_id) userIdsForRecentEdits.add(String(r.user_id))
				return { id: r.id }
			})
		)

		return { uploadsPurged: uOps.length, editedPurged: eOps.length }
	})()

	const [trainingsRes, albumsRes, editorRes] = await Promise.all([
		trainingsPromise,
		albumsPromise,
		editorPromise,
	])

	// Invalidate caches for affected resources (skip during DRY_RUN)
	if (!DRY_RUN) {
		for (const userId of userIdsForUploads) {
			revalidateTag(CACHE_TAGS.userUploads(userId))
		}
		for (const userId of userIdsForAlbums) {
			revalidateTag(CACHE_TAGS.userAlbums(userId))
		}
		for (const userId of userIdsForRecentUploads) {
			revalidateTag(CACHE_TAGS.recentUploads(userId))
		}
		for (const userId of userIdsForRecentEdits) {
			revalidateTag(CACHE_TAGS.recentEdits(userId))
		}
		for (const trainingId of trainingIdsTouched) {
			revalidateTag(CACHE_TAGS.training(trainingId))
			revalidateTag(CACHE_TAGS.trainingStatus(trainingId))
		}
	}

	const summary = { trainingsRes, albumsRes, editorRes, dryRun: DRY_RUN }
	console.log('[DONE] Cleanup summary', summary)
	return NextResponse.json({ ok: true });
}


