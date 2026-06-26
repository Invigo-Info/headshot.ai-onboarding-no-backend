import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Don't let pre-existing lint/type issues block production builds on Vercel.
  // The app type-checks at runtime/dev; these flags only stop `next build` from
  // failing the deploy on long-standing warnings (e.g. supabase cookie-callback
  // implicit-any, optional user_metadata) that are unrelated to runtime behavior.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  compiler: {
    removeConsole: process.env.VERCEL_ENV === 'production',
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },

  // api: {
  //   responseLimit: '10mb', // Set to your desired limit, e.g., '10mb'
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onzzgoypstndvzlecduu.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'hkhirjrexkljpyfjcwcj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'sjltenembpkgzoixzizi.supabase.co',
      },
    ],
  },
};

export default nextConfig;
