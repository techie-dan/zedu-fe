import type { Metadata } from "next";
import React from "react";
import { ogImageUrl, siteUrl } from "~/lib/env-urls";

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Explore guides, insights, and tools for universities, schools, and bootcamps. Help educators run better learning communities with Zedu.",
  keywords: [
    "Zedu resources",
    "education guides",
    "learning tools",
    "bootcamp resources",
    "school communication",
  ],
  openGraph: {
    title: "Resources & Blog | Zedu",
    description:
      "Explore guides, insights, and tools for universities, schools, and bootcamps. Help educators run better learning communities with Zedu.",
    url: siteUrl("/resources"),
    siteName: "Zedu",
    images: [
      {
        url: ogImageUrl("og-image-5.png"),
        width: 1200,
        height: 630,
        alt: "Zedu resources and blog for educators",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources & Blog | Zedu",
    description:
      "Explore guides, insights, and tools for universities, schools, and bootcamps. Help educators run better learning communities with Zedu.",
    images: [ogImageUrl("og-image-5.png")],
  },
  alternates: {
    canonical: siteUrl("/resources"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResourcesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
