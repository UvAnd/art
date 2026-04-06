import imageUrlBuilder from "@sanity/image-url";

import { getSanityClient } from "@/lib/sanity.client";
import { isSanityConfigured } from "@/lib/env";

import type { SanityImageSource } from "@/types/sanity";

export function urlFor(source: SanityImageSource) {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured");
  }
  return imageUrlBuilder(getSanityClient()).image(source);
}

export function imageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  quality = 80,
): string | undefined {
  if (!source || !isSanityConfigured()) return undefined;
  try {
    return urlFor(source).width(width).quality(quality).auto("format").url();
  } catch {
    return undefined;
  }
}
