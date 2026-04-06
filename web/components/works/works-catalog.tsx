"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FilterChips } from "@/components/ui/filter-chips";
import { WorkCard } from "@/components/works/work-card";

import type { Category, WorkListItem } from "@/types/sanity";

const PAGE_SIZE = 12;

export function WorksCatalog({
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

  const filtered = useMemo(() => {
    if (!categorySlug) return works;
    return works.filter((w) =>
      (w.categories ?? []).some((c) => c.slug?.current === categorySlug),
    );
  }, [works, categorySlug]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [categorySlug, works]);

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

  return (
    <div className="space-y-10">
      <FilterChips
        items={[
          { key: "all", label: "All" },
          ...categories.map((c) => ({ key: c.slug?.current ?? "", label: c.title })).filter((c) => c.key),
        ]}
        activeKey={categorySlug ?? "all"}
        onSelect={(key) => setCategory(key === "all" ? null : key)}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((w) => (
          <WorkCard key={w._id} work={w} />
        ))}
      </div>

      {visible < filtered.length ? (
        <div ref={sentinelRef} className="h-8 w-full" aria-hidden />
      ) : null}

      {!filtered.length ? (
        <p className="text-muted-foreground text-center text-sm">
          No works in this category yet.
        </p>
      ) : null}
    </div>
  );
}
