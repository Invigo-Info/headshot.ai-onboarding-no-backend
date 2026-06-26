import { Suspense } from "react";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { RecentAlbums } from "@/components/dashboard/recent-albums";
import { PhotoPacksSection } from "@/components/dashboard/photo-packs-section";
import { RecentEditsSection } from "@/components/dashboard/recent-edits-section";
import { RecentUploadsSection } from "@/components/dashboard/recent-uploads-section";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { getUserAlbums } from "@/actions/album-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { GeneratingAlbumsBanner } from "@/components/dashboard/generating-albums-banner";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (authError || !user) {
    redirect("/login");
  }

  const albums = await getUserAlbums();
  const hasAlbums = albums.length > 0;
  const generatingAlbumIds = albums
    .filter((a) => a.status === "generating" || a.status === "training")
    .map((a) => a.id);

  // If user has no albums, show the welcome screen
  if (!hasAlbums) {
    const userName =
      user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

    return (
      <div className="min-h-screen">
        <div className="mr-auto sm:px-6 lg:px-8 py-6 space-y-6 max-w-full">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome, {userName}!</p>
          </div>

          <hr className="border-gray-200" />

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-32 sm:py-40">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
              <Camera className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No activity yet
            </h2>
            <p className="text-gray-500 text-center max-w-sm mb-8">
              Your headshots and albums will show up here once you create them.
            </p>
            <Link href="/photos">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full cursor-pointer">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // If user has albums, show the full dashboard
  return (
    <div className="min-h-screen">
      <div className="mr-auto sm:px-6 lg:px-8 py-6 space-y-16 sm:space-y-10 max-w-full overflow-hidden">
        {/* Overview Section */}
        <DashboardOverview user={user} />

        {/* Generating Albums Progress */}
        {generatingAlbumIds.length > 0 && (
          <GeneratingAlbumsBanner
            initialGeneratingAlbumIds={generatingAlbumIds}
          />
        )}

        {/* Recent Albums Section */}
        <Suspense fallback={<DashboardLoading count={4} />}>
          <RecentAlbums albums={albums} />
        </Suspense>

        {/* Recent Uploads Section */}
        <Suspense fallback={<DashboardLoading count={6} />}>
          <RecentUploadsSection />
        </Suspense>
        {/* Recent Edits Section */}
        <Suspense fallback={<DashboardLoading count={6} />}>
          <RecentEditsSection />
        </Suspense>

        {/* Editor Tools Section */}
        {/* <Suspense fallback={<DashboardLoading count={4} />}>
          <EditorToolsSection internal={true} />
        </Suspense> */}

        {/* Photo Packs Section */}
        <Suspense fallback={<DashboardLoading count={5} />}>
          <PhotoPacksSection />
        </Suspense>
      </div>
    </div>
  );
}