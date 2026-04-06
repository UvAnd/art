import { getSanityClient } from "@/lib/sanity.client";
import { isSanityConfigured } from "@/lib/env";

export async function fetchSanity<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const data = await getSanityClient().fetch<T>(query, params ?? {});
    return data;
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return null;
  }
}
