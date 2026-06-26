import React from "react";
import { redirect } from "next/navigation";
import { ImageUploadScreen } from "@/components/editor";
import { getRecentEdits, getRecentUploads } from "@/actions/editor-actions";
import { getUserAlbums } from "@/actions/album-actions";

export const dynamic = 'force-dynamic';

const validEditorTools = [
  'background-changer',
  'blemish-remover',
  'color-correction',
  'face-restorer',
  'image-extender',
  'image-upscaler',
  'magic-eraser',
  'photo-restoration',
  'text-remover',
  'unblur-image'
];

const EditorToolPage = async ({
  params,
}: {
  params: Promise<{ editorTool: string }>;
}) => {
  const { editorTool } = await params;

  // Validate editor tool - redirect to background-changer if invalid
  if (!validEditorTools.includes(editorTool)) {
    redirect('/editor/background-changer');
  }

  // Fetch data server-side with error handling
  const [recentEdits, recentUploads, recentAlbums] = await Promise.allSettled([
    getRecentEdits(),
    getRecentUploads(),
    getUserAlbums()
  ]);

  return (
    <ImageUploadScreen 
      editorTool={editorTool}
      recentEdits={recentEdits.status === 'fulfilled' ? recentEdits.value : []}
      recentUploads={recentUploads.status === 'fulfilled' ? recentUploads.value : []}
      recentAlbums={recentAlbums.status === 'fulfilled' ? recentAlbums.value : []}
    />
  );
};

export default EditorToolPage;
