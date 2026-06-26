"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ArrowLeft, Check, X, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getRecentUploads,
  getEditorImageSignedUrl,
  storeEditorImageMetadata,
  revalidateClientSideUploadsDelayed,
} from "@/actions/editor-actions";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import LoaingOverlay from "../shared/loading-overlay";
import { useRouter } from "next/navigation";

interface RecentUpload {
  id: string;
  url: string;
  alt: string;
}

interface FileWithPreview extends File {
  preview: string;
}

interface BackgroundChangerPanelProps {
  onBackgroundSelect?: (background: string) => void;
  currentImageUrl?: string; // The image being edited
}

// Mock data for different background categories
const colorBackgrounds = [
  { id: "#000000", name: "Black", color: "#000000" },
  { id: "#1e3a8a", name: "Navy Blue", color: "#1e3a8a" },
  { id: "#f45905", name: "Bright blue", color: "#f45905" },
  { id: "#5b6466", name: "Dark Charcoal", color: "#5b6466" },
  { id: "#dda205", name: "Golden Yellow", color: "#dda205" },
  { id: "#f8f3e7", name: "Ivory", color: "#f8f3e7" },
  { id: "#c1a3e1", name: "Lovender", color: "#c1a3e1" },
  { id: "#a48c6b", name: "Light Brown", color: "#a48c6b" },
  { id: "#dadada", name: "Light Gray", color: "#dadada" },
  { id: "#1ec64e", name: "Lime Green", color: "#1ec64e" },
  { id: "#5e2028", name: "Maroon", color: "#5e2028" },
  { id: "#929592", name: "Medium Gray", color: "#929592" },
  { id: "#f9bbcb", name: "Pale Pink", color: "#f9bbcb" },
  { id: "#570283", name: "Royal Purple", color: "#570283" },
  { id: "#70c3e9", name: "Sky Blue", color: "#70c3e9" },
  { id: "#b98e66", name: "Tan", color: "#b98e66" },
  { id: "#ffffff", name: "White", color: "#ffffff" },

  // { id: "#1e40af", name: "Dark Navy", color: "#1e40af" },
  // { id: "#1e293b", name: "Midnight Blue", color: "#1e293b" },
  // { id: "#92400e", name: "Coffee", color: "#92400e" },
  // { id: "#c2410c", name: "Copper", color: "#c2410c" },
  // { id: "#64748b", name: "Slate", color: "#64748b" },
  // { id: "#6b7280", name: "Gray", color: "#6b7280" },
  // { id: "#ffffff", name: "White", color: "#ffffff" },
  // { id: "#e5e7eb", name: "Light Gray", color: "#e5e7eb" },
  // { id: "#f9fafb", name: "Off-White", color: "#f9fafb" },
  // { id: "#a3a3a3", name: "Taupe", color: "#a3a3a3" },
  // { id: "#bfdbfe", name: "Light Blue", color: "#bfdbfe" },
  // { id: "#fce7f3", name: "Light Pink", color: "#fce7f3" },
];

interface BackgroundItem {
  id: string;
  src?: string;
  alt?: string;
  name?: string;
  color?: string;
}

interface BackgroundCategory {
  id: string;
  name: string;
  type: "color" | "image";
  count?: number;
  path?: string;
  items?: BackgroundItem[];
}

// Unified background categories configuration
const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  {
    id: "colors",
    name: "Colors",
    type: "color",
    items: colorBackgrounds,
  },
  {
    id: "nature",
    name: "Nature",
    type: "image",
    count: 19,
    path: "/assets/editor-backgrounds/nature",
  },
  {
    id: "office",
    name: "Office",
    type: "image",
    count: 18,
    path: "/assets/editor-backgrounds/office",
  },
  {
    id: "city",
    name: "City",
    type: "image",
    count: 30,
    path: "/assets/editor-backgrounds/city",
  },
  {
    id: "abstract",
    name: "Abstract",
    type: "image",
    count: 28,
    path: "/assets/editor-backgrounds/abstract",
  },
  {
    id: "studio-light",
    name: "Studio Light",
    type: "image",
    count: 18,
    path: "/assets/editor-backgrounds/studio-light",
  },
  {
    id: "dark-studio-light",
    name: "Dark Studio Light",
    type: "image",
    count: 21,
    path: "/assets/editor-backgrounds/dark-studio-light",
  },
]

// Utility to generate image items for categories
const generateBackgroundItems = (category: BackgroundCategory): BackgroundItem[] => {
  if (category.type === "color" && category.items) return category.items
  if (category.type === "image" && category.count && category.path) {
    return Array.from({ length: category.count }, (_, i) => ({
      id: `${category.id}-${i + 1}`,
      src: `${category.path}/${i + 1}.webp`,
      alt: `${category.name} background ${i + 1}`,
    }))
  }
  return []
}

