"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormStore, imageStorage } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import {
  checkPaymentStatus,
  getPriceInfo,
} from "@/actions/payment-actions";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  User,
  Clock,
  Shirt,
  Hash,
  Zap,
  Check,
} from "lucide-react";

// Decorative fallback headshots for the right-side showcase while the user's
// own previews are still generating.
const SHOWCASE_FALLBACK_COUNT = 10;
const SHOWCASE_BASE = "/assets/before-images-and-after-headshots";

type PlanId = "starter" | "basic" | "premium";

interface PlanMeta {
  id: PlanId;
  name: string;
  price: number;
  originalPrice: number;
  headshots: number;
  time: string;
  resolution: string;
  badge?: string;
  highlight?: boolean;
}

// Static plan presentation (matches the pricing design). Live price + headshot
// counts from Stripe override these when available.
const PLAN_META: PlanMeta[] = [
  {
    id: "starter",
    name: "Starter",
    price: 25,
    originalPrice: 35,
    headshots: 40,
    time: "45 Minutes generation time",
    resolution: "Standard resolution",
  },
  {
    id: "basic",
    name: "Basic",
    price: 35,
    originalPrice: 55,
    headshots: 100,
    time: "30 Minutes generation time",
    resolution: "HD resolution",
    badge: "87% choose this",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 55,
    originalPrice: 75,
    headshots: 150,
    time: "15 Minutes generation time",
    resolution: "High resolution",
    badge: "+Best Value",
  },
];

const everyPlanIncludes = [
  "Full HD, no watermarks",
  "Use them anywhere you want",
  "Yours forever — download anytime",
];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Downscale a reference selfie to keep the request body small.
async function fileToReferenceDataUrl(
  file: File,
  maxDim = 768,
  quality = 0.85,
): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    if (width > maxDim || height > maxDim) {
      if (width >= height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    return canvas.toDataURL("image/jpeg", quality);
  } catch {
    return fileToDataUrl(file);
  }
}

