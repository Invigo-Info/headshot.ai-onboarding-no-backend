import { type ReactNode } from "react";
import Navbar from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";
import { Analytics } from "@vercel/analytics/next";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {children}
      <Analytics />
      <Footer />
    </div>
  );
}
