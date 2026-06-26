"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FORMAT_MAP } from "@/data/image-formats";
import FormatSelectorPopover from "@/components/landing-page/convert/format-selector-popover";

interface DashboardFormatSelectorProps {
  inputFormat: string;
  outputFormat: string;
  onInputChange: (formatKey: string) => void;
  onOutputChange: (formatKey: string) => void;
  disabled?: boolean;
}

export default function DashboardFormatSelector({
  inputFormat,
  outputFormat,
  onInputChange,
  onOutputChange,
  disabled = false,
}: DashboardFormatSelectorProps) {
  const [inputOpen, setInputOpen] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);

  const inputLabel = FORMAT_MAP[inputFormat]?.label ?? inputFormat.toUpperCase();
  const outputLabel =
    FORMAT_MAP[outputFormat]?.label ?? outputFormat.toUpperCase();

  const handleInputSelect = (formatKey: string) => {
    setInputOpen(false);
    onInputChange(formatKey);
  };

  const handleOutputSelect = (formatKey: string) => {
    setOutputOpen(false);
    onOutputChange(formatKey);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Popover open={inputOpen} onOpenChange={disabled ? undefined : setInputOpen}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className={cn(
              "font-mont flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:shadow-md",
              inputOpen && "border-indigo-300 ring-2 ring-indigo-100",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {inputLabel}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={8}
          className="w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:w-[300px]"
        >
          <FormatSelectorPopover
            selectedFormat={inputFormat}
            onSelect={handleInputSelect}
          />
        </PopoverContent>
      </Popover>

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <ArrowRight className="h-4 w-4 text-gray-500" />
      </div>

      <Popover open={outputOpen} onOpenChange={disabled ? undefined : setOutputOpen}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className={cn(
              "font-mont flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:shadow-md",
              outputOpen && "border-indigo-300 ring-2 ring-indigo-100",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {outputLabel}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={8}
          className="w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:w-[300px]"
        >
          <FormatSelectorPopover
            selectedFormat={outputFormat}
            onSelect={handleOutputSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