export function UnlockStep({ userId }: { userId: string }) {
  const { slug, formData, updateFormData } = useFormStore();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    (formData.selectedPlan as PlanId) || "basic",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paidPlans, setPaidPlans] = useState<string[]>([]);
  const [priceData, setPriceData] = useState<{
    [key: string]: { amount: number; headshot_count: number };
  }>({});

  // Generated (watermarked) previews — shown in the right showcase and persisted
  // to IndexedDB so the post-payment page can display them without watermark.
  const [previews, setPreviews] = useState<string[]>([]);

  // ---- Plan presentation (static meta + live Stripe overrides) --------------
  const plans = useMemo(
    () =>
      PLAN_META.map((p) => ({
        ...p,
        price: priceData[p.id]?.amount ?? p.price,
        headshots: priceData[p.id]?.headshot_count ?? p.headshots,
      })),
    [priceData],
  );
  const selected = plans.find((p) => p.id === selectedPlan) ?? plans[1];

  // ---- Load payment status + live prices ------------------------------------
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const ids = PLAN_META.map((p) => p.id);
        const [statuses, prices] = await Promise.all([
          Promise.all(ids.map((id) => checkPaymentStatus(userId, id))),
          Promise.all(ids.map((id) => getPriceInfo(id))),
        ]);
        if (cancelled) return;

        const paid: string[] = [];
        statuses.forEach((r, i) => {
          if (r.success && r.hasPaidOrder) paid.push(ids[i]);
        });
        setPaidPlans(paid);
        if (paid[0]) setSelectedPlan(paid[0] as PlanId);

        const pd: { [k: string]: { amount: number; headshot_count: number } } =
          {};
        prices.forEach((r, i) => {
          if (r.success && r.price) {
            pd[ids[i]] = {
              amount: r.price.amount,
              headshot_count: r.price.headshot_count,
            };
          }
        });
        setPriceData(pd);
      } catch (e) {
        console.error("Failed to load plan info", e);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // ---- Background: generate (or load cached) watermarked previews -----------
  useEffect(() => {
    let cancelled = false;
    const objectUrls: string[] = [];

    const run = async () => {
      const uploaded = formData.uploadedImages ?? [];
      const selectionKey = JSON.stringify({
        g: formData.gender,
        a: formData.attire,
        b: formData.background,
        n: uploaded.length,
      });

      if (
        formData.generatedPreviews?.length &&
        formData.generatedPreviewsKey === selectionKey
      ) {
        const urls: string[] = [];
        for (const id of formData.generatedPreviews) {
          const file = await imageStorage.getImage(id);
          if (file) urls.push(URL.createObjectURL(file));
        }
        if (!cancelled && urls.length > 0) {
          objectUrls.push(...urls);
          setPreviews(urls);
          return;
        }
      }

      if (uploaded.length === 0) return;

      // Send every uploaded photo — the API generates one headshot per
      // reference image (1:1).
      const references: string[] = [];
      for (const photo of uploaded) {
        const file = await imageStorage.getImage(photo.id);
        if (file) references.push(await fileToReferenceDataUrl(file));
      }
      if (references.length === 0) return;

      try {
        const res = await fetch("/api/generate/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gender: formData.gender,
            attire: formData.attire,
            background: formData.background,
            images: references,
          }),
        });
        const json = (await res.json().catch(() => null)) as {
          images?: string[];
        } | null;
        if (!res.ok || !json?.images?.length) return;

        const ids: string[] = [];
        const urls: string[] = [];
        for (let i = 0; i < json.images.length; i++) {
          const blob = await (await fetch(json.images[i])).blob();
          const id = `gen-${Date.now()}-${i}-${Math.random()
            .toString(36)
            .slice(2, 8)}`;
          const file = new File([blob], `${id}.png`, {
            type: blob.type || "image/png",
          });
          await imageStorage.storeImage(id, file);
          ids.push(id);
          urls.push(URL.createObjectURL(file));
        }
        if (cancelled) {
          urls.forEach((u) => URL.revokeObjectURL(u));
          return;
        }
        objectUrls.push(...urls);
        updateFormData({
          generatedPreviews: ids,
          generatedPreviewsKey: selectionKey,
        });
        setPreviews(urls);
      } catch (err) {
        console.error("Preview generation failed", err);
      }
    };

    run();
    return () => {
      cancelled = true;
      objectUrls.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: PlanId) => {
    if (paidPlans.length > 0 && !paidPlans.includes(id)) return;
    setSelectedPlan(id);
    updateFormData({ selectedPlan: id });
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    updateFormData({ selectedPlan });

    // Already paid for this plan → skip checkout, go straight to success.
    if (paidPlans.includes(selectedPlan)) {
      router.push(
        `/generate/one-time/${slug}?step=payment-success&plan=${selectedPlan}`,
      );
      return;
    }

    // Proceed to the in-page embedded Stripe checkout.
    router.push(`/generate/one-time/${slug}?step=checkout`);
  };

  // Right-side showcase: prefer the user's generated headshots, else fallback.
  const showcase =
    previews.length > 0
      ? previews
      : Array.from(
          { length: SHOWCASE_FALLBACK_COUNT },
          (_, i) => `${SHOWCASE_BASE}/${i + 1}a.webp`,
        );
  // Duplicate the list so the vertical marquee can loop seamlessly.
  const marquee = [...showcase, ...showcase];

  // Center-focus zoom: as each tile scrolls past the rail's vertical center it
  // smoothly scales up (peaking dead-center), then returns to normal. Driven by
  // rAF measuring live positions — reads first, then writes, to avoid layout
  // thrash, and skipped entirely for reduced-motion users.
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const MAX_SCALE = 0.28; // extra scale at dead-center (→ peak 1.28)
    let raf = 0;
    const tick = () => {
      const rail = railRef.current;
      const track = trackRef.current;
      if (rail && track) {
        const rr = rail.getBoundingClientRect();
        const centerY = rr.top + rr.height / 2;
        const reach = rr.height / 2;
        const tiles = Array.from(track.children) as HTMLElement[];
        // Read pass.
        const scales = tiles.map((tile) => {
          const r = tile.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - centerY);
          const t = Math.min(1, d / reach); // 0 center → 1 edge
          const eased = 1 - t * t; // smooth falloff
          return 1 + MAX_SCALE * eased;
        });
        // Write pass.
        tiles.forEach((tile, i) => {
          tile.style.transform = `scale(${scales[i].toFixed(3)})`;
          tile.style.zIndex = String(Math.round(scales[i] * 100));
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [marquee.length]);

  return (
    <div className="w-full">
      <div className="flex gap-8 lg:gap-12">
        {/* ---- Left: pricing ------------------------------------------------ */}
        <div className="flex-1 min-w-0 space-y-8 pb-28">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Your Stunning Professional Headshots, Just One Click Away
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Pay once. No subscriptions. No hidden fees.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                <ShieldCheck className="size-4" />
                100% Money Back Guarantee
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                <span className="inline-flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span className="text-gray-500">Average Rating</span>
              </span>
            </div>
          </div>

          {/* Mobile/tablet showcase — static 2-row image grid (hidden on xl
              where the vertical side rail takes over). */}
          <div className="xl:hidden grid grid-cols-4 grid-rows-2 gap-2.5">
            {showcase.slice(0, 8).map((src, i) => (
              <div
                key={`m-${src}-${i}`}
                className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-100 shadow-sm"
              >
                <Image
                  src={src}
                  alt="Professional headshot example"
                  fill
                  sizes="(max-width: 640px) 22vw, 120px"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
            {plans.map((plan) => {
              const isPurchased = paidPlans.includes(plan.id);
              const isDisabled = paidPlans.length > 0 && !isPurchased;
              const isSelected = plan.id === selectedPlan;

              const features = [
                { icon: User, label: `${plan.headshots} headshots` },
                { icon: Clock, label: plan.time },
                { icon: Shirt, label: "All outfits included" },
                { icon: Hash, label: "All backgrounds included" },
                { icon: Zap, label: plan.resolution },
              ];

              return (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => handleSelect(plan.id)}
                  disabled={isDisabled}
                  className={cn(
                    "relative text-left rounded-2xl border-2 p-5 transition-all duration-200 h-full",
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300",
                    isPurchased && "border-emerald-500 bg-emerald-50",
                    isDisabled
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer",
                  )}
                >
                  {/* Badge */}
                  {isPurchased ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-emerald-500 shadow-sm">
                      Purchased
                    </span>
                  ) : plan.highlight && plan.badge ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500 shadow-sm whitespace-nowrap">
                      <Star className="size-3 fill-white text-white" />
                      {plan.badge}
                    </span>
                  ) : plan.badge ? (
                    <span className="absolute -top-3 right-4 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500 shadow-sm whitespace-nowrap">
                      {plan.badge}
                    </span>
                  ) : null}

                  <h3 className="text-lg font-bold text-gray-900">
                    {plan.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-gray-900">
                      <span className="align-top text-2xl">$</span>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 line-through text-base">
                      ${plan.originalPrice}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {features.map((f) => {
                      const Icon = f.icon;
                      return (
                        <li
                          key={f.label}
                          className="flex items-center gap-2.5 text-sm text-gray-700"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            <Icon className="size-3.5" />
                          </span>
                          <span>{f.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Every plan includes */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
            <p className="text-center text-sm font-semibold text-gray-900 mb-3">
              Every plan includes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
              {everyPlanIncludes.map((perk) => (
                <span
                  key={perk}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700"
                >
                  <Check className="size-4 text-emerald-600" strokeWidth={3} />
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Right: scrolling headshot showcase (desktop only) ----------- */}
        <aside className="hidden xl:block w-60 shrink-0">
          <div
            ref={railRef}
            className="h-[78vh] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
          >
            <div
              ref={trackRef}
              className="flex flex-col gap-5 animate-unlock-marquee"
            >
              {marquee.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 shadow-sm will-change-transform"
                  style={{ transformOrigin: "center" }}
                >
                  <Image
                    src={src}
                    alt="Professional headshot example"
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-20">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={isSubmitting}
          className="w-full py-6 rounded-sm bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-lg font-medium shadow-sm cursor-pointer"
        >
          {isSubmitting ? "Processing…" : `Continue with ${selected?.name}`}
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
