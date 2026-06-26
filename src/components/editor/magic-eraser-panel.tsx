"use client";

import { useState, useRef, useEffect } from "react";
import LoaingOverlay from "../shared/loading-overlay";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eraser } from "lucide-react";
import { Slider } from "../ui/slider";

interface MagicEraserPanelProps {
  currentImageUrl: string;
  userId: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  onBrushSizeChange?: (newSize: number[]) => void;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function MagicEraserPanel({ 
  currentImageUrl, 
  userId, 
  onCanvasReady,
  onBrushSizeChange,
  canvasRef: externalCanvasRef
}: MagicEraserPanelProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [brushSize, setBrushSize] = useState([20]);
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = externalCanvasRef || internalCanvasRef;
  const router = useRouter();

  const handleEdit = async () => {
    if (!currentImageUrl) {
      toast.error("Please ensure an image is loaded for editing");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error("Canvas not found");
      return;
    }

    // Check if user has drawn anything on the canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Canvas context not found");
      return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasDrawing = imageData.data.some((pixel, index) => {
      // Check alpha channel (every 4th pixel starting from index 3)
      return index % 4 === 3 && pixel > 0;
    });

    if (!hasDrawing) {
      toast.error("Please brush over the area you want to remove");
      return;
    }

    setIsProcessing(true);

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Failed to create mask");
          setIsProcessing(false);
          return;
        }

        const maskImageFile = new File([blob], "mask.png", { type: "image/png" });

        const formData = new FormData();
        formData.append("userImage", currentImageUrl);
        formData.append("userId", userId);
        formData.append("maskImageFile", maskImageFile);

        try {
          const response = await fetch("/api/magic-eraser", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            // const errorData = await response.json();
            // toast.error(`Failed to remove object: ${errorData.error || "An unknown error occurred while removing object"}`);
            toast.error("An unknown error occurred while removing object. Please try again.");
            setIsProcessing(false);
          }

          toast.success("Object removed successfully!");
          router.push(`/editor/edits`);
        } catch (fetchError) {
          toast.error((fetchError as Error).message);
          setIsProcessing(false);
          return;
        }
      }, "image/png");
    } catch (error) {
      toast.error((error as Error).message);
      setIsProcessing(false);
      return;
    } 
  };



  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [onCanvasReady, canvasRef]);


  return (
    <div className="lg:min-h-screen relative py-8 p-0 lg:p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Eraser className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Magic Eraser</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Remove objects, people, and text by brushing over the area to erase. You
        can adjust the brush size for finer or broader selections.
      </p>

      {/* Brush Size Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium">Brush size</label>
          <span className="text-xs text-gray-500">{brushSize[0]}px</span>
        </div>
        <Slider
          value={brushSize}
          onValueChange={(value) => {
            setBrushSize(value);
            if (onBrushSizeChange) {
              onBrushSizeChange(value);
            }
          }}
          max={50}
          min={5}
          step={1}
          className="w-full mb-3"
        />
        <div className="flex justify-end">
          <div
            className="bg-blue-500 rounded-full border border-blue-600"
            style={{
              width: `${Math.max(brushSize[0] / 2, 8)}px`,
              height: `${Math.max(brushSize[0] / 2, 8)}px`,
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Instructions:
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">1.</span>
            <span>Brush over the object you want to remove</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">2.</span>
            <span>Adjust brush size as needed</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">3.</span>
            <span>Click &quot;Edit&quot; to process the image</span>
          </div>
        </div>
      </div>



      {/* Action Buttons */}
      <div className="space-y-3 mt-auto lg:absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className="w-full h-12 text-base"
          onClick={clearCanvas}
          disabled={isProcessing}
        >
          Clear Selection
        </Button>
        <Button
          className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 cursor-pointer"
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