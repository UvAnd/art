import type { SiteSettings } from "@/types/sanity";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const text =
    settings.footerText?.trim() || `© Copyright ${year}. All rights reserved.`;

  return (
    <footer className="border-border/60 mt-auto border-t py-10">
      <div className="text-muted-foreground mx-auto max-w-6xl px-4 text-center text-sm sm:px-6">
        {text}
      </div>
    </footer>
  );
}
