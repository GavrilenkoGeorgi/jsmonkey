import { Metadata } from "next";

export interface MetadataParams {
  title: string;
  description: string;
  canonicalPath: string;
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
    metadataBase: new URL(canonicalPath),
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
