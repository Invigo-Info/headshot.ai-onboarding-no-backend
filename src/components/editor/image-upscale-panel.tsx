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
import { ImageUpscale } from "lucide-react";

export function ImageUpscalePanel({
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
      const response = await fetch("/api/image-upscale", {
        method: "POST",
        body: JSON.stringify({
          userImage: currentImageUrl,
        }),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // throw new Error(`Failed to upscale image: ${errorData.error || "An unknown error occurred while upscaling image"}`);
        toast.error("An unknown error occurred while upscaling image. Please try again.");
      }

      toast.success("Image upscaled successfully!");

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
        <ImageUpscale className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Image Upscaler</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Enhance the quality and increase the resolution of your images.
      </p>

      <div className="w-full h-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center pb-6">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/assets/editor-page/image-upscaler/2b.jpg"
              srcSet="/assets/editor-page/image-upscaler/2b.jpg"
              alt="Image one"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-top rounded-lg"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/assets/editor-page/image-upscaler/2a.jpg"
              srcSet="/assets/editor-page/image-upscaler/2a.jpg"
              alt="Image two"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-top rounded-lg"
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
