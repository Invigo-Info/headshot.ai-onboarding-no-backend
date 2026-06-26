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
import { Blend } from "lucide-react";

export function BlemishRemoverPanel({currentImageUrl}: {currentImageUrl: string}) {
  const [isProcessing, setIsProcessing] = useState(false);
	const router = useRouter()
  const handleEdit = async () => {
	if (!currentImageUrl) {
		toast.error('Please ensure an image is loaded for editing')
		return
	}

	setIsProcessing(true)

	try{
		const response = await fetch('/api/blemish-remover', {
			method: 'POST',
			body: JSON.stringify({
				userImage: currentImageUrl,
			}),
		})
	
		if (!response.ok) {
			// const errorMessage = await response.json();
			// throw new Error(`Failed to remove blemishes: ${errorMessage.error || "An unknown error occurred while removing blemishes"}`);
			toast.error("An unknown error occurred while removing blemishes. Please try again.");
		}

		// const data = await response.json()

		router.push(`/editor/edits`)
	} catch (error) {
		toast.error((error as Error).message);
		return;
	} finally {
		setIsProcessing(false)
	}
  }

  // Main panel view
  return (
    <div className="lg:p-4 lg:min-h-screen relative">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Blend className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold">Blemish Remover</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Remove all kinds of blemishes: pimples, acne scars, dark spots, and
        more!
      </p>

      <div className="w-full h-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center pb-6">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/assets/editor-page/blemish-remover/1b.webp"
              srcSet="/assets/editor-page/blemish-remover/1b.webp"
              alt="Image one"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover object-top rounded-lg"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/assets/editor-page/blemish-remover/1a.jpeg"
              srcSet="/assets/editor-page/blemish-remover/1a.jpeg"
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
