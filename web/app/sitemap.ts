import type { MetadataRoute } from "next";

import { getWorkSitemapEntries } from "@/lib/cms";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/works", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: now,
    }),
  );

  const entries = await getWorkSitemapEntries();
  const workRoutes: MetadataRoute.Sitemap = entries.map(({ slug, publishedAt }) => ({
    url: `${base}/works/${slug}`,
    lastModified: publishedAt ? new Date(publishedAt) : now,
  }));

  return [...staticRoutes, ...workRoutes];
}
