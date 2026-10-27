"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * The snuffer. A lit taper in day, a smoking wick in night. It is the
 * theme switch, and it is the only control on the page that is a drawing
 * rather than a word.
 */
export function CandleToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const night = mounted && theme === "night";
  const label = night ? "Light the candle" : "Snuff the candle";

  return (
    <button
      type="button"
      aria-pressed={night}
      aria-label={label}
      title={label}
      onClick={() => setTheme(night ? "day" : "night")}
      className="group flex items-center gap-2.5 text-left text-[10px] uppercase tracking-[0.22em] text-meta transition-colors hover:text-gold"
    >
      <svg
        width="18"
        height="30"
        viewBox="0 0 18 30"
        fill="none"
        aria-hidden="true"
        className="shrink-0 overflow-visible"
      >
        {/* taper */}
        <path
          d="M5.5 12.5h7v13.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5V12.5Z"
          fill="var(--wash)"
          stroke="var(--gold)"
          strokeWidth="0.7"
        />
        {/* drip down the side, because a candle that has burned has run */}
        <path
          d="M6 15c-.9 2.2-.6 4.4.3 6.2"
          stroke="var(--rule)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* wick */}
        <path
          d="M9 12.5v-2"
          stroke="var(--ink)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* holder */}
        <path
          d="M3.5 27.5h11l-1.5 2h-8l-1.5-2Z"
          fill="var(--wash)"
          stroke="var(--gold)"
          strokeWidth="0.7"
        />

        {mounted && !night ? (
          <g className="flame">
            <ellipse cx="9" cy="6.2" rx="3.2" ry="5" fill="var(--gold)" opacity="0.28" />
            <path
              d="M9 1.4c2.1 2.3 3 4.2 3 5.9a3 3 0 0 1-6 0c0-1.7.9-3.6 3-5.9Z"
              fill="var(--gold-leaf-2)"
            />
            <path
              d="M9 4.6c1 1.2 1.4 2.2 1.4 3.1a1.4 1.4 0 0 1-2.8 0c0-.9.4-1.9 1.4-3.1Z"
              fill="#fff6dd"
            />
          </g>
        ) : null}

        {mounted && night ? (
          <path
            className="smoke"
            d="M9 10c-2 -1.6 1.9 -3.1 0 -4.7c-1.9 -1.6 1.6 -2.7 .2 -4.1"
            stroke="var(--meta)"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
        ) : null}
      </svg>
      <span className="hidden lg:inline">{night ? "Relight" : "Snuff"}</span>
    </button>
  );
}
