"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormStore, imageStorage } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import {
  SignInWithGoogleAction,
  signInWithMagicLink,
} from "@/actions/auth-actions";

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.86c2.26-2.08 3.59-5.15 3.59-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-2.98c-1.07.72-2.45 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.27 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.31c-.25-.72-.38-1.49-.38-2.31s.13-1.59.38-2.31V6.6H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.4l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.73c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.27 2.7 1.29 6.6l3.98 3.09C6.22 6.84 8.87 4.73 12 4.73z"
      />
    </svg>
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// When true, the upload step's "Create Your Headshots" CTA leads to the account
// gate — the "Continue with Google" / magic-link page with the preparing timer —
// before the headshots are revealed. Set to `false` for no-backend mode where
// the reveal is shown directly without any sign-in.
const REQUIRE_AUTH = true;

export function PreviewStep({ userId }: { userId: string }) {
  const { slug } = useFormStore();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailValid = isValidEmail(email);

  // Reveal the (watermarked) generated headshots right here before sending the
  // user on to choose a plan. When auth isn't required, show it to everyone;
  // otherwise gate it behind a signed-in session.
  if (!REQUIRE_AUTH || userId) {
    return <PreviewReveal />;
  }

  // After auth completes, Supabase redirects to /auth/callback?next=... — bring
  // the user back to this preview step so we can reveal their headshots.
  const resumePath = `/generate/one-time/${slug}?step=preview`;

  const handleGoogle = async () => {
    setIsSubmitting(true);
    try {
      const result = await SignInWithGoogleAction(resumePath);
      if (result.success && result.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }
      toast.error(result.error || "Failed to start Google sign-in");
    } catch (err) {
      console.error("Google sign-in error", err);
      toast.error("Failed to start Google sign-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmail = async () => {
    if (!emailValid) return;
    setIsSubmitting(true);
    try {
      const result = await signInWithMagicLink(email, resumePath);
      if (result.success) {
        toast.success(`Magic link sent to ${email}. Check your inbox to sign in.`);
        return;
      }
      toast.error(result.error || "Failed to send magic link");
    } catch (err) {
      console.error("Magic-link error", err);
      toast.error("Failed to send magic link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid min-h-150 overflow-hidden rounded-2xl border border-gray-200 lg:grid-cols-2">
        {/* Left: account gate */}
        <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-10">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="text-2xl font-bold leading-snug text-neutral-900">
              We are preparing your headshots. Create an account to continue.
            </h2>
            <p className="mt-3 text-gray-500">
              Log in to access your headshots and pick up where you left off.
            </p>

            <Button
              type="button"
              onClick={handleGoogle}
              disabled={isSubmitting}
              className="mt-8 h-12 w-full gap-3 rounded-md bg-blue-500 text-base font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
            >
              <GoogleGIcon className="size-5" />
              Continue with Google
            </Button>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-500">Or continue with email</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEmail();
              }}
              className="h-12 rounded-md border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-neutral-900 focus-visible:ring-0"
            />
            <Button
              type="button"
              onClick={handleEmail}
              disabled={!emailValid || isSubmitting}
              className="mt-3 h-12 w-full gap-2 rounded-md bg-blue-500 text-base font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:opacity-100"
            >
              {isSubmitting ? "Sending magic link…" : "Continue with Email"}
              <ArrowRight className="size-4" />
            </Button>

            <p className="mt-6 text-center text-xs text-gray-400">
              By continuing, you agree to our{" "}
              <Link href="/terms-of-service" className="underline hover:text-gray-600">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline hover:text-gray-600">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Right: preparing countdown */}
        <div className="relative flex items-center justify-center overflow-hidden bg-black px-6 py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.10), transparent 60%)",
            }}
          />
          <PreparingTimer totalSeconds={5 * 60} />
        </div>
      </div>
    </div>
  );
}

// ---- Post-auth reveal: watermarked generated headshots ---------------------

type RevealStatus = "loading" | "ready" | "no-uploads" | "error";

// Repeating diagonal tiled watermark (like the reference): "HEADSHOT.AI" text
// tiled across the whole image at an angle, plus a large faint center mark.
// `id` must be unique per instance so each <rect> references its own pattern.
function WatermarkOverlay({ id }: { id: string }) {
  const patternId = `wm-${id}`;
  return (
    <svg
      className="absolute inset-0 h-full w-full select-none pointer-events-none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="150"
          height="92"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <text
            x="6"
            y="34"
            fill="rgba(255,255,255,0.28)"
            fontSize="12"
            fontWeight="700"
            letterSpacing="1.5"
          >
            HEADSHOT.AI
          </text>
          <text
            x="74"
            y="80"
            fill="rgba(255,255,255,0.28)"
            fontSize="12"
            fontWeight="700"
            letterSpacing="1.5"
          >
            HEADSHOT.AI
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.16)"
        fontSize="26"
        fontWeight="800"
        letterSpacing="2"
      >
        HEADSHOT.AI
      </text>
    </svg>
  );
}

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

