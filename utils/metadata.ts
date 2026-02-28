import { Metadata } from "next";

export interface MetadataParams {
  title: string;
  description: string;
  siteUrl: string; // Site origin/base URL (e.g., https://jsmonkey.netlify.app)
  canonicalPath: string; // Full canonical URL
  ogImageUrl: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  ogImageType?: string;
  siteName?: string;
}

export function buildMetadata(params: MetadataParams): Metadata {
  const {
    title,
    description,
    siteUrl,
    canonicalPath,
    ogImageUrl,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogImageAlt = "JSMonkey",
    ogImageType = "image/png",
    siteName = "JSMonkey",
  } = params;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
          type: ogImageType,
        },
      ],
      siteName,
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}
