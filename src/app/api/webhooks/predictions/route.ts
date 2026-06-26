import { with429Retry } from '@/lib/retry429'
import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

export const maxDuration = 300 // 5 minutes, to allow for retries and processing time

interface CreatePredictionPayload {
	modelVersion: string
	prompt: string
	gender: string
	userId: string
	albumId: string
	modelId?: string
}

const INTERNAL_SECRET = process.env.PREDICTIONS_INTERNAL_SECRET || process.env.INTERNAL_WEBHOOK_SECRET

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN ?? '',
})

export async function POST(req: NextRequest) {
	try {
		// Simple shared-secret auth
		const authHeader = req.headers.get('authorization') || ''
		const token = authHeader.startsWith('Bearer ')
			? authHeader.slice('Bearer '.length)
			: authHeader
		if (!INTERNAL_SECRET || token !== INTERNAL_SECRET) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = (await req.json()) as CreatePredictionPayload
		const { modelVersion, prompt, gender, userId, albumId, modelId } = body

		if (!modelVersion || !prompt || !gender || !userId || !albumId) {
			return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
		}

		const WEBHOOK_HOST = process.env.NGROK_HOST || process.env.NEXT_PUBLIC_SITE_URL
		if (!WEBHOOK_HOST) {
			return NextResponse.json({ error: 'Missing WEBHOOK host' }, { status: 500 })
		}

		const outputWebhook = `${WEBHOOK_HOST}/api/webhooks/predictions/output?userId=${encodeURIComponent(userId)}&albumId=${encodeURIComponent(albumId)}${modelId ? `&modelId=${encodeURIComponent(modelId)}` : ''}`

		const fullPrompt = `${prompt}`

		await with429Retry(() => replicate.predictions.create({
			version: modelVersion,
			input: {
				prompt: fullPrompt,
				model: 'dev',
				megapixels: '1',
				num_outputs: 1,
				aspect_ratio: '4:5',
				output_format: 'png',
				guidance_scale: 3,
				output_quality: 100,
				prompt_strength: 0.8,
				num_inference_steps: 50,
			},
			webhook: outputWebhook,
			webhook_events_filter: ['completed'],
		}))
		
		// await replicate.predictions.create({
		// 	version: modelVersion,
		// 	input: {
		// 		prompt: fullPrompt,
		// 		model: 'dev',
		// 		megapixels: '1',
		// 		num_outputs: 1,
		// 		aspect_ratio: '4:5',
		// 		output_format: 'png',
		// 		guidance_scale: 3.5,
		// 		output_quality: 100,
		// 		prompt_strength: 0.8,
		// 		num_inference_steps: 50,
		// 	},
		// 	webhook: outputWebhook,
		// 	webhook_events_filter: ['completed'],
		// })

		return NextResponse.json({ accepted: true }, { status: 202 })
	} catch (err) {
		console.error('predictions create error', err)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}


