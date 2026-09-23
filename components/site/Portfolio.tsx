"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  contact,
  education,
  navItems,
  profile,
} from "@/data";

import { ExperienceList } from "./ExperienceList";
import { NameLockup } from "./NameLockup";
import { ease, Reveal } from "./motion";
import { Fleuron } from "./Ornament";
import { SelectedWork } from "./SelectedWork";
import { Sidebar } from "./Sidebar";
import { SkillGroups } from "./SkillGroups";

const sectionIds = navItems.map((item) => item.link.slice(1));

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const line = 140;
      let current = ids[0];

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= line) current = id;
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);

  return active;
}

function SectionHeading({ index, title, id }: { index: string; title: string; id: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="mb-8 flex items-center gap-4">
      <motion.span
        className="font-display text-[11px] tracking-[0.28em] text-gold"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        {index}
      </motion.span>
      <motion.h2
        id={id}
        className="font-serif text-4xl italic leading-none text-ink"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {title}
      </motion.h2>
      <motion.span
        className="h-px flex-1 origin-left bg-gold/40"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      />
      <motion.span
        className="hidden sm:block"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Fleuron />
      </motion.span>
    </div>
  );
}

export default function Portfolio() {
  const active = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-paper p-3 text-ink sm:p-5">
      <div className="border border-gold/45 p-[3px]">
      <div className="border border-gold/30">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-16">
          <Sidebar active={active} />

          <main id="main-content" className="pb-20 lg:py-16">
            <div className="pb-10 pt-10 lg:hidden">
              <NameLockup />
            </div>

            <section
              id="about"
              aria-labelledby="about-heading"
              className="scroll-mt-24 lg:pt-1"
            >
              <h2 id="about-heading" className="sr-only">
                Profile
              </h2>
              <Reveal>
              <p className="max-w-[40rem] font-serif text-[1.2rem] leading-[1.65] text-ink-soft first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.25rem] first-letter:font-medium first-letter:leading-[0.75] first-letter:text-gold">
                {profile}
              </p>
              </Reveal>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm lg:hidden">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-ink underline decoration-rule underline-offset-4"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${contact.phone}`} className="text-meta">
                    {contact.phoneDisplay}
                  </a>
                </li>
                {contact.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-meta"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="experience"
              aria-labelledby="experience-heading"
              className="scroll-mt-24 mt-16 border-t-[3px] border-double border-gold/55 pt-12"
            >
              <SectionHeading index="I" title="Experience" id="experience-heading" />
              <ExperienceList />
            </section>

            <section
              id="work"
              aria-labelledby="work-heading"
              className="scroll-mt-24 mt-8 border-t-[3px] border-double border-gold/55 pt-12"
            >
              <SectionHeading index="II" title="Selected work" id="work-heading" />
              <SelectedWork />
            </section>

            <section
              id="skills"
              aria-labelledby="skills-heading"
              className="scroll-mt-24 mt-16 border-t-[3px] border-double border-gold/55 pt-12"
            >
              <SectionHeading index="III" title="Skills" id="skills-heading" />
              <SkillGroups />
            </section>

            <section
              id="education"
              aria-labelledby="education-heading"
              className="scroll-mt-24 mt-16 border-t-[3px] border-double border-gold/55 pt-12"
            >
              <SectionHeading index="IV" title="Education" id="education-heading" />
              <Reveal>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-[15px] font-medium text-ink">
                    {education.degree}
                  </h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{education.school}</p>
                </div>
                <p className="text-[13px] text-meta">
                  {education.dates}
                  <span className="mx-2 text-rule">/</span>
                  {education.location}
                </p>
              </div>
              </Reveal>
            </section>

            <Reveal>
            <footer
              id="contact"
              className="mt-16 flex flex-col gap-3 border-t-[3px] border-double border-gold/55 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-meta">
                © {new Date().getFullYear()} El-Praise Ayo
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-ink-soft underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                >
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-meta transition-colors hover:text-ink"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
            </footer>
            </Reveal>
          </main>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
