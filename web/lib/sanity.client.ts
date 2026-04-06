import { createClient, type SanityClient } from "@sanity/client";

import { isSanityConfigured } from "@/lib/env";

const apiVersion = "2024-01-01";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!isSanityConfigured()) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in web/.env.local.",
    );
  }
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion,
      useCdn: true,
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN,
    });
  }
  return client;
}
