import { SanityImage } from "@/components/ui/sanity-image";

import type { WorkDetail } from "@/types/sanity";

export function WorkImageSection({ work }: { work: WorkDetail }) {
  return (
    <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12 xl:px-24 xl:py-10 flex items-center justify-center h-full">
      <SanityImage
        image={work.mainImage}
        alt={work.title}
        width={1200}
        lqip={work.mainLqip ?? work.lqip}
        priority
        className="w-full max-w-full bg-muted"
        lqipClassName="object-contain scale-100"
        imgClassName="mx-auto object-contain max-h-[50vh] lg:max-h-[70vh]"
      />
    </div>
  );
}
