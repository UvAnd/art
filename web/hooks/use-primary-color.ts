"use client";

import { useSyncExternalStore } from "react";

const FALLBACK = "#3483b1";

function subscribe(onStoreChange: () => void) {
  const root = document.documentElement;
  const obs = new MutationObserver(onStoreChange);
  obs.observe(root, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

function readPrimary(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  return raw || FALLBACK;
}

function getServerSnapshot() {
  return FALLBACK;
}

/** Resolved `--primary` for canvas / non-CSS APIs; updates when `html` class changes (e.g. dark mode). */
export function usePrimaryColor() {
  return useSyncExternalStore(subscribe, readPrimary, getServerSnapshot);
}
