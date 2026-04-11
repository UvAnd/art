"use client";

import ClickSpark from "@/components/ui/click-spark";
import { useIsDesktopLg } from "@/hooks/use-is-desktop";
import { usePrimaryColor } from "@/hooks/use-primary-color";

export function ClickSparkShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktopLg();
  const sparkColor = usePrimaryColor();

  return (
    <ClickSpark
      enabled={isDesktop}
      sparkColor={sparkColor}
      sparkSize={8}
      sparkRadius={25}
      sparkCount={8}
      duration={600}
      extraScale={1}
    >
      {children}
    </ClickSpark>
  );
}
