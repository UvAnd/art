import Link from "next/link";

import { SoldBadge } from "@/components/works/sold-badge";
import { SanityImage } from "@/components/ui/sanity-image";

import type { WorkListItem } from "@/types/sanity";

export function WorkCard({ work }: { work: WorkListItem }) {
  const slug = work.slug?.current;
  if (!slug) return null;

  const cat = work.categories?.[0]?.title;

  return (
    <Link href={`/works/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg border bg-card transition-shadow group-hover:shadow-md">
        {work.status === "sold" ? (
          <div className="absolute right-3 top-3 z-[2]">
            <SoldBadge />
          </div>
        ) : null}
        <SanityImage
          image={work.mainImage}
          alt={work.title}
          width={700}
          lqip={work.lqip}
          className="aspect-[3/4]"
          imgClassName="transition-transform group-hover:scale-[1.02]"
        />
        <div className="p-3">
          <p className="font-medium leading-snug">{work.title}</p>
          {cat ? (
            <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wide">
              {cat}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
