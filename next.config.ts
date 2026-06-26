import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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
