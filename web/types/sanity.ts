export type WorkStatus = "available" | "sold";

export type SocialPlatform = "instagram" | "email" | "pinterest" | "behance" | "linkedin";

export interface SanityImageSource {
  _type?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number; aspectRatio?: number };
    };
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  order?: number;
}

export interface WorkListItem {
  _id: string;
  title: string;
  slug: { current: string };
  status: WorkStatus;
  featured?: boolean | null;
  mainImage?: SanityImageSource | null;
  lqip?: string | null;
  categories?: Category[] | null;
}

export interface WorkDetail extends WorkListItem {
  description?: unknown[] | null;
  price?: string | null;
  externalUrl?: string | null;
  publishedAt?: string | null;
  mainLqip?: string | null;
  parameters?: Array<{ key?: string; value?: string }> | null;
}

export interface SiteSettings {
  siteTitle?: string | null;
  logo?: SanityImageSource | null;
  externalShopUrl?: string | null;
  footerText?: string | null;
  defaultSeo?: { title?: string | null; description?: string | null } | null;
  socials?: Array<{ platform: SocialPlatform; url: string }> | null;
  heroSlides?: WorkListItem[] | null;
}

export interface AboutPage {
  portrait?: SanityImageSource | null;
  bio?: unknown[] | null;
}

export interface ContactPage {
  headline?: string | null;
  illustration?: SanityImageSource | null;
  sideText?: string | null;
}
