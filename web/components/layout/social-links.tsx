import { SocialIcon } from "@/components/icons/social-icons";
import {
  normalizeSocialHref,
  socialOpensInNewTab,
  socialPlatformLabel,
} from "@/lib/social";

import type { SiteSettings } from "@/types/sanity";
import { cn } from "@/lib/utils";

export function SocialLinks({
  socials,
  className,
}: {
  socials: SiteSettings["socials"];
  className?: string;
}) {
  if (!socials?.length) return null;
  return (
    <div className={cn("flex items-center gap-[8px]", className)}>
      {socials.map((s) => {
        const href = normalizeSocialHref(s.platform, s.url);
        const newTab = socialOpensInNewTab(s.platform);
        return (
          <a
            key={`${s.platform}-${s.url}`}
            href={href}
            className="inline-flex items-center justify-center text-[var(--foreground)] transition-colors hover:text-[#2C6E96]"
            aria-label={socialPlatformLabel(s.platform)}
            {...(newTab
              ? { target: "_blank" as const, rel: "noreferrer noopener" as const }
              : {})}
          >
            <SocialIcon platform={s.platform} />
          </a>
        );
      })}
    </div>
  );
}
