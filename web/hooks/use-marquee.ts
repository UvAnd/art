"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseMarqueeOptions {
  speed?: number;
  /** Pause on hover. The element should be the scroll container ancestor. */
  pauseOnHover?: boolean;
  /** Respect prefers-reduced-motion. */
  reduceMotion?: boolean;
}

interface UseMarqueeReturn {
  /** Attach to the element whose scrollWidth equals one full set. */
  measureRef: (el: HTMLDivElement | null) => void;
  /** Attach to the translating track wrapper. */
  trackRef: (el: HTMLDivElement | null) => void;
  /** Attach to the hover container (parent that clips overflow). */
  containerRef: (el: HTMLDivElement | null) => void;
}

/**
 * Drives an infinite horizontal marquee via requestAnimationFrame.
 *
 * - Uses raw `transform: translate3d()` for compositor-only updates (no layout / paint).
 * - Avoids React state for hover & offset so the RAF loop never triggers re-renders.
 * - Wraps offset once it exceeds one full set width for a seamless loop.
 */
export function useMarquee({
  speed = 60,
  pauseOnHover = true,
  reduceMotion = false,
}: UseMarqueeOptions = {}): UseMarqueeReturn {
  const trackElRef = useRef<HTMLDivElement | null>(null);
  const measureElRef = useRef<HTMLDivElement | null>(null);
  const setWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const rafRef = useRef(0);

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    measureElRef.current = el;
  }, []);

  const trackRef = useCallback((el: HTMLDivElement | null) => {
    trackElRef.current = el;
  }, []);

  const containerElRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useCallback((el: HTMLDivElement | null) => {
    containerElRef.current = el;
  }, []);

  useEffect(() => {
    const el = containerElRef.current;
    if (!el || !pauseOnHover) return;

    const enter = () => { hoveredRef.current = true; };
    const leave = () => { hoveredRef.current = false; };

    el.addEventListener("mouseenter", enter, { passive: true });
    el.addEventListener("mouseleave", leave, { passive: true });
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    const el = measureElRef.current;
    if (!el) return;

    const measure = () => {
      setWidthRef.current = el.scrollWidth;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const step = (ts: number) => {
      const w = setWidthRef.current;
      if (!w) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!hoveredRef.current) {
        offsetRef.current -= (speed * dt) / 1000;
        if (offsetRef.current <= -w) {
          offsetRef.current += w;
        }
      }

      if (trackElRef.current) {
        trackElRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, speed]);

  return { measureRef, trackRef, containerRef };
}
