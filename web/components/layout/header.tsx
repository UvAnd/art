import Link from "next/link";

import { HeaderMobileNav } from "@/components/layout/header-mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { SocialLinks } from "@/components/layout/social-links";
import { SanityImage } from "@/components/ui/sanity-image";

import type { SiteSettings } from "@/types/sanity";

export function Header({ settings }: { settings: SiteSettings }) {
  const title = settings.siteTitle ?? "Portfolio";
  const shop = settings.externalShopUrl;

  return (
    <header className="sticky top-0 z-40 h-[100px] border-b border-border/40 bg-background/90 md:bg-background/75 md:backdrop-blur-md md:backdrop-saturate-150 md:supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 sm:px-[40px]">
        <Link href="/" className="relative size-[70px] shrink-0">
          {settings.logo ? (
            <SanityImage
              image={settings.logo}
              alt={title}
              width={140}
              className="pointer-events-none size-[70px]"
              imgClassName="object-contain"
              priority
            />
          ) : (
            <span className="sr-only">{title}</span>
          )}
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Main">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {shop ? (
            <a
              href={shop}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-foreground flex items-center justify-center px-[16px] py-[24px] transition-colors"
            >
              <span className="relative shrink-0 text-center text-[18px] leading-[normal] font-normal whitespace-nowrap">
                Shop
              </span>
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks
            socials={settings.socials}
            className="hidden md:flex"
          />
          <HeaderMobileNav shopUrl={shop} socials={settings.socials} />
        </div>
      </div>
    </header>
  );
}
