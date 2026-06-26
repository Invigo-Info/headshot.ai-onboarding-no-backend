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
import { BrushCleaning } from "lucide-react";

export function UnblurImagePanel({
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
      const response = await fetch("/api/unblur-image", {
        method: "POST",
        body: JSON.stringify({
          userImage: currentImageUrl,
        }),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // throw new Error(`Failed to unblur image: ${errorData.error || "An unknown error occurred while unblurring image"}`);
        toast.error("An unknown error occurred while unblurring image. Please try again.");
      }

      toast.success("Image unblurred successfully!");

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
        <BrushCleaning className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Unblur Image</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
      Fix blurry photos and enhance overall image quality.
      </p>

      <div className="w-full h-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center pb-6">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/assets/editor-page/unblur-image/1b.png"
              srcSet="/assets/editor-page/unblur-image/1b.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-top rounded-lg"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/assets/editor-page/unblur-image/1a.webp"
              srcSet="/assets/editor-page/unblur-image/1a.webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-top rounded-lg"
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
