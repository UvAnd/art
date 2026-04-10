"use client";

import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { imageUrl } from "@/lib/sanity.image";
import { isSanityConfigured } from "@/lib/env";

import type { SanityImageSource } from "@/types/sanity";

type SanityImageProps = {
  image: SanityImageSource | null | undefined;
  alt: string;
  width: number;
  quality?: number;
  className?: string;
  imgClassName?: string;
  lqip?: string | null;
  priority?: boolean;
  sizes?: string;
  /** Use Sanity metadata aspect ratio (or a custom one) for layouts like masonry. */
  aspectRatio?: number;
  /** Extra classes for the blurred LQIP placeholder layer (only when `lqip` is set). */
  lqipClassName?: string;
};

export function SanityImage({
  image,
  alt,
  width,
  quality = 80,
  className,
  imgClassName,
  lqip,
  priority,
  sizes,
  aspectRatio,
  lqipClassName,
}: SanityImageProps) {
  const [mainReady, setMainReady] = useState(false);

  const onMainHandled = useCallback(() => {
    setMainReady(true);
  }, []);

  const src =
    isSanityConfigured() && image ? imageUrl(image, width, quality) : undefined;
  const dims = image?.asset?.metadata?.dimensions;
  const height = dims?.width
    ? Math.round((width * (dims.height ?? 1)) / (dims.width || 1))
    : width;

  if (!src) {
    return (
      <div
        className={cn("bg-muted", className)}
        style={{ aspectRatio: aspectRatio ?? dims?.aspectRatio ?? 1 }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: aspectRatio ?? dims?.aspectRatio ?? undefined }}
    >
      {lqip ? (
        <img
          src={lqip}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl transition-opacity duration-300 ease-out motion-reduce:transition-none",
            mainReady && "pointer-events-none opacity-0",
            lqipClassName,
          )}
        />
      ) : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "relative z-[1] h-full w-full object-cover",
          imgClassName,
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        onLoad={onMainHandled}
        onError={onMainHandled}
      />
    </div>
  );
}
