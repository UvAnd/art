import type { Metadata } from "next";

import { PortraitSection } from "@/components/about/portrait-section";

import { getAboutPage, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "About",
    description: s.defaultSeo?.description ?? "About the artist.",
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
