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
  { w: 360, maxH: 560 },
  { w: 340, maxH: 500 },
  { w: 440, maxH: 440 },
  { w: 280, maxH: 620 },
  { w: 420, maxH: 590 },
  { w: 300, maxH: 500 },
  { w: 360, maxH: 400 },
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
  const widthRatio = (sz.w / 496).toFixed(4);
  const heightRatio = (sz.maxH / 496).toFixed(4);

  return (
    <Link href={`/works/${slug}`} className="block h-full flex-shrink-0 ">
      <div className="flex h-full flex-col justify-center">
        <div
          className="mx-auto max-w-full overflow-hidden"
          style={{
            width: `min(${sz.w}px, calc(var(--hero-track-height) ))`,
            maxHeight: `min(${sz.maxH}px, calc(var(--hero-track-height) ))`,
          }}
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
