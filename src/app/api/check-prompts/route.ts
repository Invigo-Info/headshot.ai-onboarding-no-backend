// preserveOrder: Passes preserveOrder: true to selectPromptsForPlan so that
// prompts are returned in their original DB order (no shuffle) for this page only.

import { NextRequest, NextResponse } from "next/server"
import { createClient as createAuthClient } from "@/lib/supabase/server"
import { createClient } from "@supabase/supabase-js"
import { selectPromptsForPlan } from "@/app/api/webhooks/training/onetime/helper"

// Duplicated from src/app/api/webhooks/training/onetime/route.ts:369-421
// Keep in sync with the original buildPrompt closure
function buildPrompt(
	p: string,
	shouldAddGlasses: boolean,
	opts: {
		ageGroup?: string
		hairLength?: string
		hairType?: string
		hairColor?: string
		bodyType?: string
	}
) {
	const descriptors: string[] = []

	if (opts.ageGroup) {
		descriptors.push(`aged ${opts.ageGroup}`)
	}

	if (shouldAddGlasses) {
		descriptors.push("wearing glasses")
	}

	if (opts.hairLength) {
		if (opts.hairLength === "bald") {
			descriptors.push(`bald`)
		} else {
			if (opts.hairType) {
				descriptors.push(`with ${opts.hairType},`)
			}

			descriptors.push(`${opts.hairLength}-length`)

			if (opts.hairColor) {
				descriptors.push(`${opts.hairColor} hair`)
			}
		}
	}

	if (opts.bodyType) {
		descriptors.push(`and a ${opts.bodyType} body type`)
	}

	if (!descriptors.length) {
		return p
	}

	const descriptorString = descriptors.join(" ")
	const firstCommaIndex = p.indexOf(",")

	if (firstCommaIndex === -1) {
		return `${p}, ${descriptorString}`
	}

	const before = p.slice(0, firstCommaIndex + 1)
	const after = p.slice(firstCommaIndex + 1).trimStart()

	return after.length
		? `${before} ${descriptorString}, ${after}`
		: `${before} ${descriptorString}`
}

export async function POST(request: NextRequest) {
	// Environment guard
	if (process.env.VERCEL_ENV === "production") {
		return NextResponse.json({ error: "Not found" }, { status: 404 })
	}

	// Auth guard
	const supabase = await createAuthClient()
	const { data, error: authError } = await supabase.auth.getClaims()
	if (authError || !data?.claims) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		const body = await request.json()
		const {
			packSlug,
			gender,
			selectedPlan,
			attire,
			background,
			ageGroup,
			hairLength,
			hairType,
			hairColor,
			bodyType,
			glassesPreference,
		} = body

		if (!packSlug || !gender || !selectedPlan) {
			return NextResponse.json(
				{ error: "packSlug, gender, and selectedPlan are required" },
				{ status: 400 }
			)
		}

		// Fetch pack prompts using admin client
		const supabaseAdmin = createClient(
			process.env.SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		)

		const { data: pack, error: packError } = await supabaseAdmin
			.from("packs")
			.select("prompts, title")
			.eq("slug", packSlug)
			.single()

		if (packError || !pack?.prompts) {
			return NextResponse.json(
				{ error: "Pack not found or has no prompts" },
				{ status: 404 }
			)
		}

		// Select prompts for plan (preserveOrder: true to show DB order for debugging)
		const basePrompts = selectPromptsForPlan(
			pack.prompts as Parameters<typeof selectPromptsForPlan>[0],
			{ gender, selectedPlan, attire, background, preserveOrder: true }
		)

		// Build final prompts with descriptors
		const descriptorOpts = { ageGroup, hairLength, hairType, hairColor, bodyType }
		const prompts = basePrompts.map((p, index) => {
			let shouldAddGlasses = false
			if (glassesPreference === "with-glasses") {
				shouldAddGlasses = true
			} else if (glassesPreference === "mix") {
				shouldAddGlasses = index % 2 === 0
			}

			return {
				index: index + 1,
				basePrompt: p,
				finalPrompt: buildPrompt(p, shouldAddGlasses, descriptorOpts),
				hasGlasses: shouldAddGlasses,
			}
		})

		return NextResponse.json({
			prompts,
			meta: {
				total: prompts.length,
				pack: pack.title,
				gender,
				plan: selectedPlan,
			},
		})
	} catch (error) {
		return NextResponse.json(
			{
				error: "Internal server error",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		)
	}
}
