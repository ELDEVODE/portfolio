"use client";

import { useEffect, useState } from "react";

import { contact } from "@/data";

import { Fleuron } from "./Ornament";

const CRUMBS = [
  { cx: 30, cy: 54, x: "-14px", y: "16px" },
  { cx: 44, cy: 70, x: "-8px", y: "22px" },
  { cx: 76, cy: 72, x: "10px", y: "20px" },
  { cx: 88, cy: 50, x: "17px", y: "13px" },
  { cx: 60, cy: 78, x: "2px", y: "24px" },
];

/**
 * The seal on the letter. Closed, it is a lump of wax with a monogram
 * struck into it; broken, the two halves rotate apart, crumbs scatter,
 * and the contact details unfold beneath on the same grid-rows trick the
 * experience bullets use.
 *
 * With reduced motion the seal starts already broken and the panel open,
 * so nobody has to earn an address.
 */
export function WaxSeal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="seal-panel"
        onClick={() => setOpen((value) => !value)}
        className="group relative outline-none"
      >
        <span className="sr-only">
          {open ? "Close the contact details" : "Break the seal to read the contact details"}
        </span>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
          className={`h-28 w-28 overflow-visible transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04] ${
            open ? "seal-open" : ""
          }`}
        >

          {/* left half */}
          <g className="seal-half-left">
            <path
              d="M60 12c-8 0-14 3-21 5-9 2-13 9-14 18-1 8-5 13-4 21s6 12 10 19c4 6 4 14 11 18 6 3 12 1 18 1V12Z"
              fill="var(--sinopia)"
            />
            <path
              d="M60 12c-8 0-14 3-21 5-9 2-13 9-14 18-1 8-5 13-4 21s6 12 10 19c4 6 4 14 11 18 6 3 12 1 18 1"
              stroke="#3d1512"
              strokeWidth="0.8"
              opacity="0.5"
            />
          </g>

          {/* right half */}
          <g className="seal-half-right">
            <path
              d="M60 12c8 0 15 2 22 5 8 3 11 10 12 18 1 9 6 13 5 22-1 8-7 11-11 18-4 6-3 14-10 17-6 3-12 1-18 1V12Z"
              fill="var(--sinopia)"
            />
            <path
              d="M60 12c8 0 15 2 22 5 8 3 11 10 12 18 1 9 6 13 5 22-1 8-7 11-11 18-4 6-3 14-10 17-6 3-12 1-18 1"
              stroke="#3d1512"
              strokeWidth="0.8"
              opacity="0.5"
            />
          </g>

          {/* the strike: the die has pressed a rim and a monogram into the
              wax, so both sit below the surface and read as shadow */}
          <circle cx="60" cy="60" r="33" stroke="#3d1512" strokeWidth="1.6" opacity="0.5" />
          <circle cx="60" cy="60" r="33" stroke="#9c4b43" strokeWidth="0.6" opacity="0.5" />
          <circle cx="60" cy="60" r="29" stroke="#3d1512" strokeWidth="1" opacity="0.4" />

          {/* the light catching the raised lip of the wax */}
          <path
            d="M34 40c6-8 16-13 26-13"
            stroke="#c4675c"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.45"
            fill="none"
          />

          <text
            x="60"
            y="61"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#451814"
            className="font-display"
            style={{ fontSize: 27, fontWeight: 600, letterSpacing: "0.04em" }}
          >
            EA
          </text>
          <text
            x="60"
            y="60.2"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#a85448"
            opacity="0.55"
            className="font-display"
            style={{ fontSize: 27, fontWeight: 600, letterSpacing: "0.04em" }}
          >
            EA
          </text>

          {CRUMBS.map((crumb) => (
            <circle
              key={`${crumb.cx}-${crumb.cy}`}
              className="seal-crumb"
              cx={crumb.cx}
              cy={crumb.cy}
              r="1.8"
              fill="var(--sinopia)"
              opacity="0"
              style={
                {
                  "--crumb-x": crumb.x,
                  "--crumb-y": crumb.y,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
      </button>

      <p className="mt-3 font-display text-[10px] tracking-[0.26em] text-meta">
        {open ? "SEALED BY HAND" : "BREAK THE SEAL"}
      </p>

      <div
        id="seal-panel"
        className={`grid w-full transition-[grid-template-rows,opacity] duration-700 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-8">
            <Fleuron className="mx-auto text-gold/60" />

            <div className="mt-6 flex flex-col items-center gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="font-serif text-2xl italic text-ink underline decoration-gold/40 underline-offset-[6px] transition-colors hover:text-gold hover:decoration-gold"
                tabIndex={open ? 0 : -1}
              >
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="text-[15px] text-ink-soft transition-colors hover:text-gold"
                tabIndex={open ? 0 : -1}
              >
                {contact.phoneDisplay}
              </a>
              <p className="font-display text-[10px] tracking-[0.22em] text-meta">
                {contact.location.toUpperCase()}
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {contact.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[11px] tracking-[0.18em] text-meta transition-colors hover:text-gold"
                    tabIndex={open ? 0 : -1}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/El-Praise-Ayo-CV.pdf"
                  download
                  className="group inline-flex items-center gap-2 border border-gold/45 px-4 py-2 font-display text-[11px] tracking-[0.18em] text-ink transition-colors hover:border-gold hover:bg-wash"
                  tabIndex={open ? 0 : -1}
                >
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    aria-hidden="true"
                    className="text-gold"
                  >
                    <path
                      d="M6.5 1v9m0 0L3 6.6M6.5 10 10 6.6M1 13h11"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                  CURRICULUM VITÆ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
