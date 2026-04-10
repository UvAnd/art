import type { SocialPlatform } from "@/types/sanity";

function stripMailtoPrefix(raw: string): string {
  let s = raw.trim();
  while (/^mailto:/i.test(s)) {
    s = s.slice(7).trim();
  }
  return s.trim();
}

export function normalizeSocialHref(platform: SocialPlatform | string, raw: string): string {
  const url = (raw ?? "").trim();
  if (!url) return "#";
  if (platform === "email") {
    const addr = stripMailtoPrefix(url);
    if (!addr) return "#";
    return `mailto:${addr}`;
  }
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export function socialOpensInNewTab(platform: SocialPlatform | string): boolean {
  return platform !== "email";
}

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  email: "Email",
  pinterest: "Pinterest",
  behance: "Behance",
  linkedin: "LinkedIn",
};

export function socialPlatformLabel(platform: SocialPlatform | string): string {
  return LABELS[platform] ?? "Social link";
}
