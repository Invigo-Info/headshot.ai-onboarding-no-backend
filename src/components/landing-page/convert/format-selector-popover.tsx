"use client";

import { useState } from "react";
import { POPULAR_FORMATS } from "@/data/image-formats";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface FormatSelectorPopoverProps {
  selectedFormat: string;
  excludeFormat?: string;
  onSelect: (formatKey: string) => void;
}

export default function FormatSelectorPopover({
  selectedFormat,
  excludeFormat,
  onSelect,
}: FormatSelectorPopoverProps) {
  const [search, setSearch] = useState("");

  const filteredFormats = POPULAR_FORMATS.filter((f) =>
    f.key !== excludeFormat &&
    (f.label.toLowerCase().includes(search.toLowerCase()) ||
    f.fullName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Search Format"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-open w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          autoFocus
        />
      </div>

      <div className="max-h-[320px] overflow-y-auto p-3">
        {filteredFormats.length > 0 && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              {filteredFormats.map((format) => (
                <button
                  key={format.key}
                  onClick={() => onSelect(format.key)}
                  className={cn(
                    "font-mont rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all duration-150",
                    selectedFormat === format.key
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredFormats.length === 0 && (
          <p className="font-open py-6 text-center text-sm text-gray-400">
            No formats found.
          </p>
        )}
      </div>
    </div>
  );
}
