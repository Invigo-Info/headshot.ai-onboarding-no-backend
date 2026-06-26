"use client";

import { use, useRef, useState } from "react";
import { Upload, Camera, Check, Loader2, AlertCircle } from "lucide-react";

type Item = {
  id: string;
  preview: string;
  name: string;
  status: "uploading" | "done" | "error";
};

const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

export default function MobileUploadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [items, setItems] = useState<Item[]>([]);
  const galleryRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const doneCount = items.filter((i) => i.status === "done").length;

  const uploadOne = async (file: File) => {
    const id =
      Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const preview = URL.createObjectURL(file);

    if (!ALLOWED.includes(file.type) || file.size > MAX_BYTES) {
      setItems((prev) => [
        ...prev,
        { id, preview, name: file.name, status: "error" },
      ]);
      return;
    }

    setItems((prev) => [
      ...prev,
      { id, preview, name: file.name, status: "uploading" },
    ]);

    try {
      const body = new FormData();
      body.append("image", file, file.name || "photo.jpg");
      const res = await fetch(`/api/mobile-upload/${token}`, {
        method: "POST",
        body,
      });
      setItems((prev) =>
        prev.map((it) =>
          it.id === id
            ? { ...it, status: res.ok ? "done" : "error" }
            : it,
        ),
      );
    } catch {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: "error" } : it)),
      );
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => void uploadOne(f));
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Upload your photos
        </h1>
        <p className="mt-2 text-gray-600">
          Pick photos from your phone — they&apos;ll appear on your computer
          automatically. Keep this page open until you&apos;re done.
        </p>

        <input
          ref={galleryRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleSelect}
          className="hidden"
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleSelect}
          className="hidden"
        />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-6 text-neutral-900 shadow-sm active:scale-[0.98]"
          >
            <Upload className="size-6" />
            <span className="text-sm font-medium">From gallery</span>
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-6 text-neutral-900 shadow-sm active:scale-[0.98]"
          >
            <Camera className="size-6" />
            <span className="text-sm font-medium">Take photo</span>
          </button>
        </div>

        {items.length > 0 && (
          <>
            <div className="mt-7 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                Sent to your computer
              </h2>
              <span className="text-sm text-emerald-600">
                {doneCount} uploaded
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.preview}
                    alt={it.name}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0">
                    {it.status === "uploading" && (
                      <span className="flex size-7 items-center justify-center rounded-full bg-black/55">
                        <Loader2 className="size-4 animate-spin text-white" />
                      </span>
                    )}
                    {it.status === "done" && (
                      <span className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                    {it.status === "error" && (
                      <span className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-red-500">
                        <AlertCircle className="size-3 text-white" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-8 text-center text-xs text-gray-400">
          Your photos are private and used only to create your headshots.
        </p>
      </div>
    </div>
  );
}
