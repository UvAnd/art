"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

import { FilterChips } from "@/components/ui/filter-chips";
import { SanityImage } from "@/components/ui/sanity-image";

import { getAspectRatio } from "@/lib/sanity-helpers";

import type { Category, WorkListItem } from "@/types/sanity";

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
        <motion.div
          layout
          className="columns-1 gap-6 sm:columns-2 lg:columns-3"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.slice(0, 12).map((work) => {
              const ar = getAspectRatio(work.mainImage);
              return (
                <motion.div
                  key={work._id}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="mb-6 break-inside-avoid"
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
                          {work.summary ?? work.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
