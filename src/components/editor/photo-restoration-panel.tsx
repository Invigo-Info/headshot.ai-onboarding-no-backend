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
import { BriefcaseMedical } from "lucide-react";

export function PhotoRestorationPanel({
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
      const response = await fetch("/api/photo-restoration", {
        method: "POST",
        body: JSON.stringify({
          userImage: currentImageUrl, 
        }),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // throw new Error(`Failed to restore image: ${errorData.error || "An unknown error occurred while restoring image"}`);
        toast.error("An unknown error occurred while restoring image. Please try again.");
      }

      toast.success("Image restored successfully!");

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
        <BriefcaseMedical className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Photo Restoration</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
      Restore old, damaged, or blurry photos to their original quality.
      </p>

      <div className="w-full h-full flex items-center justify-center">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/assets/editor-page/photo-restoration/6b.webp"
              srcSet="/assets/editor-page/photo-restoration/6b.webp"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/assets/editor-page/photo-restoration/6a.jpg"
              srcSet="/assets/editor-page/photo-restoration/6a.jpg"
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
