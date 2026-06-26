import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getUserHeadshots } from "@/actions/headshot-actions";

// Signed URLs are user-specific + short-lived, so never cache this page.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MyHeadshotsPage() {
  const headshots = await getUserHeadshots();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          My Headshots
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Your generated professional headshots.
        </p>
      </div>

      {headshots.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <ImageIcon className="size-6" />
          </span>
          <p className="font-medium text-gray-700">No headshots yet</p>
          <p className="max-w-sm text-sm text-gray-500">
            Once you generate and unlock a headshot pack, your photos will
            appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {headshots.map((shot) => (
            <a
              key={shot.id}
              href={shot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-4/5 overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
            >
              <Image
                src={shot.url}
                alt="Generated headshot"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
