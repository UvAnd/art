import { FALLBACK_SITE_SETTINGS } from "@/lib/defaults";
import { fetchSanity } from "@/lib/sanity.fetch";
import {
  aboutPageQuery,
  allCategoriesQuery,
  allWorkSlugsQuery,
  allWorksQuery,
  contactPageQuery,
  siteSettingsQuery,
  workBySlugQuery,
} from "@/lib/sanity.queries";
import type {
  AboutPage,
  Category,
  ContactPage,
  SiteSettings,
  WorkDetail,
  WorkListItem,
} from "@/types/sanity";

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchSanity<SiteSettings>(siteSettingsQuery);
  return { ...FALLBACK_SITE_SETTINGS, ...data };
}

export async function getAllWorks(): Promise<WorkListItem[]> {
  const data = await fetchSanity<WorkListItem[]>(allWorksQuery);
  return data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchSanity<Category[]>(allCategoriesQuery);
  return data ?? [];
}

export async function getWorkBySlug(slug: string): Promise<WorkDetail | null> {
  return fetchSanity<WorkDetail>(workBySlugQuery, { slug });
}

export async function getAllWorkSlugs(): Promise<string[]> {
  const rows = await fetchSanity<Array<{ slug: string }>>(allWorkSlugsQuery);
  return rows?.map((r) => r.slug).filter(Boolean) ?? [];
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return fetchSanity<AboutPage>(aboutPageQuery);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return fetchSanity<ContactPage>(contactPageQuery);
}
