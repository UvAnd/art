import type { MetadataRoute } from "next";

import { getAllWorkSlugs } from "@/lib/cms";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = ["", "/works", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
    }),
  );

  const slugs = await getAllWorkSlugs();
  const workRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/works/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes];
}
