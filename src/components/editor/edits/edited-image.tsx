"use client"
import Image from "next/image";
import { deleteEditedImage, RecentEdit } from "@/actions/editor-actions";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import { toast } from "sonner";
import { ImageModal } from "../image-modal";

const EditedImage = ({
  image,
  allImages,
  currentIndex
}: {
  image: RecentEdit;
  allImages: RecentEdit[];
  currentIndex: number;
}) => {
  const handleDownloadSingle = async (
    url: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `edited_${uuidv4()}.${blob.type.split("/")[1]}`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDelete = async (imageId: string, path: string) => {
    toast.loading("Deleting image...", {id: 'delete-image'})
    const data = await deleteEditedImage(imageId, path)
    if(data?.success){
      toast.success("Image deleted successfully", {id: 'delete-image'})
    }
  }


  return (
    <ImageModal images={allImages} initialIndex={currentIndex}>
      <div
        key={image.id}
        className="break-inside-avoid mb-4 relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
        style={{
          aspectRatio: image.width && image.height ? `${image.width} / ${image.height}` : '4 / 5'
        }}
      >
        <Image
          src={`/api/image/${image.url}?from=edited-images`}
          alt={image.alt}
          width={image.width || 400}
          height={image.height || 400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover object-top"
          priority = {currentIndex > 4 ? false : true}
        />
        <div className="absolute top-2 right-2 flex gap-2 flex-col">
        <Button
                            size="sm"
                            className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadSingle(`/api/image/${image.url}?from=edited-images` )
                            }}
                          >
                            <Download className="size-6" />
                          </Button>
                          <Button
                            size="sm"
                            className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(image.id, image.path)
                            }}
                          >
                            <Trash className="size-6" />
                          </Button>
        </div>

      </div>
    </ImageModal>
  );
};

export default EditedImage;
