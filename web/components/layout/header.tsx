import Link from "next/link";

import { NavLink } from "@/components/layout/nav-link";
import { SocialLinks } from "@/components/layout/social-links";
import { SanityImage } from "@/components/ui/sanity-image";

import type { SiteSettings } from "@/types/sanity";

export function Header({ settings }: { settings: SiteSettings }) {
  const title = settings.siteTitle ?? "Portfolio";
  const shop = settings.externalShopUrl;

  return (
    <header className="bg-background h-[100px]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 sm:px-[40px]">
        <Link href="/" className="relative shrink-0 size-[70px]">
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

        <nav className="hidden md:flex items-center" aria-label="Main">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {shop ? (
            <a
              href={shop}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center px-[16px] py-[24px] transition-colors text-muted-foreground hover:text-foreground"
            >
              <span className="font-normal leading-[normal] relative shrink-0 text-[18px] text-center whitespace-nowrap">
                Shop
              </span>
            </a>
          ) : null}
        </nav>

        <SocialLinks socials={settings.socials} />
      </div>

      <nav
        className="flex md:hidden items-center justify-center gap-3"
        aria-label="Mobile"
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        {shop ? (
          <a
            href={shop}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center px-[16px] py-[24px] transition-colors text-muted-foreground hover:text-foreground"
          >
            <span className="font-normal leading-[normal] relative shrink-0 text-[18px] text-center whitespace-nowrap">
              Shop
            </span>
          </a>
        ) : null}
      </nav>
    </header>
  );
}
