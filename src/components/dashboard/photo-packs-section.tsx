import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhotoPackCard } from "@/components/photos/photo-pack-card";
import { Skeleton } from "@/components/ui/skeleton";
import { photoPacks } from "@/data/photo-packs";
import { ChevronRight } from "lucide-react";

export async function PhotoPacksSection() {
  const packs = (photoPacks).filter(
    (pack) => pack.is_active && !pack.pro
  );
  // Handle error or loading state
  if (!packs || (typeof packs === "object" && "error" in packs)) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Create More Headshots</h2>
          <Link href="/photos">
            <Button variant="outline" size="sm" className="cursor-pointer">
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>  
      </div>
    );
  }

  

  return (
    <div className="space-y-6 @container">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Create More Headshots</h2>
        <Link href="/photos">
          <Button variant="outline" size="sm" className="cursor-pointer">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

     <div className="w-full flex flex-nowrap gap-4 overflow-x-auto no-scrollbar">
     {packs.map((pack) => (
            <div key={pack.id}  className="w-72 aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl">
              <PhotoPackCard pack={pack} />
            </div>
          ))}
     </div>
      {/* Photo Packs Grid */}
      {/* <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {activePacks.slice(0, 5).map((pack) => (
            <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={pack.id}>
              <PhotoPackCard key={pack.id} pack={pack} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer absolute -left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2" />
      </Carousel> */}
    </div>
  );
}
