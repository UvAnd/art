"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { SocialLinks } from "@/components/layout/social-links";
import { cn } from "@/lib/utils";

import type { SiteSettings } from "@/types/sanity";

function MobileMenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
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
        "block border-b border-border py-5 text-[20px] font-normal leading-[1.2] transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function HeaderMobileNav({
  shopUrl,
  socials,
}: {
  shopUrl?: string | null;
  socials?: SiteSettings["socials"];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-7" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex min-h-0 flex-col bg-background/85 text-foreground backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/70"
        >
          <div className="z-10 flex h-[100px] shrink-0 items-center justify-end sm:px-[40px]">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setOpen(false)}
            >
              <X className="size-7" aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 sm:px-10"
            aria-label="Main"
          >
            <div
              onClick={() => setOpen(false)}
              className="flex flex-col text-center "
            >
              <MobileMenuLink href="/">Home</MobileMenuLink>
              <MobileMenuLink href="/about">About</MobileMenuLink>
              <MobileMenuLink href="/contact">Contact</MobileMenuLink>
              {shopUrl ? (
                <a
                  href={shopUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block border-b border-border py-5 text-[20px] font-normal leading-[1.2] text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Shop
                </a>
              ) : null}
            </div>
          </nav>

          {socials?.length ? (
            <div className="shrink-0 border-t border-border px-6 py-10 sm:px-10">
              <SocialLinks socials={socials} className="justify-center gap-6" />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
