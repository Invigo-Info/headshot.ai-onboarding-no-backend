import { Toaster } from "@/components/ui/sonner";

export default function GenerateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      {children}
      <Toaster richColors />
    </main>
  );
}
