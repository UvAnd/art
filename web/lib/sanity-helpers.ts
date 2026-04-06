import type { SanityImageSource } from "@/types/sanity";

export function getAspectRatio(
  image: { asset?: SanityImageSource["asset"] } | null | undefined,
): number | undefined {
  const ar = image?.asset?.metadata?.dimensions?.aspectRatio;
  if (typeof ar === "number" && Number.isFinite(ar) && ar > 0) return ar;
  return undefined;
}