// Sub-panel components extracted to module scope
const SubPanelHeader = ({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) => (
  <div className="flex items-center mb-6">
    <Button
      variant="ghost"
      size="sm"
      onClick={onBack}
      className="p-0 h-auto mr-2"
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
)

const SubPanelDescription = () => (
  <p className="text-sm text-gray-600 mb-6">
    Remove your image backgrounds or replace them with a backdrop from our
    collection.
  </p>
)

const EditButton = ({
  onEdit,
  disabled,
}: {
  onEdit: () => void
  disabled: boolean
}) => (
  <div className="mt-auto sticky bottom-0 left-4 right-4 z-20 bg-white py-4">
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
      onClick={onEdit}
      disabled={disabled}
    >
      Edit
    </Button>
  </div>
)

const ImageGridItem = ({
  item,
  isSelected,
  onSelect,
}: {
  item: BackgroundItem
  isSelected: boolean
  onSelect: (id: string) => void
}) => (
  <button
    onClick={() => onSelect(item.id)}
    className={`relative aspect-square rounded-lg overflow-hidden group ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
  >
    <Image
      src={item.src || ''}
      alt={item.alt || ''}
      fill
      sizes="(max-width: 768px) 50vw, 33vw"
      className="object-cover object-top"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    <div className="absolute top-2 right-2">
      <div
        className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
          isSelected ? 'bg-blue-500' : 'bg-white/20 backdrop-blur-sm'
        }`}
      >
        <Check
          className={`w-3 h-3 ${
            isSelected
              ? 'text-white'
              : 'text-white opacity-0 group-hover:opacity-100'
          } transition-opacity`}
        />
      </div>
    </div>
  </button>
)

const ColorGridItem = ({
  item,
  isSelected,
  onSelect,
}: {
  item: BackgroundItem
  isSelected: boolean
  onSelect: (id: string) => void
}) => (
  <button
    onClick={() => onSelect(item.id)}
    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left ${
      isSelected ? 'bg-gray-50' : ''
    }`}
  >
    <div
      className={`w-6 h-6 rounded-full border ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{ backgroundColor: item.color }}
    />
    <span className="text-sm font-medium">{item.name}</span>
    {isSelected && <Check className="w-4 h-4 text-gray-600 ml-auto" />}
  </button>
)

interface SubPanelProps {
  category: BackgroundCategory
  selectedItem: string
  onItemSelect: (id: string) => void
  onBack: () => void
  onEdit: () => void
  isProcessing: boolean
}

