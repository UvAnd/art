"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  /** When false, renders children only (no canvas / click effect). */
  enabled?: boolean;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

/** Canvas above page chrome (header z-40) but under typical overlays (z-50+). */
const CANVAS_Z = "z-[45]";

const shellClass =
  "relative isolate flex min-h-full w-full flex-1 flex-col";

const contentClass =
  "relative z-0 flex min-h-0 w-full flex-1 flex-col";

function ClickSparkPassThrough({ children }: { children?: React.ReactNode }) {
  return (
    <div className={shellClass}>
      <div className={contentClass}>{children}</div>
    </div>
  );
}

function ClickSparkActive({
  sparkColor = "#3483b1",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: Omit<ClickSparkProps, "enabled">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const addSparksAtClientPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
  };

  /** Capture phase runs before target handlers; canvas z-index makes sparks visible above links (pointer-events-none). */
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>): void => {
    addSparksAtClientPoint(e.clientX, e.clientY);
  };

  return (
    <div className={shellClass} onClickCapture={handleClickCapture}>
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 ${CANVAS_Z}`}
        aria-hidden
      />
      <div className={contentClass}>{children}</div>
    </div>
  );
}

export default function ClickSpark({
  enabled = true,
  ...props
}: ClickSparkProps) {
  if (!enabled) {
    return <ClickSparkPassThrough>{props.children}</ClickSparkPassThrough>;
  }
  return <ClickSparkActive {...props} />;
}
