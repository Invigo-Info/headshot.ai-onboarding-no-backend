"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useFormStore,
  type StoredPhoto,
  imageStorage,
} from "@/store/form-store";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Upload,
  X,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NextImage from "next/image";
import Logo from "../shared/logo";
import { analyzeImage } from "@/actions/upload-actions";
import { MAX_UPLOADED_IMAGES, MIN_ACCEPTED_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ImageStatus {
  storedPhoto: StoredPhoto;
  file: File | null; // Loaded from IndexedDB
  status: "analyzing" | "accepted" | "rejected" | "error";
  reason?: string;
  retryCount: number;
  preview: string;
}

// Image inspection utility functions (fast path using createImageBitmap/OffscreenCanvas)
async function resizeImage(file: File): Promise<Blob> {
  const maxDimension = 768; // reduce dimensions to lower payload size

  // If already small enough, skip work
  try {
    const bitmap = await createImageBitmap(file).catch(
      () => null as ImageBitmap | null,
    );
    if (bitmap) {
      let { width, height } = bitmap;
      if (width <= maxDimension && height <= maxDimension) {
        // No resize needed – return original file blob
        return file;
      }

      if (width > height) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }

      // Use OffscreenCanvas when available for faster, non-blocking draw
      const offscreenCtor = (
        window as unknown as {
          OffscreenCanvas?: new (w: number, h: number) => OffscreenCanvas;
        }
      ).OffscreenCanvas;
      const hasOffscreen = Boolean(offscreenCtor);
      const canvas: OffscreenCanvas | HTMLCanvasElement = hasOffscreen
        ? new (offscreenCtor as new (w: number, h: number) => OffscreenCanvas)(
            width,
            height,
          )
        : document.createElement("canvas");
      if (!hasOffscreen) {
        (canvas as HTMLCanvasElement).width = width;
        (canvas as HTMLCanvasElement).height = height;
      }
      const ctx:
        | OffscreenCanvasRenderingContext2D
        | CanvasRenderingContext2D
        | null = (canvas as OffscreenCanvas | HTMLCanvasElement).getContext(
        "2d",
      ) as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D | null;
      ctx?.drawImage(bitmap, 0, 0, width, height);

      // Always convert to JPEG with adaptive quality to keep size below server limit
      let quality = 0.8;
      let blob: Blob | null = hasOffscreen
        ? await (canvas as OffscreenCanvas).convertToBlob({
            type: "image/jpeg",
            quality,
          })
        : await new Promise<Blob | null>((resolve) =>
            (canvas as HTMLCanvasElement).toBlob(
              resolve,
              "image/jpeg",
              quality,
            ),
          );

      // If still large, adaptively reduce quality (down to 0.5)
      const targetBytes = 4 * 1024 * 1024; // aim under ~4 MB to be safe
      while (blob && blob.size > targetBytes && quality > 0.5) {
        quality = Math.max(0.5, quality - 0.1);
        blob = hasOffscreen
          ? await (canvas as OffscreenCanvas).convertToBlob({
              type: "image/jpeg",
              quality,
            })
          : await new Promise<Blob | null>((resolve) =>
              (canvas as HTMLCanvasElement).toBlob(
                resolve,
                "image/jpeg",
                quality,
              ),
            );
      }

      try {
        bitmap.close();
      } catch {}

      if (blob) return blob;
      // Fallback to original if conversion failed
      return file;
    }
  } catch {
    // ignore and fallback
  }

  // Fallback path compatible with older browsers
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = maxDimension;
        let width = img.width;
        let height = img.height;

        if (width <= maxDim && height <= maxDim) {
          resolve(file);
          return;
        }

        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Fallback path: re-encode to JPEG with adaptive quality
        let quality = 0.8;
        const makeBlob = (): void => {
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                reject(new Error("Canvas to Blob conversion failed"));
                return;
              }
              const targetBytes = 3.5 * 1024 * 1024;
              if (blob.size > targetBytes && quality > 0.5) {
                quality = Math.max(0.5, quality - 0.1);
                makeBlob();
                return;
              }
              resolve(blob);
            },
            "image/jpeg",
            quality,
          );
        };
        makeBlob();
      };

      img.onerror = reject;
      if (e.target) {
        img.src = e.target.result as string;
      } else {
        reject(new Error("FileReader event target is null"));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Before/after preview assets used for the right-hand marketing panel.
// Nb.webp = original everyday photo, Na.webp = generated headshot.
const PREVIEW_BASE = "/assets/before-images-and-after-headshots";
const PAIR_COUNT = 15;
const beforeSrc = (n: number) => `${PREVIEW_BASE}/${n}b.webp`;
const afterSrc = (n: number) => `${PREVIEW_BASE}/${n}a.webp`;

// 9 phone-grid cells, each crossfading between two everyday photos.
const GRID_CELLS = Array.from({ length: 9 }, (_, i) => [
  beforeSrc((i % PAIR_COUNT) + 1),
  beforeSrc(((i + 9) % PAIR_COUNT) + 1),
]);
const POLAROID_A = [afterSrc(1), afterSrc(4), afterSrc(7), afterSrc(11)];
const POLAROID_B = [afterSrc(2), afterSrc(5), afterSrc(9), afterSrc(13)];

// Photo-requirements modal content. Good examples come from the
// photo-requirements assets, bad examples from photo-restrictions.
const GUIDE = "/assets/photo-guidelines";
const photoRequirements: {
  title: string;
  description: string;
  good: string[];
  bad: string[];
}[] = [
  {
    title: "A diverse set of photos",
    description: "A variety of outfits, in different settings, on different days.",
    good: [
      `${GUIDE}/photo-requirements/variety/1.webp`,
      `${GUIDE}/photo-requirements/variety/2.jpeg`,
      `${GUIDE}/photo-requirements/variety/3.jpeg`,
      `${GUIDE}/photo-requirements/variety/4.jpeg`,
    ],
    bad: [
      `${GUIDE}/photo-restrictions/no-low-quality-aI-photos/1.jpeg`,
      `${GUIDE}/photo-restrictions/no-low-quality-aI-photos/2.jpeg`,
      `${GUIDE}/photo-restrictions/no-low-quality-aI-photos/3.jpeg`,
      `${GUIDE}/photo-restrictions/no-low-quality-aI-photos/4.jpeg`,
    ],
  },
  {
    title: "Looking at the camera, face clearly visible",
    description: "Your face must be clear and your eyes should look at the camera.",
    good: [
      `${GUIDE}/photo-requirements/clear/1.jpeg`,
      `${GUIDE}/photo-requirements/clear/2.jpeg`,
      `${GUIDE}/photo-requirements/clear/3.jpeg`,
      `${GUIDE}/photo-requirements/clear/4.jpeg`,
    ],
    bad: [
      `${GUIDE}/photo-restrictions/no-unnatural-angles/1.jpeg`,
      `${GUIDE}/photo-restrictions/no-unnatural-angles/2.jpeg`,
      `${GUIDE}/photo-restrictions/no-unnatural-angles/3.jpeg`,
      `${GUIDE}/photo-restrictions/no-unnatural-angles/4.jpeg`,
    ],
  },
  {
    title: "Just you, nothing covering your face",
    description: "No hands, hats, or sunglasses hiding your features.",
    good: [
      `${GUIDE}/photo-requirements/selfies/1.webp`,
      `${GUIDE}/photo-requirements/selfies/2.webp`,
      `${GUIDE}/photo-requirements/selfies/3.webp`,
      `${GUIDE}/photo-requirements/selfies/4.webp`,
    ],
    bad: [
      `${GUIDE}/photo-restrictions/no-hands-on-face/1.jpeg`,
      `${GUIDE}/photo-restrictions/no-hands-on-face/2.jpeg`,
      `${GUIDE}/photo-restrictions/no-hands-on-face/3.jpeg`,
      `${GUIDE}/photo-restrictions/no-hands-on-face/4.jpeg`,
    ],
  },
  {
    title: "Recent and true to life",
    description: "Use photos from the last 6 months that match your current look.",
    good: [
      `${GUIDE}/photo-requirements/recency/1.jpeg`,
      `${GUIDE}/photo-requirements/recency/2.jpeg`,
      `${GUIDE}/photo-requirements/recency/3.webp`,
      `${GUIDE}/photo-requirements/recency/4.webp`,
    ],
    bad: [
      `${GUIDE}/photo-restrictions/no-accessories/1.jpeg`,
      `${GUIDE}/photo-restrictions/no-accessories/2.jpeg`,
      `${GUIDE}/photo-restrictions/no-accessories/3.jpeg`,
      `${GUIDE}/photo-restrictions/no-accessories/4.jpeg`,
    ],
  },
  {
    title: "Keep it professional",
    description: "Avoid revealing clothing for polished business headshots.",
    good: [
      `${GUIDE}/photo-requirements/consistent-look/1.jpeg`,
      `${GUIDE}/photo-requirements/consistent-look/2.jpeg`,
      `${GUIDE}/photo-requirements/consistent-look/3.jpeg`,
      `${GUIDE}/photo-requirements/consistent-look/4.jpeg`,
    ],
    bad: [
      `${GUIDE}/photo-restrictions/no-revealing-clothes/1.jpeg`,
      `${GUIDE}/photo-restrictions/no-revealing-clothes/2.jpeg`,
      `${GUIDE}/photo-restrictions/no-revealing-clothes/3.jpeg`,
      `${GUIDE}/photo-restrictions/no-revealing-clothes/4.jpeg`,
    ],
  },
];

export function UploadStep() {
  const { formData, updateFormData, slug, getNextStep } = useFormStore();
  const router = useRouter();
  const [imageStatuses, setImageStatuses] = useState<ImageStatus[]>([]);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [token, setToken] = useState("");
  const [phonePhotoCount, setPhonePhotoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a one-time session token and build a QR pointing at the mobile
  // upload page (/m/<token>). Photos the phone uploads there are polled and
  // ingested below, so they show up on the desktop automatically.
  useEffect(() => {
    const t =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    setToken(t);
    const mobileUrl = `${window.location.origin}/m/${t}`;
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(
        mobileUrl,
      )}`,
    );
  }, []);
  // Concurrency-limited analysis queue
  const maxConcurrent = 3;
  const activeCountRef = useRef(0);
  const queueRef = useRef<ImageStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Mirror of imageStatuses for synchronous reads during sequential ingestion.
  const statusesRef = useRef<ImageStatus[]>([]);
  // Phone-uploaded storage paths already pulled in, so we don't ingest twice.
  const consumedPathsRef = useRef<Set<string>>(new Set());

  const processQueue = () => {
    if (activeCountRef.current >= maxConcurrent) return;
    const next = queueRef.current.shift();
    if (!next) return;
    activeCountRef.current += 1;
    analyzeImageWithRetry(next).finally(() => {
      activeCountRef.current -= 1;
      // Schedule next tick to avoid deep recursion
      setTimeout(processQueue, 0);
    });
    // Try to fill up remaining concurrency slots
    setTimeout(processQueue, 0);
  };

  const enqueueAnalysis = (imageStatus: ImageStatus) => {
    queueRef.current.push(imageStatus);
    processQueue();
  };

  // Initialize from formData and IndexedDB on component mount
  useEffect(() => {
    const loadStoredImages = async () => {
      if (formData.uploadedImages && formData.uploadedImages.length > 0) {
        try {
          const initialStatuses: ImageStatus[] = [];

          for (const storedPhoto of formData.uploadedImages) {
            const file = await imageStorage.getImage(storedPhoto.id);
            if (file) {
              const preview = URL.createObjectURL(file);
              initialStatuses.push({
                storedPhoto,
                file,
                status: "accepted" as const,
                retryCount: 0,
                preview,
              });
            } else {
              // File not found in IndexedDB, remove from metadata
              console.warn(`File ${storedPhoto.id} not found in IndexedDB`);
            }
          }

          setImageStatuses(initialStatuses);
          statusesRef.current = initialStatuses;

          // Clean up metadata for missing files
          const validStoredPhotos = initialStatuses.map(
            (status) => status.storedPhoto,
          );
          if (validStoredPhotos.length !== formData.uploadedImages.length) {
            updateFormData({ uploadedImages: validStoredPhotos });
          }
        } catch (error) {
          console.error("Error loading stored images:", error);
        }
      }
      setIsLoading(false);
    };

    loadStoredImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup effect to revoke object URLs on unmount
  useEffect(() => {
    return () => {
      imageStatuses.forEach((status) => {
        if (status.preview && status.preview.startsWith("blob:")) {
          URL.revokeObjectURL(status.preview);
        }
      });
    };
  }, [imageStatuses]);

  // Keep a synchronous mirror of imageStatuses so ingestFiles can read the
  // latest list during back-to-back (phone-polled) ingestion.
  useEffect(() => {
    statusesRef.current = imageStatuses;
  }, [imageStatuses]);

  const validateFile = (file: File): string | null => {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, JPG, PNG, and WEBP files are allowed";
    }

    return null;
  };

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const createStoredPhoto = (file: File): StoredPhoto => {
    return {
      id: generateId(),
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };
  };

  const analyzeImageWithRetry = async (imageStatus: ImageStatus) => {
    const maxRetries = 3;

    const updateStatus = (updates: Partial<ImageStatus>) => {
      setImageStatuses((prev) =>
        prev.map((status) =>
          status.storedPhoto.id === imageStatus.storedPhoto.id
            ? { ...status, ...updates }
            : status,
        ),
      );
    };

    const attemptAnalysis = async (attempt: number): Promise<void> => {
      updateStatus({ status: "analyzing", retryCount: attempt });

      try {
        if (!imageStatus.file) {
          throw new Error("File not available for analysis");
        }

        const resizedImage = await resizeImage(imageStatus.file);

        const formData = new FormData();
        // Append blob with filename so server sees it as File
        const fileName = imageStatus.storedPhoto.name || "image";
        formData.append("image", resizedImage, fileName);
        const result = await analyzeImage(formData);

        if (result.success && result.data) {
          updateStatus({
            status: result.data.isAccepted ? "accepted" : "rejected",
            reason: result.data.reason || undefined,
            retryCount: attempt,
          });
        } else {
          throw new Error(result.error || "Analysis failed");
        }
      } catch (error) {
        console.error(`Analysis attempt ${attempt} failed:`, error);

        if (attempt < maxRetries) {
          // Retry after a short delay
          setTimeout(() => attemptAnalysis(attempt + 1), 1000);
        } else {
          updateStatus({
            status: "error",
            reason: "Failed to analyze image after multiple attempts",
            retryCount: attempt,
          });
        }
      }
    };

    await attemptAnalysis(1);
  };

  // Shared ingestion path for both local file picks and phone-polled photos.
  // Stores each file in IndexedDB, adds it to the grid, and enqueues analysis.
  // Reads/writes statusesRef synchronously so sequential calls don't clobber.
  const ingestFiles = async (files: File[]): Promise<number> => {
    const validFiles = files.filter((file) => validateFile(file) === null);
    const remainingSlots = MAX_UPLOADED_IMAGES - statusesRef.current.length;
    if (remainingSlots <= 0) return 0;
    const filesToProcess = validFiles.slice(0, remainingSlots);
    if (filesToProcess.length === 0) return 0;

    const newStatuses: ImageStatus[] = [];
    for (const file of filesToProcess) {
      const storedPhoto = createStoredPhoto(file);
      await imageStorage.storeImage(storedPhoto.id, file);
      newStatuses.push({
        storedPhoto,
        file,
        status: "analyzing" as const,
        retryCount: 0,
        preview: URL.createObjectURL(file),
      });
    }

    const updatedStatuses = [...statusesRef.current, ...newStatuses];
    statusesRef.current = updatedStatuses;
    setImageStatuses(updatedStatuses);
    updateFormData({
      uploadedImages: updatedStatuses.map((status) => status.storedPhoto),
    });
    newStatuses.forEach((imageStatus) => enqueueAnalysis(imageStatus));

    return newStatuses.length;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    const errors = files
      .map((file) => {
        const error = validateFile(file);
        return error ? `${file.name}: ${error}` : null;
      })
      .filter(Boolean) as string[];

    if (errors.length > 0) {
      alert("Some files were not uploaded:\n" + errors.join("\n"));
    }

    try {
      await ingestFiles(files);
    } catch (error) {
      console.error("Error storing images:", error);
      alert("Failed to store some images. Please try again.");
    }

    // Reset input
    event.target.value = "";
  };

  // Poll the mobile-upload relay for photos sent from the phone (via the QR),
  // pull each one in through the same ingestion pipeline, then delete it from
  // storage so it isn't fetched again.
  const atUploadCapacity = imageStatuses.length >= MAX_UPLOADED_IMAGES;
  useEffect(() => {
    // Stop polling the phone-upload relay once the photo cap is reached;
    // resume if the user removes one (atUploadCapacity flips back to false).
    if (!token || atUploadCapacity) return;
    let cancelled = false;

    const poll = async () => {
      if (statusesRef.current.length >= MAX_UPLOADED_IMAGES) return;

      let res: Response;
      try {
        res = await fetch(`/api/mobile-upload/${token}`, { cache: "no-store" });
      } catch {
        return;
      }
      if (!res.ok) return;

      const data = (await res.json().catch(() => null)) as {
        files?: { path: string; signedUrl: string; name: string }[];
      } | null;
      const files = data?.files || [];

      for (const f of files) {
        if (cancelled) break;
        if (consumedPathsRef.current.has(f.path)) continue;
        if (statusesRef.current.length >= MAX_UPLOADED_IMAGES) break;
        consumedPathsRef.current.add(f.path);

        try {
          const blobRes = await fetch(f.signedUrl);
          if (!blobRes.ok) throw new Error("Failed to download phone photo");
          const blob = await blobRes.blob();
          const file = new File([blob], f.name, {
            type: blob.type || "image/jpeg",
          });
          const added = await ingestFiles([file]);
          if (added > 0) setPhonePhotoCount((c) => c + 1);
          // Best-effort cleanup of the relayed object.
          void fetch(
            `/api/mobile-upload/${token}?path=${encodeURIComponent(f.path)}`,
            { method: "DELETE" },
          );
        } catch {
          // Allow a retry on the next poll.
          consumedPathsRef.current.delete(f.path);
        }
      }
    };

    void poll();
    const id = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, atUploadCapacity]);

  const removeFile = async (index: number) => {
    const imageStatus = imageStatuses[index];

    try {
      // Remove from IndexedDB
      await imageStorage.deleteImage(imageStatus.storedPhoto.id);

      // Revoke object URL to prevent memory leaks
      if (imageStatus.preview && imageStatus.preview.startsWith("blob:")) {
        URL.revokeObjectURL(imageStatus.preview);
      }

      const newStatuses = imageStatuses.filter((_, i) => i !== index);
      setImageStatuses(newStatuses);
      updateFormData({
        uploadedImages: newStatuses.map((status) => status.storedPhoto),
      });
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleContinue = () => {
    // Strictly follow validation: only accepted (rule-compliant) photos are
    // carried forward to generation. Rejected / errored / still-analyzing ones
    // are dropped from the reference set here.
    updateFormData({
      uploadedImages: imageStatuses
        .filter((s) => s.status === "accepted")
        .map((s) => s.storedPhoto),
    });
    const next = getNextStep("upload");
    if (next) router.push(`/generate/one-time/${slug}?step=${next}`);
  };

  // const getStatusIcon = (status: ImageStatus['status']) => {
  //   switch (status) {
  //     case 'analyzing':
  //       return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
  //     case 'accepted':
  //       return <Check className="w-4 h-4 text-green-500" />
  //     case 'rejected':
  //     case 'error':
  //       return <X className="w-4 h-4 text-red-500" />
  //   }
  // }

  const getStatusBadge = (imageStatus: ImageStatus) => {
    switch (imageStatus.status) {
      case "analyzing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-600">
            Analyzing...
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-600">
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-600">
            Rejected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-600">
            Error
          </Badge>
        );
    }
  };

  const acceptedImages = imageStatuses.filter(
    (status) => status.status === "accepted",
  );
  const analyzingImages = imageStatuses.filter(
    (status) => status.status === "analyzing",
  );
  const canContinue =
    acceptedImages.length >= MIN_ACCEPTED_IMAGES &&
    analyzingImages.length === 0;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading images...</span>
      </div>
    );
  }

  const uploadedCount = imageStatuses.length;
  const moreNeeded = Math.max(0, MIN_ACCEPTED_IMAGES - uploadedCount);
  const atMaxCapacity = uploadedCount >= MAX_UPLOADED_IMAGES;

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT: upload card */}
        <div className="flex min-h-150 flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            We need {MAX_UPLOADED_IMAGES} photos you already have
          </h1>
          <p className="mt-2 text-gray-600">
            We use your photos to learn how you look. Upload up to{" "}
            {MAX_UPLOADED_IMAGES} clear, recent photos where your face is visible.
          </p>
          <button
            type="button"
            onClick={() => setRequirementsOpen(true)}
            className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Read Photo Requirements
          </button>

          <PhotoRequirementsDialog
            open={requirementsOpen}
            onOpenChange={setRequirementsOpen}
          />

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={atMaxCapacity}
          />

          {/* Upload box */}
          <div className="relative mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60 p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="size-105 rounded-full border border-gray-200/70" />
              <div className="absolute size-75 rounded-full border border-gray-200/70" />
            </div>
            <div className="relative flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-neutral-900">
                Upload from your phone
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Scan QR, upload from your phone gallery
              </p>
              <div className="mt-4 size-40 rounded-md bg-white p-2 shadow-sm">
                {qrUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrUrl}
                    alt="Scan to upload from your phone"
                    className="size-full"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {phonePhotoCount > 0 ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  {phonePhotoCount} photo{phonePhotoCount === 1 ? "" : "s"} added
                  from phone
                </p>
              ) : (
                <p className="mt-3 text-xs text-gray-400">
                  Photos you add on your phone appear here automatically.
                </p>
              )}
              <div className="my-5 flex w-full max-w-xs items-center gap-3">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium text-gray-400">OR</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <Button
                type="button"
                onClick={() => !atMaxCapacity && fileInputRef.current?.click()}
                disabled={atMaxCapacity}
                className="gap-2 rounded-md bg-blue-500 px-6 py-5 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
              >
                <Upload className="size-4" />
                Upload Photos from This Device
              </Button>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-auto flex justify-end pt-10">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="gap-2 rounded-md bg-blue-500 px-6 py-6 text-base font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Create Your Headshots
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* RIGHT: uploaded photos (once any exist) — otherwise marketing visual */}
        {imageStatuses.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-neutral-900">
                Your uploaded photos
              </h2>
              <span className="shrink-0 text-sm text-gray-500">
                {moreNeeded > 0
                  ? `${moreNeeded} more needed`
                  : analyzingImages.length > 0
                    ? `Analyzing ${analyzingImages.length}…`
                    : `${uploadedCount} uploaded`}
              </span>
            </div>
            <p className="mt-2 text-gray-600">
              Upload photos in different outfits and expressions.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {imageStatuses.map((imageStatus, index) => (
                <div key={imageStatus.storedPhoto.id} className="group relative">
                  <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <NextImage
                      src={imageStatus.preview}
                      alt={`Upload ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 140px"
                      className="object-cover object-top"
                    />
                    <span className="absolute bottom-1 left-1 origin-bottom-left scale-90">
                      {getStatusBadge(imageStatus)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label="Remove image"
                    className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-white shadow-sm transition-colors hover:bg-neutral-700"
                  >
                    <X className="size-3" />
                  </button>
                  {imageStatus.reason && (
                    <div className="mt-1 flex items-start gap-1">
                      <AlertCircle className="mt-0.5 size-3 shrink-0 text-red-500" />
                      <p className="text-[11px] leading-tight text-red-600">
                        {imageStatus.reason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden flex-col lg:flex">
            <h2 className="text-xl font-semibold text-neutral-900">
              Everyday photos into Stunning headshots
            </h2>
            <p className="mt-2 text-gray-600">
              All you need are a few photos where your face is clearly visible.
            </p>

            <div className="relative mt-10 flex-1">
            {/* iPhone-style mockup with rotating everyday photos */}
            <div className="relative ml-2 w-[320px] rounded-[2.75rem] bg-neutral-900 p-2.5 shadow-2xl ring-1 ring-black/5">
              <div className="relative overflow-hidden rounded-[2.1rem] bg-white">
                {/* Dynamic island */}
                <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
                {/* Photo grid */}
                <div className="grid grid-cols-3 gap-2 px-3 pt-14">
                  {GRID_CELLS.map((srcs, i) => (
                    <RotatingImage
                      key={i}
                      srcs={srcs}
                      interval={2600 + i * 250}
                      sizes="110px"
                      className="aspect-3/4 rounded-xl"
                    />
                  ))}
                </div>
                {/* Brand lockup */}
                <div className="flex items-center justify-center gap-1.5 pb-9 pt-5">
                  <Logo className="size-5" />
                  <span className="text-sm font-extrabold uppercase tracking-tight text-neutral-900 font-mont">
                    HEADSHOT.AI
                  </span>
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-2.5 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-neutral-300" />
              </div>
            </div>

            {/* Generated headshot polaroids */}
            <div className="absolute right-0 top-2 w-[44%] max-w-[210px] rotate-[6deg] rounded-md border-4 border-white bg-white p-1 shadow-2xl">
              <RotatingImage
                srcs={POLAROID_A}
                interval={4200}
                sizes="210px"
                className="aspect-[4/5] rounded-sm"
              />
            </div>
            <div className="absolute bottom-6 right-6 w-[40%] max-w-[190px] -rotate-[5deg] rounded-md border-4 border-white bg-white p-1 shadow-2xl">
              <RotatingImage
                srcs={POLAROID_B}
                interval={5000}
                sizes="190px"
                className="aspect-[4/5] rounded-sm"
              />
              <span className="absolute -left-3 bottom-4 -rotate-[8deg] text-[10px] font-extrabold uppercase leading-3 text-emerald-600">
                headshot
                <br />
                .ai
              </span>
            </div>
          </div>

          {/* Privacy assurance */}
          <div className="mt-8 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-neutral-700" />
              <p className="font-semibold text-neutral-900">
                Your photos are used only to create your headshots
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Your photos are never sold, shared or used for any other purpose.
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

function PhotoRequirementsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[88vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-gray-100 px-6 pb-4 pt-6 text-left">
          <DialogTitle className="text-xl">Photo requirements</DialogTitle>
          <DialogDescription>
            The AI will learn how you look from the photos you upload.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto bg-gray-50/60 px-6 py-5">
          {photoRequirements.map((req, index) => (
            <div
              key={req.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex gap-4">
                <span className="text-3xl font-bold leading-none text-gray-300">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-neutral-900">
                    {req.title}
                  </h3>
                  <p className="text-sm text-gray-500">{req.description}</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-emerald-600">
                Good Photos
              </p>
              <PhotoRow srcs={req.good} alt={`Good example — ${req.title}`} />

              <p className="mt-4 text-sm font-semibold text-red-500">
                Bad Photos
              </p>
              <PhotoRow srcs={req.bad} alt={`Bad example — ${req.title}`} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PhotoRow({ srcs, alt }: { srcs: string[]; alt: string }) {
  return (
    <div className="mt-2 grid grid-cols-4 gap-2">
      {srcs.map((src) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-md bg-gray-100"
        >
          <NextImage
            src={src}
            alt={alt}
            fill
            sizes="140px"
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

function RotatingImage({
  srcs,
  interval = 3000,
  sizes,
  className,
}: {
  srcs: string[];
  interval?: number;
  sizes?: string;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (srcs.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % srcs.length),
      interval,
    );
    return () => clearInterval(id);
  }, [srcs.length, interval]);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      {srcs.map((src, i) => (
        <NextImage
          key={src}
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={cn(
            "object-cover object-top transition-opacity duration-700 ease-in-out",
            i === idx ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
