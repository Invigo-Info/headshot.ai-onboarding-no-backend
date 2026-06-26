import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const backgroundOptions = [
  {
    label: "Black Backgrounds",
    href: "/photo-editor/background-changer/black-background",
  },
  {
    label: "White Backgrounds",
    href: "/photo-editor/background-changer/white-background",
  },
  {
    label: "Blue Backgrounds",
    href: "/photo-editor/background-changer/blue-background",
  },
  {
    label: "Brown Backgrounds",
    href: "/photo-editor/background-changer/brown-background",
  },
  {
    label: "Gray Backgrounds",
    href: "/photo-editor/background-changer/gray-background",
  },
  {
    label: "Green Backgrounds",
    href: "/photo-editor/background-changer/green-background",
  },
  {
    label: "Pink Backgrounds",
    href: "/photo-editor/background-changer/pink-background",
  },
  {
    label: "Yellow Backgrounds",
    href: "/photo-editor/background-changer/yellow-background",
  },
  {
    label: "Purple Backgrounds",
    href: "/photo-editor/background-changer/purple-background",
  },
];
const DiscoverMoreBackgrounds = () => {
  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-8">
          Discover more background options
        </h2>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {backgroundOptions.map((option) => (
            <div
              key={option.label}
              className="bg-black/10 hover:bg-gray-200 p-4 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              <Link href={option.href} className="">
                {option.label}
              </Link>{" "}
              <ChevronRight className="size-4 sm:size-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverMoreBackgrounds;
