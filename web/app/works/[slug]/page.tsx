import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkDetailLayout } from "@/components/work/work-detail-layout";
import { WorkJsonLd } from "@/components/seo/work-json-ld";

import { getAllWorkSlugs, getSiteSettings, getWorkBySlug } from "@/lib/cms";
import { imageUrl } from "@/lib/sanity.image";

/** Next.js static export requires at least one param when the dynamic segment exists. */
export const BUILD_EMPTY_SLUG = "__empty__";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  if (slugs.length === 0) {
    return [{ slug: BUILD_EMPTY_SLUG }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  if (slug === BUILD_EMPTY_SLUG) {
    return { title: "Works", robots: { index: false, follow: false } };
  }
  const [work, settings] = await Promise.all([getWorkBySlug(slug), getSiteSettings()]);
  if (!work) {
    return { title: "Work" };
  }
  const site = settings.siteTitle ?? "Artist portfolio";
  const title = `${work.title} · ${site}`;
  const description = work.summary ?? settings.defaultSeo?.description ?? undefined;
  const og = imageUrl(work.mainImage, 1200, 85);
  return {
    title: work.title,
    description,
    openGraph: {
      title,
      description,
      images: og ? [{ url: og }] : undefined,
    },
  };
}

export default async function WorkPage(props: Props) {
  const { slug } = await props.params;

  if (slug === BUILD_EMPTY_SLUG) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-semibold">No works in the dataset yet</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Connect Sanity (see <code className="rounded bg-muted px-1">web/.env.local.example</code>),
          publish at least one work, then rebuild. This placeholder page is omitted once slugs exist.
        </p>
      </div>
    );
  }

  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

  return (
    <>
      {siteUrl ? (
        <WorkJsonLd
          work={work}
          siteUrl={siteUrl}
          canonicalPath={`/works/${slug}`}
        />
      ) : null}
      <WorkDetailLayout work={work} />
    </>
  );
}
