"use client";

import { cn } from "@/lib/utils";

export type FilterChipItem = {
  key: string;
  label: string;
};

export function FilterChips({
  items,
  activeKey,
  onSelect,
  className,
}: {
  items: FilterChipItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={cn(
              "cursor-pointer rounded-[12px] text-[16px] leading-[20px] transition-colors",
              active
                ? "bg-white px-3 pb-1 pt-1.5 font-medium text-[var(--primary,#3483b1)]"
                : "px-3 py-1 font-normal text-[var(--muted-foreground,#6B7C85)] hover:text-[var(--foreground,#1F2A30)]",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