const SubPanel = ({
  category,
  selectedItem,
  onItemSelect,
  onBack,
  onEdit,
  isProcessing,
}: SubPanelProps) => {
  return (
    <div className="lg:p-4 min-h-screen h-full relative">
      <SubPanelHeader title={category.name} onBack={onBack} />
      <SubPanelDescription />

      {category.type === 'color' && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-3">Custom colors</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="aspect-square w-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Input
                type="color"
                className="size-full p-0 m-0 rounded-2xl outline-0 ring-0 border-none bg-transparent cursor-pointer"
                onChange={(e) => onItemSelect(e.target.value)}
              />
            </div>
            {['#8b5cf6', '#d8b4fe', '#7c3aed'].map((color) => (
              <button
                key={color}
                onClick={() => onItemSelect(color)}
                className={`aspect-square w-20 my-[2px] rounded-sm relative ${
                  color === '#8b5cf6'
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400'
                    : color === '#d8b4fe'
                    ? 'bg-purple-300'
                    : 'bg-purple-600'
                } ${selectedItem === color ? 'ring-2 ring-blue-500' : ''}`}
              >
                {selectedItem === color && (
                  <div className="absolute top-1 right-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <ScrollArea className={category.type === 'color' ? 'h-[20rem] py-8' : 'h-[80%]'}>
        {category.type === 'color' ? (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
            {category.items?.map((item) => (
              <ColorGridItem
                key={item.id}
                item={item}
                isSelected={selectedItem === item.id}
                onSelect={onItemSelect}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-8 p-[2px]">
            {category.items?.map((item) => (
              <ImageGridItem
                key={item.id}
                item={item}
                isSelected={selectedItem === item.id}
                onSelect={onItemSelect}
              />
            ))}
          </div>
        )}
        <ScrollBar />
      </ScrollArea>

      <EditButton onEdit={onEdit} disabled={!selectedItem} />
      {isProcessing && <LoaingOverlay />}
    </div>
  )
}

export function BackgroundChangerPanel({
  onBackgroundSelect,
  currentImageUrl,
}: BackgroundChangerPanelProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("main");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Memoized background categories with generated items
  const backgroundCategories = useMemo(
    () => BACKGROUND_CATEGORIES.map((category) => ({
      ...category,
      items: generateBackgroundItems(category),
    })),
    []
  )

  // Utility: convert image URL to base64 in browser
  const convertImageToBase64 = async (src: string): Promise<string> => {
    const response = await fetch(src)
    const blob = await response.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(typeof reader.result === 'string' ? reader.result : '')
      }
      reader.readAsDataURL(blob)
    })
  }

  useEffect(() => {
    const fetchRecentUploads = async () => {
      const uploads = await getRecentUploads();
      setRecentUploads(uploads);
    };
    fetchRecentUploads();
  }, []);

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
    onBackgroundSelect?.(itemId);
  };

  const handleSectionSelect = (section: string) => {
    setActiveSection(section);
    setSelectedItem(""); // Reset selection when changing sections
  };

  const handleBackToMain = () => {
    setActiveSection("main");
    setSelectedItem("");
  };

  const handleEdit = async () => {
    if (!selectedItem || !currentImageUrl) {
      toast.error(
        "Please select a background and ensure an image is loaded for editing"
      );
      return;
    }

    setIsProcessing(true);

    try {
      // Check if selected item is a color (starts with #)
      if (selectedItem.startsWith("#")) {
        // Handle color backgrounds - call background-color-changer API directly
        const response = await fetch("/api/background-color-changer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userImage: currentImageUrl,
            backgroundColor:
              colorBackgrounds.find((bg) => bg.id === selectedItem)?.name ||
              "white",
          }),
        });

        if (!response.ok) {
          // const errorData = await response.json();
          // throw new Error(`Failed to change background color: ${errorData.error || "An unknown error occurred while changing background color"}`);
          toast.error("An unknown error occurred while changing background color. Please try again.");
        }

        await response.json();
        toast.success("Background color changed successfully!");
        router.push("/editor/edits");
      } else {
        // Handle image backgrounds (categories + uploads)
        let backgroundImageUrl = ""
        const categoryItem = backgroundCategories
          .flatMap((cat) => cat.items || [])
          .find((item) => item.id === selectedItem)

        if (categoryItem?.src) {
          backgroundImageUrl = await convertImageToBase64(categoryItem.src)
        } else if (selectedItem.startsWith('upload-')) {
          const uploadId = selectedItem.replace('upload-', '')
          const upload = recentUploads.find((u) => u.id === uploadId)
          backgroundImageUrl = upload?.url || ''
        } else {
          const upload = recentUploads.find((u) => u.id === selectedItem)
          backgroundImageUrl = upload?.url || ''
        }

        if (!backgroundImageUrl) {
          toast.error("Selected background image not found");
          return;
        }

        // Call background-replace API directly
        const response = await fetch("/api/background-replace", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userImage: currentImageUrl,
            backgroundImage: backgroundImageUrl,
          }),
        });

        if (!response.ok) {
          // const errorData = await response.json();
          // throw new Error(`Failed to replace background: ${errorData.error || "An unknown error occurred while replacing background"}`);
          toast.error("An unknown error occurred while replacing background. Please try again.");
        }

        await response.json();
        toast.success("Background replaced successfully!");
        router.push("/editor/edits");
      }
    } catch (error) {
      toast.error((error as Error).message);
      return;
    } finally {
      setIsProcessing(false);
    }
  };

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

      // revalidate client side uploads with delay
      await revalidateClientSideUploadsDelayed(1000);

      // Use the new upload for background changing
      const uploadUrl = URL.createObjectURL(file);
      handleItemSelect(`upload-${imageId}`);
      onBackgroundSelect?.(uploadUrl);

      // Refresh recent uploads
      const uploads = await getRecentUploads();
      setRecentUploads(uploads);

      toast.success("Image uploaded successfully!");
      setUploadedFile(null);
    } catch (error) {
      toast.error((error as Error).message);
      return;
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

  // Your uploads sub-panel
  if (activeSection === "your-uploads") {
    return (
      <div className="lg:p-4 pb-12 min-h-screen h-full relative">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToMain}
            className="p-0 h-auto mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">Your uploads</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Remove your image backgrounds or replace them with a backdrop from our
          collection.
        </p>

        {/* Uploads Grid */}
        <ScrollArea className="h-[80%]">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {recentUploads.length >0 ? recentUploads.map((upload) => (
              <button
                key={upload.id}
                onClick={() => handleItemSelect(upload.id)}
                className={`relative aspect-square rounded-md overflow-hidden group ${
                  selectedItem === upload.id ? "border-2 border-blue-500" : ""
                }`}
              >
                <Image
                  src={`/api/image/${upload.url}?from=recent-uploads`}
                  alt={upload.alt}
                  fill
                  className="object-cover w-full h-full object-top"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-2 right-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      selectedItem === upload.id
                        ? "bg-blue-500"
                        : "bg-white/20 backdrop-blur-sm"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        selectedItem === upload.id
                          ? "text-white"
                          : "text-white opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                    />
                  </div>
                </div>
              </button>
            )) : (
              <div className="col-span-full text-center py-8">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  No uploads yet
                </div>
            )}
          </div>
        </ScrollArea>

        {/* Edit Button */}
        <div className="mt-auto absolute bottom-0 left-4 right-4 z-20 bg-white py-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={handleEdit}
            disabled={!selectedItem}
          >
            Edit
          </Button>
        </div>

        {/* Loading Overlay */}
        {isProcessing && <LoaingOverlay />}
      </div>
    );
  }

  // If a category is active, render the unified sub-panel
  const currentCategory = backgroundCategories.find((c) => c.id === activeSection)
  if (currentCategory) {
    return (
      <SubPanel
        category={currentCategory}
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
        onBack={handleBackToMain}
        onEdit={handleEdit}
        isProcessing={isProcessing}
      />
    )
  }

  // Main panel view
  return (
    <div className="lg:p-4 min-h-screen relative w-full">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 mr-3">
          <div className="w-full h-full bg-gray-900 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
        </div>
        <h2 className="text-lg font-semibold">Background Changer</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Remove your image backgrounds or replace them with a backdrop from our
        collection.
      </p>

      {/* Upload Area */}
      <Card className="mb-6">
        <CardContent className="p-4">
          {isUploading ? (
            <div className="flex flex-col items-center gap-y-4 p-6">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Uploading image...</p>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4">
              <div className="flex items-center gap-x-4 border rounded-lg p-4">
                <div className="relative w-16 h-16 rounded border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                  <Image
                    src={uploadedFile.preview}
                    alt={uploadedFile.name}
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
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Upload and Use as Background
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`
								border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
								${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
								${isDragReject ? "border-red-500 bg-red-50" : ""}
							`}
            >
              <input {...getInputProps()} />
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white mb-2"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload a picture
              </Button>
              <p className="text-xs text-gray-500">
                or <span className="text-blue-600">drag and drop</span> your
                photo
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, HEIC, WEBP up to 120MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Your uploads */}
      <div className="mb-6 py-2 px-4 border border-border rounded-lg hover:border-blue-600">
        <button
          onClick={() => handleSectionSelect("your-uploads")}
          className="w-full text-left cursor-pointer"
        >
          <h3 className="text-sm font-medium mb-3">Your uploads</h3>
          <div className="flex gap-2">
            {recentUploads.length >0 ? recentUploads.slice(0, 3).map((upload) => (
              <div
                key={upload.id}
                className="relative w-12 h-12 rounded-sm overflow-hidden"
              >
                <Image
                  src={`/api/image/${upload.url}?from=recent-uploads`}
                  alt={upload.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )) : (
              <div className="col-span-full text-muted-foreground flex items-center justify-center text-center text-sm">
                <Sparkles className="size-4 text-gray-400 mr-2" />
                <span>No uploads yet</span>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Category sections (data-driven) */}
      {backgroundCategories.map((category) => (
        <div
          key={category.id}
          className="mb-6 py-2 px-4 border border-border rounded-lg hover:border-blue-600"
        >
          <button
            onClick={() => handleSectionSelect(category.id)}
            className="w-full text-left cursor-pointer overflow-hidden"
          >
            <h3 className="text-sm font-medium mb-3">{category.name}</h3>
            <div className="flex flex-nowrap gap-1 overflow-x-auto no-scrollbar">
              {category.type === 'color'
                ? category.items?.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="aspect-square rounded-full size-8"
                      style={{ backgroundColor: item.color }}
                    />
                  ))
                : category.items?.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square rounded overflow-hidden size-12 lg:size-16"
                    >
                      <Image
                        src={item.src || ''}
                        alt={item.alt || ''}
                        fill
                        sizes="(max-width: 768px) 25vw, 10vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
            </div>
          </button>
        </div>
      ))}

      {/* Loading Overlay */}
      {isProcessing && <LoaingOverlay />}
    </div>
  );
}
