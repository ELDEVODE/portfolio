"use client";

import { contact, navItems } from "@/data";

import { NameLockup } from "./NameLockup";

type SidebarProps = {
  active: string;
};

export function Sidebar({ active }: SidebarProps) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-gold/30 bg-paper/90 backdrop-blur-md lg:hidden">
        <nav
          aria-label="Sections"
          className="flex items-center justify-between px-4 py-3 font-display"
        >
          {navItems.map((item) => {
            const id = item.link.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.link}
                href={item.link}
                aria-current={isActive ? "true" : undefined}
                className={`text-[10px] tracking-[0.12em] transition-colors duration-300 ${isActive ? "text-ink" : "text-meta"}`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </header>

      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:py-16">
        <a href="#about" className="block">
          <NameLockup />
        </a>

        <nav aria-label="Sections" className="mt-14">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const id = item.link.slice(1);
              const isActive = active === id;
              return (
                <li key={item.link}>
                  <a
                    href={item.link}
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
                        isActive
                          ? "text-ink"
                          : "text-meta group-hover:text-ink"
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

        <div className="mt-auto space-y-2 text-sm">
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
          <ul className="flex gap-4 pt-2">
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
        </div>
      </aside>
    </>
  );
}