function PreviewReveal() {
  const { slug, formData, updateFormData, getNextStep } = useFormStore();
  const router = useRouter();
  const [status, setStatus] = useState<RevealStatus>("loading");
  const [previews, setPreviews] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorCode, setErrorCode] = useState("");

  // Generate (or load cached) watermarked previews — one per uploaded photo.
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

      // Reuse cached previews if the selections haven't changed.
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
          setStatus("ready");
          return;
        }
      }

      if (uploaded.length === 0) {
        if (!cancelled) setStatus("no-uploads");
        return;
      }

      setStatus("loading");

      const references: string[] = [];
      for (const photo of uploaded) {
        const file = await imageStorage.getImage(photo.id);
        if (file) references.push(await fileToReferenceDataUrl(file));
      }
      if (references.length === 0) {
        if (!cancelled) setStatus("no-uploads");
        return;
      }

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
          error?: string;
          code?: string;
        } | null;

        if (!res.ok || !json?.images?.length) {
          if (!cancelled) {
            setErrorMsg(json?.error || `Request failed (${res.status})`);
            setErrorCode(json?.code || "");
            setStatus("error");
          }
          return;
        }

        // Persist so the post-payment page can show them without watermark.
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
        setStatus("ready");
      } catch (err) {
        console.error("Preview generation failed", err);
        if (!cancelled) setStatus("error");
      }
    };

    run();
    return () => {
      cancelled = true;
      objectUrls.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    const next = getNextStep("preview");
    if (next) router.push(`/generate/one-time/${slug}?step=${next}`);
  };

  const skeletonCount = formData.uploadedImages?.length || 6;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 pb-28">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          {status === "loading"
            ? "Generating your professional headshots…"
            : "Here are previews of your professional headshots"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {status === "loading"
            ? "This usually takes under a minute. Hang tight."
            : "Love what you see? Unlock the rest."}
        </p>
      </div>

      {status === "no-uploads" ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
          <AlertCircle className="size-6 text-amber-500" />
          <p className="font-medium text-amber-800">
            We couldn&apos;t find your uploaded photos.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/generate/one-time/${slug}?step=upload`)}
            className="mt-2"
          >
            Go back to upload
          </Button>
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <AlertCircle className="size-6 text-red-500" />
          <p className="font-medium text-red-700">
            {errorCode === "PHOTOS_DECLINED"
              ? "We couldn't use these photos"
              : "Something went wrong generating your previews."}
          </p>
          {errorMsg && <p className="text-sm text-red-500 max-w-md">{errorMsg}</p>}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              errorCode === "PHOTOS_DECLINED"
                ? router.push(`/generate/one-time/${slug}?step=upload`)
                : window.location.reload()
            }
            className="mt-2"
          >
            {errorCode === "PHOTOS_DECLINED" ? "Use different photos" : "Try again"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {status === "loading"
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center"
                >
                  <Loader2 className="size-5 animate-spin text-gray-300" />
                </div>
              ))
            : previews.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <Image
                    src={src}
                    alt={`Preview ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                  {/* Tiled watermark overlay — removed after payment. */}
                  <WatermarkOverlay id={`${i}`} />
                </div>
              ))}
        </div>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-20">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={status === "loading"}
          className="w-full py-6 rounded-sm bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-lg font-medium shadow-sm cursor-pointer"
        >
          Unlock My Headshots
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

function PreparingTimer({ totalSeconds = 300 }: { totalSeconds?: number }) {
  const totalMs = totalSeconds * 1000;
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Drive the arc with requestAnimationFrame so it sweeps smoothly instead of
  // stepping once per second. `now` is a high-res timestamp from rAF.
  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const e = Math.min(totalMs, now - startRef.current);
      setElapsedMs(e);
      if (e < totalMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalMs]);

  const progress = Math.min(1, Math.max(0, elapsedMs / totalMs));
  const remaining = Math.max(0, Math.ceil((totalMs - elapsedMs) / 1000));
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  // Blink the colon twice a second, like a digital clock.
  const colonOn = Math.floor(elapsedMs / 500) % 2 === 0;

  const R = 150;
  const C = 2 * Math.PI * R;
  const arcAngle = -90 + 360 * progress;

  return (
    <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
      {/* Pulsing glow halo */}
      <div className="pointer-events-none absolute size-3/4 animate-pulse rounded-full bg-emerald-500/15 blur-2xl" />
      <svg viewBox="0 0 400 400" className="relative size-full">
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <radialGradient id="face-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0b3b22" />
            <stop offset="55%" stopColor="#08130d" />
            <stop offset="100%" stopColor="#050807" />
          </radialGradient>
          <filter id="arc-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative outer rings */}
        <circle
          cx="200"
          cy="200"
          r="192"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          r="174"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />

        {/* Progress track */}
        <circle
          cx="200"
          cy="200"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="16"
        />

        {/* Progress arc */}
        <circle
          cx="200"
          cy="200"
          r={R}
          fill="none"
          stroke="url(#arc-grad)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${C * progress} ${C}`}
          transform="rotate(-90 200 200)"
          filter="url(#arc-glow)"
        />

        {/* Leading arrowhead */}
        {progress > 0.01 && (
          <g transform={`rotate(${arcAngle + 90} 200 200)`}>
            <polygon
              points="200,28 200,72 232,50"
              fill="#4ade80"
              filter="url(#arc-glow)"
            />
          </g>
        )}

        {/* Inner LCD face */}
        <circle cx="200" cy="200" r="122" fill="url(#face-grad)" />
        <circle
          cx="200"
          cy="200"
          r="122"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      </svg>

      {/* Digital readout */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="font-mono text-5xl font-bold tabular-nums tracking-widest text-white sm:text-6xl"
          style={{ textShadow: "0 0 14px rgba(74,222,128,0.55)" }}
        >
          {mm}
          <span
            className="transition-opacity duration-200"
            style={{ opacity: colonOn ? 1 : 0.2 }}
          >
            :
          </span>
          {ss}
        </span>
      </div>
    </div>
  );
}
