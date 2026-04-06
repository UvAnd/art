import Link from "next/link";

import { PortableTextBlock } from "@/components/ui/portable-text-block";
import { SanityImage } from "@/components/ui/sanity-image";

import type { AboutPage } from "@/types/sanity";

export function PortraitSection({ page }: { page: AboutPage }) {
  return (
    <div className="mx-auto grid w-full gap-10 pb-16 lg:flex lg:gap-12 lg:items-start">
      <div className="bg-muted/30 overflow-hidden  lg:max-w-[900px] lg:flex-1 lg:min-w-0">
        <SanityImage
          image={page.portrait}
          alt="Artist portrait"
          width={900}
          className="aspect-[3/3.5]"
        />
      </div>
      <div className="lg:flex-1 lg:min-w-0">
        <div className="mt-20 pr-6 lg:pr-10">
          <PortableTextBlock value={page.bio} variant="reach" />
        </div>
        {page.cvLink ? (
          <p className="mt-8">
            <Link
              href={page.cvLink}
              className="text-primary text-sm font-medium underline underline-offset-4"
              target="_blank"
              rel="noreferrer noopener"
            >
              Download CV
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
