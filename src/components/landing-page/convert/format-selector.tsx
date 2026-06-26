"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FORMAT_MAP } from "@/data/image-formats";
import FormatSelectorPopover from "./format-selector-popover";

interface FormatSelectorProps {
  currentInput: string;
  currentOutput: string;
}

export default function FormatSelector({
  currentInput,
  currentOutput,
}: FormatSelectorProps) {
  const router = useRouter();
  const [inputOpen, setInputOpen] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);

  const inputFormat = FORMAT_MAP[currentInput];
  const outputFormat = FORMAT_MAP[currentOutput];

  const handleInputSelect = (formatKey: string) => {
    setInputOpen(false);
    router.push(`/convert/${formatKey}-to-${currentOutput}`);
  };

  const handleOutputSelect = (formatKey: string) => {
    setOutputOpen(false);
    router.push(`/convert/${currentInput}-to-${formatKey}`);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Input format selector */}
      <Popover open={inputOpen} onOpenChange={setInputOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "font-mont flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:shadow-md",
              inputOpen && "border-indigo-300 ring-2 ring-indigo-100"
            )}
          >
            {inputFormat?.label ?? currentInput.toUpperCase()}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={8}
          className="w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:w-[300px]"
        >
          <FormatSelectorPopover
            selectedFormat={currentInput}
            excludeFormat={currentOutput}
            onSelect={handleInputSelect}
          />
        </PopoverContent>
      </Popover>

      {/* Arrow */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <ArrowRight className="h-4 w-4 text-gray-500" />
      </div>

      {/* Output format selector */}
      <Popover open={outputOpen} onOpenChange={setOutputOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "font-mont flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:shadow-md",
              outputOpen && "border-indigo-300 ring-2 ring-indigo-100"
            )}
          >
            {outputFormat?.label ?? currentOutput.toUpperCase()}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={8}
          className="w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:w-[300px]"
        >
          <FormatSelectorPopover
            selectedFormat={currentOutput}
            excludeFormat={currentInput}
            onSelect={handleOutputSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
