"use client";

import { useState } from "react";
import LoaingOverlay from "../shared/loading-overlay";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SprayCan } from "lucide-react";

export function ColorCorrectionPanel({
  currentImageUrl,
}: {
  currentImageUrl: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const handleEdit = async () => {
    if (!currentImageUrl) {
      toast.error("Please ensure an image is loaded for editing");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/color-correction", {
        method: "POST",
        body: JSON.stringify({
          userImage: currentImageUrl,
        }),
      });

      if (!response.ok) {
        // const errorMessage = await response.json();
        // throw new Error(`Failed to correct color: ${errorMessage.error || "An unknown error occurred while correcting color"}`);
        toast.error("An unknown error occurred while correcting color. Please try again.");
      }

      // const data = await response.json()

      router.push(`/editor/edits`);
    } catch (error) {
      toast.error((error as Error).message);
      return;
    } finally {
      setIsProcessing(false);
    }
  };

  // Main panel view
  return (
    <div className="lg:min-h-screen relative pb-4 lg:p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <SprayCan className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Color Correction</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Fix image saturation, contrast, and exposure.
      </p>

      <div className="w-full h-full flex items-center justify-center">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/assets/editor-page/color-correction/11b.jpg"
              srcSet="/assets/editor-page/color-correction/11b.jpg"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/assets/editor-page/color-correction/11a.webp"
              srcSet="/assets/editor-page/color-correction/11a.webp"
              alt="Image two"
            />
          }
        />
      </div>

      <div className="mt-auto lg:absolute bottom-0 left-4 right-4 z-20 bg-white py-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          onClick={handleEdit}
          disabled={!currentImageUrl || isProcessing}
        >
          Edit
        </Button>
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoaingOverlay />}
    </div>
  );
}
