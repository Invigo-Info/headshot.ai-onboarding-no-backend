"use client";

import { useState, useEffect } from "react";
import LoadingOverlay from "../shared/loading-overlay";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Expand } from "lucide-react";
import Image from "next/image";

interface ImageExtenderPanelProps {
  currentImageUrl: string;
}

export function ImageExtenderPanel({
  currentImageUrl
}: ImageExtenderPanelProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("16:9");
  const [originalImageSize, setOriginalImageSize] = useState<[number, number] | null>(null);
  const router = useRouter();

  // Available aspect ratios
  const aspectRatios = [
    { label: "1:1", value: "1:1" },
    { label: "2:3", value: "2:3" },
    { label: "3:2", value: "3:2" },
    { label: "3:4", value: "3:4" },
    { label: "4:3", value: "4:3" },
    { label: "4:5", value: "4:5" },
    { label: "5:4", value: "5:4" },
    { label: "9:16", value: "9:16" },
    { label: "16:9", value: "16:9" }
  ];

  // Load original image to get dimensions
  useEffect(() => {
    if (currentImageUrl) {
      const img = new window.Image();
      img.onload = () => {
        setOriginalImageSize([img.naturalWidth, img.naturalHeight]);
      };
      img.src = currentImageUrl;
    }
  }, [currentImageUrl]);

  const handleExtend = async () => {
    if (!currentImageUrl) {
      toast.error("Please ensure an image is loaded for editing");
      return;
    }

    if (!originalImageSize) {
      toast.error("Image dimensions not loaded yet");
      return;
    }

    setIsProcessing(true);

    try {
      const requestData = {
        image_url: currentImageUrl,
        aspect_ratio: selectedAspectRatio
      };

      const response = await fetch("/api/image-extender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // throw new Error(`Failed to extend image: ${errorData.error || "An unknown error occurred while extending image"}`);
        toast.error("An unknown error occurred while extending image. Please try again.");
      }

      toast.success("Image extended successfully!");
      router.push(`/editor/edits`);
    } catch (error) {
      toast.error((error as Error).message);
      return;
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate preview dimensions based on selected aspect ratio
  const getPreviewDimensions = () => {
    if (!originalImageSize) return null;

    const [originalWidth, originalHeight] = originalImageSize;
    const [targetWidth, targetHeight] = selectedAspectRatio.split(':').map(Number);

    // Calculate new dimensions based on aspect ratio
    let newWidth, newHeight;

    // Compare aspect ratios to determine how to scale
    const originalRatio = originalWidth / originalHeight;
    const targetRatio = targetWidth / targetHeight;

    if (targetRatio > originalRatio) {
      // Target is wider than original - expand width
      newHeight = originalHeight + 200; // padding for preview
      newWidth = newHeight * targetRatio;
    } else {
      // Target is taller than original - expand height
      newWidth = originalWidth + 200; // padding for preview
      newHeight = newWidth / targetRatio;
    }

    return {
      original: { width: originalWidth, height: originalHeight },
      extended: {
        width: Math.round(newWidth),
        height: Math.round(newHeight)
      }
    };
  };

  const previewDims = getPreviewDimensions();
  return (
    <div className="lg:min-h-screen relative pb-4 lg:p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Expand className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Image Extender</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Choose an aspect ratio to extend your photo and fill the new background.
      </p>

      {/* Aspect Ratio Selection */}
      <div className="mb-6">
        <div className="mb-3">
          <label className="text-sm font-medium">Select Aspect Ratio</label>
          <p className="text-xs text-gray-500 mt-1">Choose the desired aspect ratio for your extended image</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => setSelectedAspectRatio(ratio.value)}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                selectedAspectRatio === ratio.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {ratio.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-6 max-w-lg lg:max-w-xl mx-auto">
        <p className="text-sm font-medium text-gray-900 mb-3 text-center">
          Preview ({selectedAspectRatio})
        </p>
        
        {currentImageUrl && originalImageSize && previewDims && (
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden mx-auto"
            style={{
              aspectRatio: `${previewDims.extended.width} / ${previewDims.extended.height}`,
              maxHeight: '400px',
            }}
          >
            {/* Extended background (blurred version of original) */}
            <div className="inset-0">
              <Image
                src={currentImageUrl}
                alt="Extended background"
                fill
                className="object-cover blur-sm opacity-50 scale-110"
              />
            </div>
            
            {/* Original image in center */}
            <div
              className="absolute bg-white rounded-lg overflow-hidden shadow-sm"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${(originalImageSize[0] / previewDims.extended.width) * 100}%`,
                height: `${(originalImageSize[1] / previewDims.extended.height) * 100}%`,
              }}
            >
              <Image
                src={currentImageUrl}
                alt="Original image preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>


      {/* Action Button */}
      <div className="space-y-2 lg:absolute bottom-4 left-4 right-4 z-20">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          onClick={handleExtend}
          disabled={!currentImageUrl || isProcessing || !originalImageSize || !selectedAspectRatio}
        >
          Edit
        </Button>
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoadingOverlay />}
    </div>
  );
} 