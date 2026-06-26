import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRecentUploads } from "@/actions/editor-actions";
import { ChevronRight, Sparkles } from "lucide-react";

export async function RecentUploadsSection() {
  const recentUploads = await getRecentUploads(10);

  if(recentUploads.length === 0){
    return null; // Don't render the section if there are no recent uploads
  }

  return (
    <div className="space-y-6 @container">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Uploads</h2>
        <Link href="/editor/uploaded">
          <Button variant="outline" size="sm" className="cursor-pointer">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Recent Edits Grid */}
      {recentUploads.length === 0 ? (
        // Empty state
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <div className="col-span-full text-center py-8">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No uploads yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start uploading your photos to get started.
            </p>
            <Link href="/editor">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Try AI Editor
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-nowrap gap-4 overflow-x-auto no-scrollbar">
          {recentUploads.slice(0, 10).map((edit) => (
            <Card
              key={edit.id}
              className="group p-0 hover:shadow-lg transition-shadow duration-200 overflow-hidden w-48 aspect-[4/5] flex-shrink-0"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src={`/api/image/${edit.url}?from=recent-uploads`}
                      alt={edit.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(edit.created_at).toLocaleDateString()}
                      </span>
                      <Link href={`/editor/edits`}>
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                          View Edit
                        </Button>
                      </Link>
                    </div>
                  </div>  */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
