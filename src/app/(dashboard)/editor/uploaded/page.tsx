import { getRecentUploads } from "@/actions/editor-actions";
import UploadedImagesList from "@/components/editor/recent-uploads/uploaded-images-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const dynamic = 'force-dynamic';

const UploadsPage = async () => {
  const uploads = await getRecentUploads();
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <Button variant="outline" className="mb-4" asChild>
          <Link href="/editor">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Editor
          </Link>
        </Button>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Recent Uploads
            </h1>
            <p className="text-gray-600">View your recent edits.</p>
          </div>
        </div>

        <UploadedImagesList uploads={uploads} />
      </div>
    </div>
    // <div>
    //   {editedImages.map((image) => (
    //     <div key={image.id}>
    //       <Image src={image.url} alt={image.alt} width={image.width || 0} height={image.height || 0} />
    //     </div>
    //   ))}
    // </div>
  );
};

export default UploadsPage;
