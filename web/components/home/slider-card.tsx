import { memo } from "react";
import Link from "next/link";

import { SanityImage } from "@/components/ui/sanity-image";
import { getAspectRatio } from "@/lib/sanity-helpers";

import type { WorkListItem } from "@/types/sanity";

/**
 * Size presets cycle every 5 items to match the Figma layout:
 * large portrait → small landscape → wide landscape → medium portrait → large landscape
 */
const SIZE_PRESETS: { w: number; maxH: number }[] = [
  { w: 307, maxH: 489 },
  { w: 252, maxH: 279 },
  { w: 280, maxH: 358 },
  { w: 363, maxH: 496 },
  { w: 256, maxH: 358 },
];

export function sizeForIndex(index: number) {
  return SIZE_PRESETS[index % SIZE_PRESETS.length];
}

interface SliderCardProps {
  slide: WorkListItem;
  index: number;
  priority?: boolean;
}

export const SliderCard = memo(function SliderCard({
  slide,
  index,
  priority = false,
}: SliderCardProps) {
  const slug = slide.slug?.current;
  if (!slug) return null;

  const ar = getAspectRatio(slide.mainImage);
  const caption = slide.summary ?? slide.title;
  const sz = sizeForIndex(index);

  return (
    <Link href={`/works/${slug}`} className="block flex-shrink-0">
      <div className="flex flex-col">
        <div
          className="mx-auto max-w-full overflow-hidden"
          style={{ width: sz.w, maxHeight: sz.maxH }}
        >
          <div className="overflow-hidden bg-card shadow-sm">
            <SanityImage
              image={slide.mainImage}
              alt={slide.title}
              width={520}
              lqip={slide.lqip}
              priority={priority}
              className="w-full"
              aspectRatio={ar}
              imgClassName="h-full w-full object-contain"
            />
          </div>
        </div>
        <p
          className="mt-3 max-w-full text-left text-[14px] font-normal leading-[1.2] text-muted-foreground"
          style={{ width: sz.w }}
        >
          {caption}
        </p>
      </div>
    </Link>
  );
});
