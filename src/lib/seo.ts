import type { Metadata } from "next";
import { siteMetaData } from "@/siteMetaData";

interface PageMetadataParams {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

export function createPageMetadata({
  title,
  description,
  canonicalPath,
  ogImage,
}: PageMetadataParams): Metadata {
  const url = `${siteMetaData.baseUrl}${canonicalPath}`;
  const image = ogImage ?? siteMetaData.ogImage;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMetaData.title,
      images: [{ url: image, width: 1854, height: 973 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
