"use client";

import { useEffect, useState } from "react";

import { contact, headline } from "@/data";

import { Fleuron } from "./Ornament";

const SEEN_KEY = "folio-opened";

/**
 * The folio arrives closed. A title board sits over the page, stamped like
 * a binding, and turns away on its spine to reveal the workshop behind it.
 *
 * It is a CSS 3D transform and nothing else — no WebGL, no library — so it
 * cannot delay or break the page. It is skipped entirely on a repeat visit
 * in the same tab and under reduced motion, and the content underneath is
 * fully rendered the whole time: the board is an overlay, never a gate.
 */
export function Opening() {
  // `null` = undecided (first paint, server and client agree on "nothing"),
  // "closed"/"turning"/"gone" once the client has decided.
  const [phase, setPhase] = useState<"idle" | "closed" | "turning" | "gone">(
    "idle",
  );

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // private mode or blocked storage — treat as a first visit
    }

    if (calm || seen) {
      setPhase("gone");
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to do */
    }

    // Lock the page while the board is up, so a scroll does not run the
    // content behind it.
    document.body.style.overflow = "hidden";
    setPhase("closed");

    const open = () => setPhase("turning");
    const auto = window.setTimeout(open, 1100);

    window.addEventListener("wheel", open, { once: true, passive: true });
    window.addEventListener("touchstart", open, { once: true, passive: true });
    window.addEventListener("keydown", open, { once: true });

    return () => {
      window.clearTimeout(auto);
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchstart", open);
      window.removeEventListener("keydown", open);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "turning") return;
    const done = window.setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("gone");
    }, 1250);
    return () => window.clearTimeout(done);
  }, [phase]);

  if (phase === "idle" || phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100]"
      style={{ perspective: "2200px", perspectiveOrigin: "0% 50%" }}
    >
      <div
        className={`board absolute inset-0 origin-left bg-paper ${
          phase === "turning" ? "board-turning" : ""
        }`}
      >
        {/* the binding edge */}
        <span className="absolute inset-y-0 left-0 w-[3px] bg-gold/50" />
        <span className="absolute inset-y-0 left-[7px] w-px bg-gold/25" />

        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <Fleuron className="text-gold/60" />
          <p className="font-display text-[11px] tracking-[0.42em] text-gold">
            ELDEVODE
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-medium italic leading-[0.95] text-ink">
            El-Praise
            <br />
            Ayo
          </h1>
          <p className="font-serif text-lg italic text-ink-soft">{headline}</p>
          <p className="font-display text-[10px] tracking-[0.3em] text-meta">
            {contact.location.toUpperCase()}
          </p>
          <Fleuron className="text-gold/60" />
          <p className="mt-6 font-display text-[9px] tracking-[0.3em] text-meta/70">
            SCROLL TO OPEN
          </p>
        </div>
      </div>
    </div>
  );
}
