"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FilterChips } from "@/components/ui/filter-chips";
import { SanityImage } from "@/components/ui/sanity-image";

import { getAspectRatio } from "@/lib/sanity-helpers";

import type { Category, WorkListItem } from "@/types/sanity";

const PAGE_SIZE = 12;

type InnerProps = {
  works: WorkListItem[];
  categories: Category[];
  categorySlug: string | null;
};

function WorksCatalogBody({ works, categories, categorySlug }: InnerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routable = useMemo(() => works.filter((w) => w.slug?.current), [works]);

  const filtered = useMemo(() => {
    if (!categorySlug) return routable;
    return routable.filter((w) =>
      (w.categories ?? []).some((c) => c.slug?.current === categorySlug),
    );
  }, [routable, categorySlug]);

  const [visible, setVisible] = useState(PAGE_SIZE);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [filtered.length]);

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

  const slice = filtered.slice(0, visible);

  if (!routable.length) {
    return (
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm sm:px-6">
          <p className="text-muted-foreground">
            Publish works in Sanity to show the catalog.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20">
      <div className="content-stretch left-1/2 flex items-center justify-center py-6 sm:py-7">
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
            {slice.map((work) => {
              const slug = work.slug!.current;
              const ar = getAspectRatio(work.mainImage);
              return (
                <motion.div
                  key={work._id}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="mb-6 break-inside-avoid"
                >
                  <Link href={`/works/${slug}`} className="group block">
                    <div className="overflow-hidden">
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
          </AnimatePresence>
        </motion.div>

        {visible < filtered.length ? (
          <div ref={sentinelRef} className="h-8 w-full" aria-hidden />
        ) : null}

        {!filtered.length ? (
          <p className="text-muted-foreground pt-6 text-center text-sm">
            No works in this category yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function WorksCatalog({
  works,
  categories,
}: {
  works: WorkListItem[];
  categories: Category[];
}) {
  const categorySlug = useSearchParams().get("category");
  return (
    <WorksCatalogBody
      key={categorySlug ?? "all"}
      works={works}
      categories={categories}
      categorySlug={categorySlug}
    />
  );
}
