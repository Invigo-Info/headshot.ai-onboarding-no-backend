import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getUploadById } from "@/actions/training-upload-actions";
import UploadDetails from "@/components/uploads/upload-details";

interface UploadDetailPageProps {
  params: Promise<{
    uploadId: string;
  }>;
}

export default async function UploadDetailPage({ params }: UploadDetailPageProps) {
  const upload = await getUploadById((await params).uploadId);

  if (!upload) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Training upload not found
          </h1>
          <Link href="/uploads">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Uploads
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <UploadDetails upload={upload} />;
} 