"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center px-[16px] relative transition-colors",
        active
          ? "flex-col pb-[27.325px] pt-[24px] text-foreground"
          : "py-[24px] text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <span className="font-normal leading-[normal] relative shrink-0 text-[18px] text-center whitespace-nowrap">
        {children}
      </span>
      {active ? (
        <div
          className="h-[3.325px] mb-[-3.325px] relative shrink-0 w-full"
          aria-hidden
        >
          <div className="absolute inset-[-30.08%_-2.17%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src="/line-decor.svg"
            />
          </div>
        </div>
      ) : null}
    </Link>
  );
}
