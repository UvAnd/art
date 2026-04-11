import { ogImageUrl } from "@/lib/sanity.image";
import { absoluteUrl } from "@/lib/seo/site-url";

import type { SiteSettings } from "@/types/sanity";

/** Static OG/Twitter fallback when Sanity logo is missing. */
const STATIC_OG_FALLBACK = "/favicon/android-chrome-512x512.png";

/** Prefer Sanity logo (1200×630 fit); otherwise large PWA icon. */
export function getDefaultShareImageUrl(settings: SiteSettings): string {
  const fromLogo = ogImageUrl(settings.logo);
  if (fromLogo) return fromLogo;
  return absoluteUrl(STATIC_OG_FALLBACK);
}
