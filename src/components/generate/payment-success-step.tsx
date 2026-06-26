"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import JSZip from "jszip";
import { useFormStore, imageStorage } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Loader2, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { getPricingDetails } from "@/data/one-time-pricing-details";
import { saveGeneratedHeadshots } from "@/actions/headshot-actions";
import { emailGeneratedHeadshots } from "@/actions/email-headshots";

const PRETTY_LABELS: Record<string, string> = {
  gender: "Gender",
  ageGroup: "Age Group",
  hairColor: "Hair Color",
  hairLength: "Hair Length",
  hairType: "Hair Type",
  ethnicity: "Ethnicity",
  bodyType: "Body Type",
  attire: "Outfits",
  background: "Backgrounds",
  glassesPreference: "Glasses",
};

const formatValue = (value: string) =>
  value
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

// Turn the user's given name into a filesystem-safe slug for ZIP folder +
// file names. Falls back to a generic label when no name was provided.
const slugifyName = (raw: string | undefined | null): string => {
  const cleaned = (raw ?? "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "headshot-ai";
};

// Build a short, friendly order ID from the Stripe checkout session id.
const buildOrderId = (sessionId: string | null): string => {
  if (!sessionId) return "HS-MP6P4QB0";
  const tail = sessionId.replace(/^cs_(test|live)_/, "");
  return `HS-${tail.slice(0, 8).toUpperCase()}`;
};

export function PaymentSuccessStep() {
  const searchParams = useSearchParams();
  const { formData, slug } = useFormStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailed, setEmailed] = useState(false);

  // Generated headshots from the preview/unlock step — shown here WITHOUT the
  // watermark now that the user has paid.
  const [unlockedPreviews, setUnlockedPreviews] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    const load = async () => {
      const ids = formData.generatedPreviews ?? [];
      for (const id of ids) {
        const file = await imageStorage.getImage(id);
        if (file) urls.push(URL.createObjectURL(file));
      }
      if (cancelled) {
        urls.forEach((u) => URL.revokeObjectURL(u));
        return;
      }
      setUnlockedPreviews(urls);
    };
    load();
    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [formData.generatedPreviews]);

  const category = slug.replace(/-headshots$/, "") || "professional";
  const pricingDetails = getPricingDetails(category);

  const selectedPlan = useMemo(
    () =>
      pricingDetails.plans.find(
        (p) => p.name.toLowerCase() === formData.selectedPlan,
      ),
    [pricingDetails.plans, formData.selectedPlan],
  );

  const sessionId = searchParams.get("session_id");
  const orderId = useMemo(() => buildOrderId(sessionId), [sessionId]);

  // Best-effort: persist the unlocked headshots to Supabase so they show up in
  // the dashboard later. Fully guarded + non-blocking — if Supabase isn't set
  // up or the user is anonymous, the action no-ops and the page is unaffected.
  useEffect(() => {
    const ids = formData.generatedPreviews ?? [];
    if (ids.length === 0) return;
    const key = `headshots-saved:${sessionId ?? "nosession"}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) return;

    let cancelled = false;
    const save = async () => {
      try {
        const images: { data: string }[] = [];
        for (const id of ids) {
          const file = await imageStorage.getImage(id);
          if (!file) continue;
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result as string);
            r.onerror = reject;
            r.readAsDataURL(file);
          });
          images.push({ data: dataUrl });
        }
        if (cancelled || images.length === 0) return;
        const res = await saveGeneratedHeadshots({
          sessionId: sessionId ?? undefined,
          plan: formData.selectedPlan,
          attire: formData.attire,
          background: formData.background,
          images,
        });
        if (res.success && typeof window !== "undefined") {
          sessionStorage.setItem(key, "1");
        }
      } catch (e) {
        // Never surface — this is an optional enhancement.
        console.warn("Headshot save (non-fatal):", e);
      }
    };
    void save();
    return () => {
      cancelled = true;
    };
  }, [
    formData.generatedPreviews,
    formData.selectedPlan,
    formData.attire,
    formData.background,
    sessionId,
  ]);

  // Best-effort: auto-email the unlocked headshots to the signed-in user once.
  // Guarded + non-blocking — no-ops if email/login isn't configured; the manual
  // "Email My Headshots" button stays available as a fallback / resend.
  useEffect(() => {
    const ids = formData.generatedPreviews ?? [];
    if (ids.length === 0) return;
    const key = `headshots-emailed:${sessionId ?? "nosession"}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
      setEmailed(true);
      return;
    }

    let cancelled = false;
    const run = async () => {
      try {
        const images: string[] = [];
        for (const id of ids) {
          const file = await imageStorage.getImage(id);
          if (!file) continue;
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result as string);
            r.onerror = reject;
            r.readAsDataURL(file);
          });
          images.push(dataUrl);
        }
        if (cancelled || images.length === 0) return;
        const res = await emailGeneratedHeadshots({
          images,
          plan: formData.selectedPlan,
          name: formData.name,
        });
        if (res.success) {
          if (!cancelled) setEmailed(true);
          if (typeof window !== "undefined") sessionStorage.setItem(key, "1");
        }
        // skipped/failed → stay silent; the manual button remains available.
      } catch (e) {
        console.warn("Auto email headshots (non-fatal):", e);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [formData.generatedPreviews, formData.selectedPlan, formData.name, sessionId]);

  const summaryRows = useMemo(() => {
    const rows: { label: string; value: string }[] = [];

    const pushIfPresent = (key: keyof typeof PRETTY_LABELS) => {
      const raw = (formData as unknown as Record<string, unknown>)[key];
      if (Array.isArray(raw)) {
        if (raw.length === 0) return;
        rows.push({
          label: PRETTY_LABELS[key],
          value: raw.map((v) => formatValue(String(v))).join(", "),
        });
      } else if (typeof raw === "string" && raw.length > 0) {
        rows.push({
          label: PRETTY_LABELS[key],
          value: key === "ageGroup" ? raw : formatValue(raw),
        });
      }
    };

    pushIfPresent("gender");
    pushIfPresent("ageGroup");
    pushIfPresent("ethnicity");
    pushIfPresent("bodyType");
    pushIfPresent("hairColor");
    pushIfPresent("hairLength");
    pushIfPresent("hairType");
    pushIfPresent("attire");
    pushIfPresent("background");
    pushIfPresent("glassesPreference");

    const uploaded = Array.isArray(formData.uploadedImages)
      ? formData.uploadedImages.length
      : 0;
    if (uploaded > 0) {
      rows.push({ label: "Selfies Uploaded", value: `${uploaded} photos` });
    }

    return rows;
  }, [formData]);

  // Bundle the unlocked (watermark-free) headshots into a ZIP and download it.
  // Self-contained: the images live in IndexedDB, so this needs no backend.
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const ids = formData.generatedPreviews ?? [];
      const zip = new JSZip();
      // Name the folder + files after the user (e.g. "Jane-Doe-headshots/").
      const nameSlug = slugifyName(formData.name);
      const folderName = `${nameSlug}-headshots`;
      const folder = zip.folder(folderName) ?? zip;
      let added = 0;

      for (let i = 0; i < ids.length; i++) {
        const file = await imageStorage.getImage(ids[i]);
        if (!file) continue;
        const ext = (file.type.split("/")[1] || "png").replace("jpeg", "jpg");
        folder.file(`${nameSlug}_headshot_${i + 1}.${ext}`, await file.arrayBuffer());
        added++;
      }

      if (added === 0) {
        toast.error("No headshots found to download.");
        return;
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${added} headshot${added > 1 ? "s" : ""}.`);
    } catch (err) {
      console.error("Failed to build headshots ZIP", err);
      toast.error("Couldn't prepare your download. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Email the unlocked headshots (as attachments) to the signed-in user's email.
  // Best-effort: no-ops gracefully if email service / login isn't configured.
  const handleEmail = async () => {
    if (isEmailing) return;
    setIsEmailing(true);
    try {
      const ids = formData.generatedPreviews ?? [];
      const images: string[] = [];
      for (const id of ids) {
        const file = await imageStorage.getImage(id);
        if (!file) continue;
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(file);
        });
        images.push(dataUrl);
      }
      if (images.length === 0) {
        toast.error("No headshots found to email.");
        return;
      }

      const res = await emailGeneratedHeadshots({
        images,
        plan: formData.selectedPlan,
        name: formData.name,
      });
      if (res.success) {
        setEmailed(true);
        toast.success(`Sent to ${res.to}.`);
      } else if (res.reason === "not-configured") {
        toast.message(
          "Email delivery isn't set up yet (no email service configured). You can still download your headshots below.",
        );
      } else if (res.reason === "no-recipient") {
        toast.message(
          "We couldn't find an email to send to — please sign in first, then try again.",
        );
      } else if (res.skipped) {
        toast.message(
          "Email isn't available right now. You can still download your headshots below.",
        );
      } else {
        toast.error("Couldn't send the email. Please try again.");
      }
    } catch (err) {
      console.warn("Email headshots failed:", err);
      toast.error("Couldn't send the email. Please try again.");
    } finally {
      setIsEmailing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 pb-28">
      {/* Success icon + title */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <span className="inline-flex size-20 sm:size-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2
              className="size-12 sm:size-14 text-emerald-600"
              strokeWidth={2.25}
            />
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Thank you for your purchase. Your headshots are unlocked below.
        </p>
      </div>

      {/* Unlocked headshots — same previews, now WITHOUT the watermark */}
      {unlockedPreviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-center">
            Your headshots are unlocked
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {unlockedPreviews.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
              >
                <Image
                  src={src}
                  alt={`Headshot ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Email my headshots — secondary action */}
          <div className="flex justify-center pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleEmail}
              disabled={isEmailing || emailed}
              className="gap-2"
            >
              {isEmailing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : emailed ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Emailed to you
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  Email My Headshots
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Order details card */}
      {selectedPlan && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-600" strokeWidth={2.5} />
            <h2 className="text-lg font-bold">Order Details</h2>
          </div>

          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {selectedPlan.name} Plan
              <span className="text-gray-400 font-normal mx-2">·</span>
              <span className="font-normal text-gray-700">
                {selectedPlan.headshots} professional headshots
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-base">
            <span className="text-2xl font-bold text-gray-900">
              ${selectedPlan.price}
            </span>
            <span className="text-gray-400">·</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500 text-white">
              Paid
            </span>
          </div>

          <div className="border-t border-emerald-200/70 pt-3 space-y-2 text-sm">
            <p className="flex flex-wrap items-center gap-x-2 text-gray-700">
              <span className="font-medium text-gray-600">Order ID:</span>
              <span className="font-mono font-semibold text-gray-900">
                {orderId}
              </span>
            </p>
            <p className="flex flex-wrap items-center gap-2 text-gray-700">
              <Mail className="size-4 text-gray-500 shrink-0" />
              <span>Receipt sent to your email</span>
            </p>
          </div>
        </div>
      )}

      {/* Your selections card */}
      {summaryRows.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Your Selections</h2>
          <ul className="divide-y divide-gray-100">
            {summaryRows.map((row) => (
              <li
                key={row.label}
                className="py-3 flex items-start justify-between gap-4 text-sm sm:text-base"
              >
                <span className="text-gray-600 font-medium">{row.label}</span>
                <span className="text-gray-900 text-right">{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust footer */}
      <p className="inline-flex items-center justify-center gap-2 w-full text-sm text-gray-600">
        <ShieldCheck className="size-4 text-emerald-600" />
        Your purchase is covered by our 100% Money-Back Guarantee
      </p>

      {/* Floating sticky CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-20">
        <Button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading || unlockedPreviews.length === 0}
          className="w-full py-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-sm text-lg font-medium shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Preparing download…
            </>
          ) : (
            <>
              Download My Headshots
              <Download className="size-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
