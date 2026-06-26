import React from "react";
import {
  EditorLayout,
  BackgroundChangerPanel,
  GenericEditorPanel,
  BlemishRemoverPanel,
  MagicEraserLayout,
  ImageExtenderPanel,
  TextRemoverPanel,
  ImageUpscalePanel,
  UnblurImagePanel,
  ColorCorrectionPanel,
  FaceRestorerPanel,
} from "@/components/editor";
import { getEditorImageById, getCurrentUserId } from "@/actions/editor-actions";
import { notFound, redirect } from "next/navigation";
import { PhotoRestorationPanel } from "@/components/editor/photo-restoration-panel";

const EditorToolImagePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ editorTool: string; imageId: string }>;
  searchParams: Promise<{ from: string }>;
}) => {
  const { editorTool, imageId } = await params;

  const { from } = await searchParams;
  if (!from) {
    redirect(`/editor/${editorTool}`);
  }
  // Fetch image data from database

  // Get current user ID
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  const imageData = await getEditorImageById(imageId, from);
  if (!imageData) {
    notFound();
  }
  const imgUrl = `/api/image/${imageData.url}?from=${from === "edits" ? "edited-images" : "recent-uploads"}`;

  // Handle Magic Eraser specially due to canvas overlay
  if (editorTool === "magic-eraser") {
    return (
      <MagicEraserLayout
        editorTool={editorTool}
        imageSrc={imgUrl}
        userId={userId}
        width={imageData.width}
        height={imageData.height}
      />
    );
  }

  // Render appropriate panel based on editor tool
  const renderPanel = () => {
    switch (editorTool) {
      case "background-changer":
        return <BackgroundChangerPanel currentImageUrl={imgUrl} />;
      case "blemish-remover":
        return <BlemishRemoverPanel currentImageUrl={imgUrl} />;
      case "image-extender":
        return (
          <ImageExtenderPanel currentImageUrl={imgUrl} />
        );
      case "text-remover":
        return <TextRemoverPanel currentImageUrl={imgUrl} />;
      case "image-upscaler":
        return <ImageUpscalePanel currentImageUrl={imgUrl} />;
      case "unblur-image":
        return <UnblurImagePanel currentImageUrl={imgUrl} />;
      case "photo-restoration":
        return <PhotoRestorationPanel currentImageUrl={imgUrl} />;
      case "color-correction":
        return <ColorCorrectionPanel currentImageUrl={imgUrl} />;
      case "face-restorer":
        return <FaceRestorerPanel currentImageUrl={imgUrl} />;
      default:
        return <GenericEditorPanel editorTool={editorTool} />;
    }
  };


  return (
    <EditorLayout editorTool={editorTool} imageSrc={imgUrl} width={imageData.width} height={imageData.height}>
      {renderPanel()}
    </EditorLayout>
  );
};

export default EditorToolImagePage;
