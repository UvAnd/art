import type { Metadata } from "next";
import { Suspense } from "react";

import { WorksCatalog } from "@/components/works/works-catalog";

import { getAllWorks, getCategories, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const site = s.siteTitle ?? "Artist portfolio";
  return {
    title: "Works",
    description: `Browse works — ${site}.`,
  };
}

export default async function WorksPage() {
  const [works, categories, settings] = await Promise.all([
    getAllWorks(),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Works</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm leading-relaxed">
          {settings.defaultSeo?.description ??
            "Explore the catalog. Filter by category — more loads as you scroll."}
        </p>
      </div>

      <Suspense fallback={<p className="text-muted-foreground text-center text-sm">Loading…</p>}>
        <WorksCatalog works={works} categories={categories} />
      </Suspense>
    </div>
  );
}
