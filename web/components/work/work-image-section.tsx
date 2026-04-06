import { SanityImage } from "@/components/ui/sanity-image";

import type { WorkDetail } from "@/types/sanity";

export function WorkImageSection({ work }: { work: WorkDetail }) {
  // const gallery = work.gallery ?? [];

  return (
    <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12 xl:px-24 xl:py-10 flex items-center justify-center h-full">
      <SanityImage
        image={work.mainImage}
        alt={work.title}
        width={1200}
        lqip={work.mainLqip ?? work.lqip}
        priority
        className="w-full max-w-full "
        imgClassName="mx-auto object-contain max-h-[70vh] "
      />

      {/* {gallery.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {gallery.map((img, i) => (
            <SanityImage
              key={i}
              image={img as SanityImageSource}
              alt={`${work.title} — ${i + 2}`}
              width={900}
              lqip={img?.lqip}
              className="overflow-hidden rounded-lg bg-background/40 aspect-[4/5]"
            />
          ))}
        </div>
      ) : null} */}
    </div>
  );
}
