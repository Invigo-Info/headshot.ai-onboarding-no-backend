import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";

export function UtilityTools() {
  return (
    <div className="my-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Utility Tools
      </h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/editor/image-converter"
          className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 hover:shadow-md"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Image Converter
        </Link>
      </div>
    </div>
  );
}
