import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="absolute top-0 left-0 w-fit flex items-center gap-2 px-4 my-4">
          <SidebarTrigger className="-ml-1" />
        </div>
        <main className="flex flex-col gap-4 px-4 pt-12 sm:pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
    <Toaster richColors />
    </>
  );
}