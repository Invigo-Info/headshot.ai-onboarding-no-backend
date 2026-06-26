"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ImageIcon } from "lucide-react";
import {
  getGeneratingAlbumsProgress,
  AlbumProgress,
} from "@/actions/album-actions";
import { toast } from "sonner";

interface GeneratingAlbumsBannerProps {
  initialGeneratingAlbumIds: string[];
}

const SECONDS_PER_HEADSHOT = 15;

export function GeneratingAlbumsBanner({
  initialGeneratingAlbumIds,
}: GeneratingAlbumsBannerProps) {
  const router = useRouter();
  const [albums, setAlbums] = useState<AlbumProgress[]>([]);
  const [isPolling, setIsPolling] = useState(
    initialGeneratingAlbumIds.length > 0
  );
  const previousAlbumIdsRef = useRef<Set<string>>(
    new Set(initialGeneratingAlbumIds)
  );
  const albumTitlesRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (!isPolling) return;

    const poll = async () => {
      try {
        const progress = await getGeneratingAlbumsProgress();
        const currentIds = new Set(progress.map((a) => a.id));

        // Track titles for toast messages
        for (const album of progress) {
          albumTitlesRef.current.set(album.id, album.packTitle);
        }

        // Check if any previously tracked albums completed
        for (const prevId of previousAlbumIdsRef.current) {
          if (!currentIds.has(prevId)) {
            const title =
              albumTitlesRef.current.get(prevId) || "Your headshots";
            toast.success(`${title} - All headshots are ready!`);
            albumTitlesRef.current.delete(prevId);
            router.refresh();
          }
        }

        previousAlbumIdsRef.current = currentIds;
        setAlbums(progress);

        if (progress.length === 0) {
          setIsPolling(false);
        }
      } catch (error) {
        console.error("Error polling generating albums:", error);
      }
    };

    poll();

    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [isPolling, router]);

  if (albums.length === 0) return null;

  return (
    <div className="space-y-3">
      {albums.map((album) => (
        <GeneratingAlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

function GeneratingAlbumCard({ album }: { album: AlbumProgress }) {
  const percentage = Math.round(
    (album.currentImageCount / album.maxImages) * 100
  );
  const remainingImages = album.maxImages - album.currentImageCount;
  const estimatedMinutes = Math.max(
    1,
    Math.ceil((remainingImages * SECONDS_PER_HEADSHOT) / 60)
  );
  const isTraining = album.status === "training";
const linkToAlbum = isTraining ? "#" : `/albums/${album.id}`;
  return (
    <Link href={linkToAlbum}>
      <div className="rounded-xl bg-gradient-to-br from-blue-50/90 via-cyan-50/60 to-sky-50/40 border border-blue-100/80 p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-blue-200/80 cursor-pointer my-4">
        {/* Top row: spinner + title + badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
              {album.packTitle}
            </h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white tracking-wide">
            {isTraining ? "Generating" : "Generating"}
            {/* kep the generating for both cases to avoid confusion for non-technical users */}
          </span>
        </div>

        {!isTraining ? (
          <>
            {/* Progress bar */}
            <div className="w-full rounded-full h-2.5 bg-blue-100/70 mb-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Stats row */}
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p className="text-sm text-gray-600 font-medium">
                  {percentage}% complete
                </p>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{album.maxImages} headshots</span>
                </div>
              </div>
              {remainingImages > 0 && (
                <p className="text-sm text-gray-500">
                  ~{estimatedMinutes} min{estimatedMinutes !== 1 ? "s" : ""}{" "}
                  remaining
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Your headshots are being generated. This may take a few minutes...
          </p>
        )}
      </div>
    </Link>
  );
}
