import React from "react";
import { getAlbumImageById, getAlbumById } from "@/actions/album-actions";
import { getCurrentUserId } from "@/actions/editor-actions";
import { notFound, redirect } from "next/navigation";
import { AlbumEditorLayout } from "@/components/editor/album-editor-layout";

const AlbumImageEditorPage = async ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const { albumId, imageId } = await params;
  
  // Get current user ID
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  // Fetch image data from album
  const imageData = await getAlbumImageById(albumId, imageId);
  if (!imageData) {
    notFound();
  }

  // Get album data for context
  const albumData = await getAlbumById(albumId);
  if (!albumData) {
    notFound();
  }

  return (
    <AlbumEditorLayout 
      albumId={albumId}
      imageSrc={imageData.url}
      albumTitle={albumData.title}
      userId={userId}
      width={imageData.width}
      height={imageData.height}
    />
  );
};

export default AlbumImageEditorPage; 