import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-muted-foreground text-sm">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        The page you are looking for does not exist or was removed.
      </p>
      <Link href="/" className={cn(buttonVariants({ className: "mt-8" }))}>
        Back home
      </Link>
    </div>
  );
}
