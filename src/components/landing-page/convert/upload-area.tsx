"use client";

import Link from "next/link";
import { ImageUp } from "lucide-react";

interface UploadAreaProps {
  inputFormat?: string;
  outputFormat?: string;
}

export default function UploadArea({ inputFormat, outputFormat }: UploadAreaProps) {
  const loginHref =
    inputFormat && outputFormat
      ? `/login?convert=${inputFormat}-to-${outputFormat}`
      : "/login";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <Link
        href={loginHref}
        className="group flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/30 sm:min-h-[350px] md:min-h-[400px]"
      >
        <div className="relative mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-500">
            <ImageUp className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-0.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2.5V9.5M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <h3 className="font-mont mb-1.5 text-lg font-semibold text-gray-900">
          Add Images
        </h3>
        <p className="font-open text-sm text-gray-400">
          Drag & Drop or{" "}
          <span className="font-medium text-indigo-600 underline underline-offset-2">
            Select Images
          </span>
        </p>
      </Link>
    </div>
  );
}
