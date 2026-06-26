import { PhotoPackCard } from "./photo-pack-card"
import type { PhotoPack } from "@/data/photo-packs"

interface PhotoPacksGridProps {
  packs: PhotoPack[]
}

export function PhotoPacksGrid({ packs }: PhotoPacksGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {packs.map((pack, index) => (
        <PhotoPackCard key={pack.id} pack={pack} isMostPopular={index === 0} />
      ))}
    </div>
  )
}
