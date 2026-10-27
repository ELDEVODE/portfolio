"use client";

import { useCallback, useRef } from "react";

import { contact, headline } from "@/data";

/**
 * The name, set as a fresco. Two layers of lettering sit on top of
 * each other: the sinopia — the red-chalk underdrawing a fresco starts
 * from — and the finished ink over it. The finished layer is masked by a
 * circle at the cursor, so moving across the name scrubs the fresco away
 * and exposes the drawing underneath.
 *
 * The mask needs coordinates relative to the lettering, which the global
 * --candle-x / --candle-y (viewport pixels) cannot give it, so the block
 * tracks the pointer itself — only while the pointer is over it, and only
 * through one rAF-coalesced handler writing two custom properties.
 */
export function FrescoHero() {
  const plate = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  const paint = useCallback(() => {
    frame.current = 0;
    const node = plate.current;
    if (!node) return;
    node.style.setProperty("--wipe-x", `${point.current.x}px`);
    node.style.setProperty("--wipe-y", `${point.current.y}px`);
  }, []);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = plate.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      point.current = {
        x: event.clientX - box.left,
        y: event.clientY - box.top,
      };
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    },
    [paint],
  );

  const onLeave = useCallback(() => {
    const node = plate.current;
    if (!node) return;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    node.style.removeProperty("--wipe-x");
    node.style.removeProperty("--wipe-y");
  }, []);

  return (
    <div className="relative">
      <p
        className="rise relative font-display text-[10px] tracking-[0.42em] text-gold"
        style={{ animationDelay: "40ms" }}
      >
        ELDEVODE
      </p>

      {/* The fresco. Both layers carry the same type so they register. */}
      <div
        ref={plate}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="fresco rise relative mt-4"
        style={{ animationDelay: "140ms" }}
      >
        <h1 className="relative font-serif text-[3.1rem] font-medium italic leading-[0.9] sm:text-6xl">
          {/* the underdrawing, in red chalk */}
          <span
            aria-hidden="true"
            className="fresco-chalk pointer-events-none absolute inset-0"
          >
            El-Praise
            <br />
            Ayo
          </span>
          {/* the finished ink, wiped away under the cursor */}
          <span className="fresco-ink relative block text-ink">
            El-Praise
            <br />
            Ayo
          </span>
        </h1>
      </div>

      {/* A double rule under the lockup instead of a flourish beside it:
          at this size an ornament reads as a stray mark, a rule reads as
          typography. */}
      <div
        className="rise mt-5 space-y-[3px]"
        style={{ animationDelay: "240ms" }}
        aria-hidden="true"
      >
        <div className="h-px w-full bg-gold/45" />
        <div className="h-px w-full bg-gold/25" />
      </div>

      <p
        className="rise mt-4 font-serif text-xl italic text-ink-soft"
        style={{ animationDelay: "300ms" }}
      >
        {headline}
      </p>

      <p
        className="rise mt-1.5 font-display text-[11px] tracking-[0.18em] text-meta"
        style={{ animationDelay: "380ms" }}
      >
        {contact.location.toUpperCase()}
      </p>
    </div>
  );
}
