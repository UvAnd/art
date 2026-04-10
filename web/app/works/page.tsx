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
  const [works, categories] = await Promise.all([
    getAllWorks(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-6 text-center sm:px-6 sm:pt-16 sm:pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Works
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="bg-[#f4f6f7] py-16 text-center">
            <p className="text-muted-foreground text-sm">Loading…</p>
          </div>
        }
      >
        <WorksCatalog works={works} categories={categories} />
      </Suspense>
    </div>
  );
}
