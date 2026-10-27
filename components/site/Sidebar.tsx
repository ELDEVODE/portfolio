"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { contact, navItems } from "@/data";

import { CandleToggle } from "./CandleToggle";
import { PressGears } from "./PressGears";
import { FrescoHero } from "./FrescoHero";

type SidebarProps = {
  active: string;
};

type Blot = { id: number; x: number; y: number };

/** The splatter a nib leaves when it is set down too hard. */
function InkBlot({ x, y }: { x: number; y: number }) {
  return (
    <span className="blot" style={{ left: x, top: y }} aria-hidden="true">
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
        <path
          d="M27 5c7 0 9 6 14 9s8 7 7 13-7 8-10 13-5 9-11 9-9-5-14-8-10-5-11-11 5-9 8-14 10-11 17-11Z"
          fill="var(--ink)"
          opacity="0.75"
        />
        <circle cx="12" cy="14" r="2.4" fill="var(--ink)" opacity="0.6" />
        <circle cx="44" cy="18" r="1.8" fill="var(--ink)" opacity="0.5" />
        <circle cx="38" cy="46" r="2.1" fill="var(--ink)" opacity="0.55" />
      </svg>
    </span>
  );
}

export function Sidebar({ active }: SidebarProps) {
  const [blots, setBlots] = useState<Blot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const drop = useCallback((event: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = Date.now();
    setBlots([{ id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(
      () => setBlots((current) => current.filter((blot) => blot.id !== id)),
      700,
    );
  }, []);

  return (
    <>
      {/* Blots go to the body so no transformed or clipped ancestor can
          become their containing block and shift them off the cursor. */}
      {mounted
        ? createPortal(
            blots.map((blot) => (
              <InkBlot key={blot.id} x={blot.x} y={blot.y} />
            )),
            document.body,
          )
        : null}

      <header className="sticky top-0 z-30 border-b border-gold/30 bg-paper/90 backdrop-blur-md lg:hidden">
        <nav
          aria-label="Sections"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-3 font-display"
        >
          {navItems.map((item) => {
            const id = item.link.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.link}
                href={item.link}
                onClick={drop}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap text-[10px] tracking-[0.1em] transition-colors duration-300 ${isActive ? "text-ink" : "text-meta"}`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </header>

      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto lg:py-14 no-scrollbar">
        <a href="#about" className="block">
          <FrescoHero />
        </a>

        <nav aria-label="Sections" className="mt-12 shrink-0">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const id = item.link.slice(1);
              const isActive = active === id;
              return (
                <li key={item.link}>
                  <a
                    href={item.link}
                    onClick={drop}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center gap-3 py-1.5"
                  >
                    <span
                      className={`h-px transition-all duration-500 ease-out ${
                        isActive
                          ? "w-8 bg-gold"
                          : "w-4 bg-rule group-hover:w-8 group-hover:bg-ink"
                      }`}
                    />
                    <span
                      className={`font-display text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-meta group-hover:text-ink"
                      }`}
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* The press, idling in the margin between the nav and the
            contacts, spun by how fast the reader is moving. */}
        <div className="mt-10 hidden xl:block">
          <PressGears />
        </div>

        <div className="mt-auto shrink-0 space-y-3 pt-10 text-sm">
          <a
            href="/El-Praise-Ayo-CV.pdf"
            download
            className="group inline-flex items-center gap-2 border border-gold/45 px-3 py-2 font-display text-[10px] tracking-[0.18em] text-ink transition-colors hover:border-gold hover:bg-wash"
          >
            <svg
              width="12"
              height="14"
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
            DOWNLOAD CV
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="block text-ink-soft underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
          >
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="block text-meta transition-colors hover:text-ink"
          >
            {contact.phoneDisplay}
          </a>
          <div className="flex items-center justify-between gap-4 pt-1">
            <ul className="flex gap-4">
              {contact.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[11px] tracking-[0.16em] text-meta transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <CandleToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
