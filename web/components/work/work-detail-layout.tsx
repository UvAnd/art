import Link from "next/link";

import { ParameterList } from "@/components/work/parameter-list";
import { WorkImageSection } from "@/components/work/work-image-section";
import { SoldBadge } from "@/components/works/sold-badge";
import { PortableTextBlock } from "@/components/ui/portable-text-block";
import { buttonVariants } from "@/components/ui/button-variants";

import { cn } from "@/lib/utils";

import type { WorkDetail } from "@/types/sanity";

export function WorkDetailLayout({ work }: { work: WorkDetail }) {
  const available = work.status === "available";
  const showBuy = Boolean(available && work.externalUrl);

  const ctaClasses =
    "inline-flex h-auto min-h-0 items-center justify-center rounded-full px-6 pt-2 pb-1.5 text-lg font-bold leading-normal";

  return (
    <div className="grid w-full lg:grid-cols-12 lg:gap-0 min-h-[calc(100dvh_-_200px)]">
      <div className="bg-muted  lg:col-span-7">
        <WorkImageSection work={work} />
      </div>

      <div className="bg-background flex flex-col gap-[15px] px-6 py-14 sm:px-10 lg:col-span-5 lg:py-20 lg:pl-10 lg:pr-12 xl:pr-16">
        <h1 className="text-[32px] font-normal leading-[1.2] text-foreground">
          {work.title}
        </h1>

        {work.status === "sold" ? (
          <div>
            <SoldBadge className="text-sm" />
          </div>
        ) : null}

        <div className="[&_.prose_p]:text-base [&_.prose_p]:leading-[1.2] [&_.prose_p]:text-muted-foreground">
          <PortableTextBlock value={work.description} />
        </div>

        <div className="flex flex-col gap-[15px] pt-2 justify-start items-start">
          <ParameterList parameters={work.parameters} />

          {available && work.price ? (
            <div>
              <p className="text-muted-foreground text-xs leading-[1.2]">
                Price:
              </p>
              <p className="text-foreground mt-0 text-[18px] leading-normal">
                {work.price}
              </p>
            </div>
          ) : null}

          {showBuy && work.externalUrl ? (
            <a
              href={work.externalUrl}
              className={cn(buttonVariants({ variant: "default" }), ctaClasses)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Buy now
            </a>
          ) : null}

          {!showBuy && work.status === "available" ? (
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), ctaClasses)}
            >
              Inquire
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
