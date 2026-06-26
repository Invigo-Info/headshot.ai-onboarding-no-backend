import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { CheckPromptsClient } from "./check-prompts-client"

export default async function CheckPromptsPage() {
	if (process.env.VERCEL_ENV === "production") {
		notFound()
	}

	const supabase = await createClient()
	const { data, error: authError } = await supabase.auth.getClaims()

	if (authError || !data?.claims) {
		redirect("/login")
	}

	const supabaseAdmin = createAdminClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!
	)

	const { data: packs } = await supabaseAdmin
		.from("packs")
		.select("id, slug, title, attire, background")
		.eq("is_active", true)

	return <CheckPromptsClient packs={packs ?? []} />
}
