"use client";

import { useEffect, useState } from "react";

/**
 * The single pointer listener for the whole site. It writes the cursor
 * position to the root as --candle-x / --candle-y; the glow layer here and
 * the fresco wipe in FrescoHero both read those two variables, so no other
 * component needs a listener of its own.
 *
 * On a coarse pointer or with reduced motion we attach nothing and leave the
 * light where the stylesheet parked it — high on the page, as if from a
 * window.
 */
export function Candlelight() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    setLive(true);

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--candle-x", `${x}px`);
      root.style.setProperty("--candle-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--candle-x");
      root.style.removeProperty("--candle-y");
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="candlelight"
      data-live={live ? "true" : "false"}
    />
  );
}
