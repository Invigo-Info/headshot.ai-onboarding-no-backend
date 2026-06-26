import React from "react";
import MainSteps from "@/components/generate/main-steps";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getPackBySlug } from "@/actions/photos-actions";
import { photoPacks } from "@/data/photo-packs";
import type { PackData } from "@/components/generate/main-steps";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface GeneratePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GeneratePage({ params }: GeneratePageProps) {
  const slug = (await params).slug;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Anonymous users are allowed to start the onboarding wizard. They'll be
  // prompted to sign in at the preview step (the in-flow auth gate).

  const packResult = await getPackBySlug(slug);

  let packData: PackData | null =
    packResult.success && packResult.data ? packResult.data : null;

  // Fall back to static photo-packs data if the DB row isn't seeded yet.
  // The wizard can still render the gender step; attire/background steps
  // will show empty until packs.attire/background are populated in Supabase.
  if (!packData) {
    const fallback = photoPacks.find((p) => p.slug === slug && p.is_active);
    if (fallback) {
      packData = {
        id: String(fallback.id),
        slug: fallback.slug,
        title: fallback.title,
        description: fallback.description,
        attire: null,
        background: null,
        choices: null,
        is_active: fallback.is_active,
        pro: fallback.pro,
      };
    }
  }

  if (!packData) {
    notFound();
  }

  return (
    <div className="mx-auto flex flex-col justify-center w-full">
      <MainSteps slug={slug} userId={user?.sub ?? ""} packData={packData} />
    </div>
  );
}
