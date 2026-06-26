"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  ChevronRight,
  Loader2,
  Upload,
  X,
  Camera,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getEditorImageSignedUrl,
  revalidateClientSideUploadsDelayed,
  storeEditorImageMetadata,
} from "@/actions/editor-actions";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { Album } from "@/actions/album-actions";

interface ImageUploadScreenProps {
  editorTool: string;
  recentEdits: {
    id: string;
    url: string;
    alt: string;
    isEnhanced: boolean;
  }[];
  recentUploads: {
    id: string;
    url: string;
    alt: string;
  }[];
  recentAlbums: Album[];
}

interface FileWithPreview extends File {
  preview: string;
}

function getToolDisplayName(tool: string): string {
  const toolNames: { [key: string]: string } = {
    "background-changer": "Background Changer",
    "blemish-remover": "Blemish Remover",
    "magic-eraser": "Magic Eraser",
    "image-extender": "Image Extender",
    "text-remover": "Text Remover",
    "unblur-image": "Unblur Image",
    "photo-restoration": "Photo Restoration",
    "color-correction": "Color Correction",
    "image-upscaler": "Image Upscaler",
    "photo-enhancer": "Photo Enhancer",
  };
  return toolNames[tool] || tool;
}

function getToolDescription(tool: string): string {
  const descriptions: { [key: string]: string } = {
    "background-changer":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "blemish-remover":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "magic-eraser":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "image-extender":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "text-remover":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "image-upscaler":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "unblur-image":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "photo-restoration":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "color-correction":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
    "face-restorer":
      "To start editing, upload a new image from your device, or select one from your recent uploads.",
  };
  return (
    descriptions[tool] ||
    "To start editing, upload a new image from your device, or select one from your recent uploads."
  );
}

export function ImageUploadScreen({
  editorTool,
  recentEdits,
  recentUploads,
  recentAlbums,
}: ImageUploadScreenProps) {
  const toolName = getToolDisplayName(editorTool);
  const description = getToolDescription(editorTool);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(
    null
  );

  // Custom upload handler
  const handleUpload = async (file: File) => {
    setIsUploading(true);

    try {
      // Get signed upload URL
      const { signedUrl, filePath } = await getEditorImageSignedUrl();

      // Upload file to Supabase storage
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      // Get image dimensions
      const imageElement = document.createElement("img");
      const imageDimensions = await new Promise<{
        width: number;
        height: number;
      }>((resolve, reject) => {
        imageElement.onload = () => {
          resolve({
            width: imageElement.naturalWidth,
            height: imageElement.naturalHeight,
          });
        };
        imageElement.onerror = reject;
        imageElement.src = URL.createObjectURL(file);
      });
      // Store metadata in database
      const imageId = await storeEditorImageMetadata(
        filePath,
        imageDimensions.width,
        imageDimensions.height
      );
      // Delay revalidation to ensure database transaction is fully committed
      await revalidateClientSideUploadsDelayed(1000); // 1 second delay

      // Redirect to editor
      router.push(`/editor/${editorTool}/${imageId}?from=uploads`);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as FileWithPreview;
      file.preview = URL.createObjectURL(file);
      setUploadedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic"],
      },
      maxSize: 120 * 1024 * 1024, // 120MB
      maxFiles: 1,
      multiple: false,
    });

  const handleRemoveFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
      setUploadedFile(null);
    }
  };

  const handleUploadClick = () => {
    if (uploadedFile) {
      handleUpload(uploadedFile);
    }
  };

  return (
    <div className="min-h-screen lg:p-4 w-full @container sm:ml-2">
      {/* Header */}
      <div className="mb-6">
        <Button variant="outline" className="mb-4 shadow-none" asChild>
          <Link href="/editor" className="inline-flex items-center">
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="mb-4">
          <span className="text-sm font-semibold bg-blue-400/10 text-blue-500 p-2 px-4 rounded uppercase">
            {toolName}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 font-mont">
          Choose an image to{" "}
          {editorTool === "background-changer"
            ? "change the background to."
            : "edit."}
        </h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Upload Area */}
      <Card className="mb-8 border-none shadow-none p-0">
        <CardContent className="p-0">
          {isUploading ? (
            <div className="flex flex-col items-center gap-y-4 p-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Uploading image...</p>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4 flex flex-col items-center w-full">
              <div className="flex items-center gap-x-4 border rounded-lg p-4 w-full">
                <div className="relative w-16 h-16 rounded border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                  <Image
                    src={uploadedFile.preview}
                    alt={uploadedFile.name}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleRemoveFile}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleUploadClick}
                className="w-full max-w-xl bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Upload and Edit
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`
								border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
								${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
								${isDragReject ? "border-red-500 bg-red-50" : ""}
							`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white mb-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload a picture
              </Button>
              <p className="text-sm text-gray-500">
                or <span className="text-blue-600">drag and drop</span> your
                photo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, HEIC, WEBP up to 50MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Edits */}

      {recentEdits.length > 0 && (
        <div className="overflow-hidden mb-8 relaive w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Choose an image from your recent edits
            </h2>
            <Link
              href="/editor/edits"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              See all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="w-full relative">
            <div className="w-full overflow-auto no-scrollbar gap-4 pb-2 flex h-full">
              {recentEdits.map((edit) => (
                <Link
                  key={edit.id}
                  href={`/editor/${editorTool}/${edit.id}?from=edits`}
                  className="relative flex-shrink-0 group"
                >
                  <div className="relative w-48 aspect-[4/5] rounded-lg overflow-hidden">
                    <Image
                      src={`/api/image/${edit.url}?from=edited-images`}
                      alt={edit.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {edit.isEnhanced && (
                      <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                        ✨ Enhanced
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm rounded-md p-1">
                        <Edit className="size-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* white overlay on the right side of the div */}
            </div>
            <div className="pointer-events-none absolute -right-2 top-0 z-base h-full w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      )}

      {/* Recent Uploads */}
      {recentUploads.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Choose an image from your recent uploads
            </h2>
            <Link
              href="/editor/uploaded"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              See all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="w-full relative">
            <div className="w-full relative overflow-auto no-scrollbar gap-4 pb-2 flex h-full">
              {recentUploads.map((upload) => (
                <Link
                  key={upload.id}
                  href={`/editor/${editorTool}/${upload.id}?from=uploads`}
                  className="relative flex-shrink-0 group"
                >
                  <div className="relative w-48 aspect-[4/5] rounded-lg overflow-hidden">
                    <Image
                      src={`/api/image/${upload.url}?from=recent-uploads`}
                      alt={upload.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm rounded-md p-1">
                        <Edit className="size-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-2 top-0 z-base h-full w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      )}

      {/* Recent Albums */}
      {recentAlbums.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Choose an image from your recent albums
            </h2>
            <Link
              href="/albums"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              See all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="w-full relative">
            <div className="w-full relative overflow-auto no-scrollbar gap-4 pb-2 flex h-full">
              {recentAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`/albums/${album.id}`}
                  className="relative flex items-center w-64 flex-shrink-0 flex-col group p-4 border border-border rounded-lg"
                >
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={`/api/image/${album.coverImages[0]}?from=output-images`}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="text-sm w-full flex justify-between">
                    <p className="font-medium text-gray-900 truncate">
                      {album.title}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Camera className="size-4" />
                      <span>{album.photoCount}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-2 top-0 z-base h-full w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
