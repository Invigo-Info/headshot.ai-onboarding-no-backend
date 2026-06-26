"use client";

import { useState, useMemo } from "react";
import { PhotoPacksGrid } from "@/components/photos/photo-packs-grid";
import { photoPacks } from "@/data/photo-packs";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

const INITIAL_VISIBLE_COUNT = 8;

const POPULARITY_ORDER = [
  "professional-headshots",
  "linkedin-headshots",
  "corporate-headshots",
  "business-headshots",
  "realtor-headshots",
  "executive-headshots",
  "actor-headshots",
  "lawyer-headshots",
  "doctor-headshots",
  "model-headshots",
  "dating-photos",
  "theatrical-headshots",
  "dancer-headshots",
  "eras-headshots",
  "ceo-headshots",
  "graduation-headshots",
  "casting-headshots",
  "black-and-white-headshots",
  "therapist-headshots",
  "author-headshots",
  "ballet-dancer-headshots",
  "musician-headshots",
  "entrepreneur-headshots",
  "teacher-headshots",
  "tinder-headshots",
  "bumble-headshots",
  "nurse-headshots",
  "singer-headshots",
  "dentist-headshots",
  "chef-headshots",
  "personal-trainer-headshots",
  "esthetician-headshots",
  "software-engineer-headshots",
  "hair-stylist-headshots",
  "interior-designer-headshots",
  "makeup-artist-headshots",
  "nurse-practitioner-headshots",
  "nail-technician-headshots",
  "massage-therapist-headshots",
  "data-analyst-headshots",
  "sales-executive-headshots",
  "sales-manager-headshots",
  "architect-headshots",
  "hairdresser-headshots",
  "hinge-headshots",
  "professor-headshots",
  "psychologist-headshots",
  "surgeon-headshots",
  "yoga-teacher-headshots",
];

export default function PhotosMain() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const activePacks = useMemo(
    () => photoPacks.filter((pack) => !pack.pro && pack.is_active),
    [],
  );

  const filteredPacks = useMemo(() => {
    if (!searchQuery.trim()) return activePacks;
    const q = searchQuery.toLowerCase();
    return activePacks.filter(
      (pack) =>
        pack.title.toLowerCase().includes(q) ||
        pack.description.toLowerCase().includes(q) ||
        pack.group.toLowerCase().includes(q),
    );
  }, [activePacks, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const popularPacks = useMemo(() => {
    const orderMap = new Map(POPULARITY_ORDER.map((slug, i) => [slug, i]));
    return [...filteredPacks].sort((a, b) => {
      const aIdx = orderMap.get(a.slug) ?? Infinity;
      const bIdx = orderMap.get(b.slug) ?? Infinity;
      return aIdx - bIdx;
    });
  }, [filteredPacks]);

  return (
    <div className="min-h-screen mb-16">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Create My Headshots
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Choose a headshot type to get started.
          </p>
        </div>
      </header>

      {/* Browse controls */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Search bar */}
        <div className="relative w-full max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headshot types..."
            className="w-full pl-11 pr-10 py-3 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search results */}
        {isSearching && filteredPacks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No packs found for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {isSearching && filteredPacks.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              {filteredPacks.length} result{filteredPacks.length !== 1 && "s"}{" "}
              for &ldquo;{searchQuery}&rdquo;
            </p>
            <PhotoPacksGrid packs={filteredPacks} />
          </div>
        )}

        {!isSearching && (
          <>
            <PhotoPacksGrid
              packs={
                showAll
                  ? popularPacks
                  : popularPacks.slice(0, INITIAL_VISIBLE_COUNT)
              }
            />
            {popularPacks.length > INITIAL_VISIBLE_COUNT && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
                >
                  {showAll ? (
                    <>
                      Show less
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show more headshots
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
