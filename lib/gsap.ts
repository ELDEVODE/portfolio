"use client";

import { useEffect, useRef } from "react";
import type gsapType from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type GsapKit = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
};

/** Setup may return a cleanup; gsap.context runs it on revert. */
type Setup = (kit: GsapKit) => void | (() => void);

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs a GSAP setup inside a context scoped to the returned ref, so every
 * tween and ScrollTrigger it creates is reverted together on unmount.
 *
 * GSAP is imported dynamically rather than at the top of the module: it is
 * ~50 kB and nothing on the critical path needs it, so it must not land in
 * the first-load bundle. The choreography simply starts a tick after
 * hydration, which is invisible.
 *
 * Under reduced motion nothing is imported at all — the page falls back to
 * the IntersectionObserver reveals in components/site/motion.tsx.
 */
export function useGsapContext(setup: Setup, deps: unknown[] = []) {
  const scope = useRef<HTMLElement | null>(null);
  const saved = useRef(setup);
  saved.current = setup;

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [core, trigger] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = core.default ?? core.gsap;
      const { ScrollTrigger } = trigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(
        () => saved.current({ gsap, ScrollTrigger }),
        scope.current ?? undefined,
      );
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
