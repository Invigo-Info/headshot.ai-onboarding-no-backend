import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getAlbumById, getAlbumProgress } from "@/actions/album-actions";
import { checkReviewModalEligibility } from "@/actions/review-actions";
import AlbumDetails from "@/components/albums/album-details";
import AlbumProgressComponent from "@/components/albums/album-progress";

interface AlbumDetailPageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const albumId = (await params).albumId;
  const album = await getAlbumById(albumId);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Album not found
          </h1>
          <Link href="/albums">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Albums
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If album is generating, show progress component
  if (album.status === 'generating') {
    const progress = await getAlbumProgress(albumId);
    return <AlbumProgressComponent albumId={albumId} initialProgress={progress} />;
  }

  let reviewEligibility = null;
  if (album.status === 'done') {
    reviewEligibility = await checkReviewModalEligibility(albumId);
  }

  return <AlbumDetails album={album} reviewEligibility={reviewEligibility} />;
}
