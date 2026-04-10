"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

import { useMarquee } from "@/hooks/use-marquee";

import { SliderCard } from "./slider-card";

import type { WorkListItem } from "@/types/sanity";

const MAX_SLIDES = 8;
const SCROLL_SPEED = 100;

function EmptyState() {
  return (
    <section className="bg-muted/40 py-20 text-center text-sm text-muted-foreground">
      Add hero slides in Sanity (Site settings → Hero slides).
    </section>
  );
}

function SlideSet({
  items,
  priority,
}: {
  items: WorkListItem[];
  priority: boolean;
}) {
  return (
    <>
      {items.map((slide, i) => (
        <SliderCard
          key={slide._id}
          slide={slide}
          index={i}
          priority={priority && i === 0}
        />
      ))}
    </>
  );
}

export function HeroSlider({ slides }: { slides: WorkListItem[] }) {
  const items = useMemo(
    () => slides.slice(0, MAX_SLIDES).filter((s) => Boolean(s.slug?.current)),
    [slides],
  );

  const prefersReduced = useReducedMotion();

  const { measureRef, trackRef, containerRef } = useMarquee({
    speed: SCROLL_SPEED,
    pauseOnHover: true,
    reduceMotion: prefersReduced ?? undefined,
  });

  if (!items.length) return <EmptyState />;

  const sectionStyle = {
    "--hero-height": "calc(100dvh - 100px)",
    "--hero-track-height": "calc(100dvh - 260px)",
  } as CSSProperties;

  return (
    <section
      className="relative w-full min-h-[calc(100dvh-100px)]"
      style={sectionStyle}
    >
      <div className="flex min-h-[var(--hero-height)] w-full flex-col pt-8">
        {/* Overflow clip container + hover target — full viewport width */}
        <div
          ref={containerRef}
          className="relative w-full flex-1 overflow-hidden grid"
          style={{ contain: "layout style" }}
        >
          {/* Translating track — compositor-only layer */}
          <div
            ref={trackRef}
            className="flex h-full flex-row items-end"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {/* First set: measured to know one full loop width */}
            <div
              ref={measureRef}
              className="flex h-full flex-row items-end gap-6 pr-6"
            >
              <SlideSet items={items} priority />
            </div>

            {/* Clone for seamless wrap */}
            <div className="flex h-full flex-row items-end gap-6 pr-6">
              <SlideSet items={items} priority={false} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center pb-8 pt-4">
          <a
            href="#gallery"
            className="flex items-center gap-2 text-[18px] font-normal text-[var(--primary,#3483b1)]"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("gallery");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span>Scroll</span>
            <span
              aria-hidden
              className="inline-block  text-[var(--primary,#3483b1)] motion-safe:animate-bounce motion-reduce:animate-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="17"
                viewBox="0 0 12 17"
                fill="none"
              >
                <path
                  d="M4.99262 16.5303C5.28551 16.8232 5.76039 16.8232 6.05328 16.5303L10.8263 11.7574C11.1191 11.4645 11.1191 10.9896 10.8263 10.6967C10.5334 10.4038 10.0585 10.4038 9.76559 10.6967L5.52295 14.9393L1.28031 10.6967C0.987415 10.4038 0.512542 10.4038 0.219648 10.6967C-0.073245 10.9896 -0.073245 11.4645 0.219648 11.7574L4.99262 16.5303ZM5.52295 0L4.77295 0L4.77295 16H5.52295H6.27295L6.27295 0L5.52295 0Z"
                  fill="#3483B1"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
