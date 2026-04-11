import type { Metadata } from "next";

import { PortraitSection } from "@/components/about/portrait-section";

import { getAboutPage, getSiteSettings } from "@/lib/cms";
import { getDefaultShareImageUrl } from "@/lib/seo/share-image";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const title = "About";
  const description = s.defaultSeo?.description ?? "About the artist.";
  const siteUrl = getSiteUrl();
  const image = getDefaultShareImageUrl(s);
  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/about`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AboutPage() {
  const page = await getAboutPage();

  if (!page?.bio) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-muted-foreground mt-4 text-sm">
          Add the About page in Sanity (singleton) to show content here.
        </p>
      </div>
    );
  }

  return <PortraitSection page={page} />;
}
