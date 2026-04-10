import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryPreview } from "@/components/home/gallery-preview";
import { HeroSlider } from "@/components/home/hero-slider";

import { getAllWorks, getCategories, getSiteSettings } from "@/lib/cms";

import type { WorkListItem } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const title = s.defaultSeo?.title ?? s.siteTitle ?? "Artist portfolio";
  const description =
    s.defaultSeo?.description ?? "Contemporary art and illustration.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function HomePage() {
  const [settings, works, categories] = await Promise.all([
    getSiteSettings(),
    getAllWorks(),
    getCategories(),
  ]);

  const slides: WorkListItem[] = (settings.heroSlides ?? []).filter(
    (w) => w.slug?.current,
  ) as WorkListItem[];

  return (
    <div className="flex flex-col">
      <HeroSlider slides={slides.length ? slides : works.slice(0, 8)} />
      <Suspense fallback={<div className="py-10" />}>
        <GalleryPreview works={works} categories={categories} />
      </Suspense>
    </div>
  );
}
