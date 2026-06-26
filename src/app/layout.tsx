import type { Metadata } from "next";
import { Open_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { siteMetaData } from "@/siteMetaData";

const montserrat = Plus_Jakarta_Sans({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteMetaData.title,
  // title: {
  //   template: `%s | ${siteMetaData.title}`,
  //   default: siteMetaData.title,
  // },
  description: siteMetaData.description,
  metadataBase: new URL(siteMetaData.baseUrl),
  openGraph: {
    title: siteMetaData.title,
    description: siteMetaData.description,
    url: siteMetaData.baseUrl,
    siteName: siteMetaData.title,
    images: [
      {
        url: siteMetaData.ogImage, // Must be an absolute URL
        width: 1854,
        height: 973,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: process.env.VERCEL_ENV === "production" ? true : false,
    follow: process.env.VERCEL_ENV === "production" ? true : false,
    googleBot: {
      index: process.env.VERCEL_ENV === "production" ? true : false,
      follow: process.env.VERCEL_ENV === "production" ? true : false,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetaData.title,
    description: siteMetaData.description,
    // creator: '@nextjs',
    images: [siteMetaData.ogImage], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.VERCEL_ENV === "production" && (
        <GoogleTagManager gtmId="GTM-K62BS776" />
      )}
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased font-open`}
      >
        {children}
      </body>
    </html>
  );
}
