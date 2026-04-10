import { imageUrl } from "@/lib/sanity.image";

import type { WorkDetail } from "@/types/sanity";

export function WorkJsonLd({
  work,
  siteUrl,
  canonicalPath,
}: {
  work: WorkDetail;
  siteUrl: string;
  canonicalPath: string;
}) {
  const img = imageUrl(work.mainImage, 1200, 85);
  const offers =
    work.status === "available" && work.price
      ? {
          "@type": "Offer",
          price: work.price.replace(/[^\d.]/g, ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: work.title,
    image: img ? [img] : undefined,
    url: `${siteUrl}${canonicalPath}`,
  };

  if (offers) {
    data.offers = offers;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
