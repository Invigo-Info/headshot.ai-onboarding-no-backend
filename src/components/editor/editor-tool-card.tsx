import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { EditorTool } from "@/types/editor.types";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface EditorToolCardProps {
  tool: EditorTool;
  isSelected?: boolean;
}

export function EditorToolCard({ tool, isSelected }: EditorToolCardProps) {
  return (
    <Card
      className={`cursor-pointer py-0 border-none shadow-none ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${tool.name} tool`}
    >
      <CardContent className="p-0">
        <div className="aspect-[5/4] rounded-xl overflow-hidden">
          <ReactCompareSlider
            className="w-full h-full object-top"
            itemOne={
              <ReactCompareSliderImage
                src={tool.beforeSrc}
                alt="before"
                className="!object-top object-cover w-full h-full"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={tool.afterSrc}
                alt="after"
                className="!object-top object-cover w-full h-full"
              />
            }
          />
        </div>
        <Link href={tool.href} className="block w-full">
          <div className="p-4 pl-0">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tool.description}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
