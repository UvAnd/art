"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Tailwind `lg` and up — treat as desktop for click effects, etc. */
export function useIsDesktopLg() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
