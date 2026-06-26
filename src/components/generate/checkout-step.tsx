"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/client";
import { useFormStore, imageStorage } from "@/store/form-store";
import { createEmbeddedCheckoutSession } from "@/actions/payment-actions";
import { getTrustLogos } from "@/data/trust-logos";
import TrustedLogos from "@/components/landing-page/trusted-logos";
import { Star } from "lucide-react";

const stripePromise = getStripe();

export function CheckoutStep() {
  const { slug, formData } = useFormStore();
  const [shots, setShots] = useState<string[]>([]);

  const category = useMemo(
    () => slug.replace(/-headshots$/, "") || "professional",
    [slug],
  );
  const trustLogoFiles = useMemo(() => getTrustLogos(category), [category]);

  // Right-panel headshots: the user's own generated previews if available,
  // otherwise bundled professional examples.
  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    const load = async () => {
      const ids = formData.generatedPreviews ?? [];
      for (const id of ids) {
        const file = await imageStorage.getImage(id);
        if (file) urls.push(URL.createObjectURL(file));
      }
      if (!cancelled && urls.length > 0) setShots(urls);
    };
    load();
    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [formData.generatedPreviews]);

  // Only the user's own generated headshots — no bundled fallbacks.
  const gallery = shots.slice(0, 8);

  const fetchClientSecret = useCallback(async () => {
    const res = await createEmbeddedCheckoutSession({ ...formData, slug });
    if (!res.success || !res.clientSecret) {
      throw new Error(res.error || "Failed to start checkout");
    }
    return res.clientSecret;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
      {/* ---- Left: Stripe embedded checkout ------------------------------- */}
      <div className="min-w-0">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      {/* ---- Right: marketing panel --------------------------------------- */}
      <aside className="lg:pt-6">
        <div className="text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">
            665,000+
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Stunning Professional Headshots Created
          </h3>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2.5 sm:gap-3">
          {gallery.length > 0
            ? gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <Image
                    src={src}
                    alt="Your generated headshot"
                    fill
                    sizes="(max-width: 640px) 22vw, 120px"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`ph-${i}`}
                  className="aspect-4/5 rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <span className="inline-flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-emerald-500 text-emerald-500"
              />
            ))}
          </span>
          <span className="font-semibold text-gray-900">Verified</span>
          <span className="font-bold text-blue-600">4.9/5</span>
          <span className="text-gray-600">Average Rating</span>
        </div>

        <figure className="mt-4 text-center max-w-md mx-auto">
          <blockquote className="text-sm sm:text-base italic text-gray-700 leading-relaxed">
            &ldquo;I was nervous it&rsquo;d look fake. The lighting and city
            backdrop feel natural, and the suit detail is crisp. Coworkers asked
            what photographer I used.&rdquo;
          </blockquote>
          <figcaption className="mt-2 text-sm font-medium text-gray-900">
            — David L.
          </figcaption>
        </figure>

        <div className="mt-8 text-center space-y-3">
          <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            Trusted and used by professionals at
          </p>
          <TrustedLogos logos={trustLogoFiles} category={category} />
        </div>
      </aside>
    </div>
  );
}
