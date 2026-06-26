import React from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import AuthScreen from "@/components/auth/auth-screen";
import { Analytics } from "@vercel/analytics/next"


const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Image */}
      <AuthScreen />

      {/* Right side - Form */}
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative ">
        <div className="absolute top-8 left-8 flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-mont font-semibold text-xl"
          >
            <div className="flex items-center justify-center">
              <Logo className="size-8" />
            </div>
            Headshot.AI
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md px-4 sm:px-6 py-8 lg:py-0">
          {children}
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default AuthLayout;
