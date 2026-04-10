"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Masonry from "react-masonry-css";

import Link from "next/link";

import { FilterChips } from "@/components/ui/filter-chips";
import { SanityImage } from "@/components/ui/sanity-image";

import { getAspectRatio } from "@/lib/sanity-helpers";

import type { Category, WorkListItem } from "@/types/sanity";

const PAGE_SIZE = 9;

const masonryBreakpointCols = {
  default: 3,
  1023: 2,
  639: 1,
};

function GalleryPreviewMasonry({ items }: { items: WorkListItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = loadMoreRef.current;
    if (!el) return;

    let nextAllowedMs = 0;
    const maxLen = items.length;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        const now =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now < nextAllowedMs) return;
        nextAllowedMs = now + 450;
        setVisibleCount((c) => Math.min(c + PAGE_SIZE, maxLen));
      },
      { root: null, rootMargin: "160px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, items.length]);

  const enterDuration = prefersReducedMotion ? 0 : 0.52;

  return (
    <>
      <Masonry
        breakpointCols={masonryBreakpointCols}
        className="flex w-auto -ml-6"
        columnClassName="min-w-0 bg-clip-padding pl-6"
      >
        {visibleItems.map((work, index) => {
          const ar = getAspectRatio(work.mainImage);
          const staggerInBatch = prefersReducedMotion
            ? 0
            : (index % PAGE_SIZE) * 0.075;
          return (
            <motion.div
              key={work._id}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{
                once: true,
                amount: 0.12,
                margin: "0px 0px -10% 0px",
              }}
              transition={{
                duration: enterDuration,
                delay: staggerInBatch,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 min-w-0"
            >
              <Link
                href={`/works/${work.slug!.current}`}
                className="group block"
              >
                <div className="overflow-hidden ">
                  <SanityImage
                    image={work.mainImage}
                    alt={work.title}
                    width={700}
                    lqip={work.lqip}
                    className="w-full"
                    aspectRatio={ar}
                    imgClassName="transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="pt-2">
                    <p className="text-left text-[14px] font-normal leading-[1.2] text-muted-foreground">
                      {work.title}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </Masonry>

      {hasMore ? (
        <div
          ref={loadMoreRef}
          className="pointer-events-none h-px w-full shrink-0"
          aria-hidden
        />
      ) : null}
    </>
  );
}

export function GalleryPreview({
  works,
  categories,
}: {
  works: WorkListItem[];
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  const setCategory = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) params.set("category", slug);
      else params.delete("category");
      const q = params.toString();
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const items = useMemo(() => {
    const base = works.filter((w) => w.slug?.current);
    if (!categorySlug) return base;
    return base.filter((w) =>
      (w.categories ?? []).some((c) => c.slug?.current === categorySlug),
    );
  }, [works, categorySlug]);

  const filterKey = categorySlug ?? "all";

  if (!items.length) {
    return (
      <section id="gallery" className="scroll-mt-24 py-16 text-center text-sm">
        <p className="text-muted-foreground">
          Publish works in Sanity to show the gallery preview.
        </p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-[#f4f6f7] py-12 sm:py-16 lg:py-20"
    >
      <div className="content-stretch flex justify-center items-center left-1/2 py-6 sm:py-7">
        <FilterChips
          className="px-4"
          items={[
            { key: "all", label: "All" },
            ...categories
              .map((c) => ({ key: c.slug?.current ?? "", label: c.title }))
              .filter((c) => c.key),
          ]}
          activeKey={categorySlug ?? "all"}
          onSelect={(key) => setCategory(key === "all" ? null : key)}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GalleryPreviewMasonry key={filterKey} items={items} />
      </div>
    </section>
  );
}
