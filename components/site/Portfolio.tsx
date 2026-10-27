"use client";

import { useEffect, useState } from "react";

import { contact, education, navItems, profile } from "@/data";

import { useGsapContext } from "@/lib/gsap";

import { Candlelight } from "./Candlelight";
import { ExperienceList } from "./ExperienceList";
import { FrescoHero } from "./FrescoHero";
import {
  CornerAcanthus,
  Fleuron,
  FolioNumber,
  InitialFrame,
  RuleWithLozenge,
  roman,
} from "./Ornament";
import { Opening } from "./Opening";
import { Reveal } from "./motion";
import { SelectedWork } from "./SelectedWork";
import { Sidebar } from "./Sidebar";
import { SkillGroups } from "./SkillGroups";
import { WaxSeal } from "./WaxSeal";

const sectionIds = navItems.map((item) => item.link.slice(1));

/** The running head each section carries, as a folio would. */
const RUNNING_HEAD: Record<string, string> = {
  about: "PROŒMIUM",
  experience: "EXPERIENTIA",
  work: "OPERA SELECTA",
  skills: "ARTES",
  education: "STUDIA",
  contact: "EPISTOLA",
};

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

function SectionHeading({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id: string;
}) {
  return (
    <Reveal className="group mb-8 flex items-center gap-4">
      <span className="gold-leaf font-display text-[13px] font-semibold tracking-[0.28em]">
        {index}
      </span>
      <h2 id={id} className="font-serif text-4xl italic leading-none text-ink">
        {title}
      </h2>
      <span className="draw rule-scroll h-px flex-1 bg-gold/40" />
      <span className="hidden sm:block">
        <Fleuron />
      </span>
    </Reveal>
  );
}

/** A section's chrome: the running head above, the folio number below. */
function RunningHead({ id, folio }: { id: string; folio: number }) {
  return (
    <div
      aria-hidden="true"
      className="mb-6 flex items-baseline justify-between font-display text-[9px] tracking-[0.3em] text-meta/80"
    >
      <span>AYO</span>
      <span>{RUNNING_HEAD[id]}</span>
      <span className="text-gold/70">FOL. {roman(folio)}</span>
    </div>
  );
}

/**
 * The leaf-turn: as each section comes up, its double rule draws itself
 * across and the sheet settles the last few pixels into place. Scrubbed
 * against the scroll, so it tracks the reader rather than firing once.
 */
function useLeafTurns() {
  return useGsapContext(({ gsap, ScrollTrigger }) => {
    const sections = gsap.utils.toArray<HTMLElement>("main > section");

    sections.forEach((section, i) => {
      if (i === 0) return;

      gsap.fromTo(
        section,
        { borderTopColor: "rgb(var(--gold-rgb) / 0)" },
        {
          borderTopColor: "rgb(var(--gold-rgb) / 0.55)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "top 55%",
            scrub: true,
          },
        },
      );

      gsap.from(section, {
        y: 26,
        opacity: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 58%",
          scrub: 0.6,
        },
      });
    });

    ScrollTrigger.refresh();
  });
}

const SECTION_SHELL =
  "scroll-mt-24 mt-14 border-t-[3px] border-double border-gold/55 pt-10";

export default function Portfolio() {
  const active = useActiveSection(sectionIds);
  const scope = useLeafTurns();

  return (
    <div
      ref={scope as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen bg-paper p-3 text-ink sm:p-5"
    >
      <Opening />
      <Candlelight />

      {/* The sheet: a double-ruled frame with acanthus turned into each
          corner. (No clip-path here — a percentage-based deckle on a page
          this tall cuts notches tens of pixels deep and eats the sticky
          header's text.) */}
      <div className="relative border border-gold/30 bg-paper p-[3px]">
        <div className="relative border border-gold/45">
          <span className="pointer-events-none absolute -left-px -top-px hidden sm:block">
            <CornerAcanthus />
          </span>
          <span className="pointer-events-none absolute -right-px -top-px hidden rotate-90 sm:block">
            <CornerAcanthus />
          </span>
          <span className="pointer-events-none absolute -bottom-px -right-px hidden rotate-180 sm:block">
            <CornerAcanthus />
          </span>
          <span className="pointer-events-none absolute -bottom-px -left-px hidden -rotate-90 sm:block">
            <CornerAcanthus />
          </span>

          <div className="mx-auto max-w-[1080px] px-5 sm:px-10">
            <div className="lg:grid lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-16">
              <Sidebar active={active} />

              <main id="main-content" className="quill pb-16 lg:py-16">
                <div className="pb-10 pt-10 lg:hidden">
                  <FrescoHero />
                </div>

                <section
                  id="about"
                  aria-labelledby="about-heading"
                  className="scroll-mt-24 lg:pt-1"
                >
                  <h2 id="about-heading" className="sr-only">
                    Profile
                  </h2>
                  <RunningHead id="about" folio={1} />

                  <Reveal>
                    <div className="max-w-[40rem]">
                      {/* The illuminated initial, framed and gilded. */}
                      <div className="float-left mr-5 mt-1 h-[4.5rem] w-[4.5rem]">
                        <span className="relative block h-full w-full">
                          <InitialFrame />
                          <span className="gold-leaf absolute inset-0 flex items-center justify-center font-serif text-[2.9rem] font-semibold leading-none">
                            {profile.lede.charAt(0)}
                          </span>
                        </span>
                      </div>
                      <p className="font-serif text-[1.2rem] leading-[1.65] text-ink-soft">
                        {profile.lede.slice(1)}
                      </p>
                      {profile.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-4 font-serif text-[1.08rem] leading-[1.7] text-ink-soft"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Reveal>

                  <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm lg:hidden">
                    <li>
                      <a
                        href="/El-Praise-Ayo-CV.pdf"
                        download
                        className="inline-flex items-center gap-2 border border-gold/45 px-3 py-2 font-display text-[10px] tracking-[0.18em] text-ink"
                      >
                        DOWNLOAD CV
                      </a>
                    </li>
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
                  </ul>

                  <FolioNumber value={roman(1)} />
                </section>

                <section
                  id="experience"
                  aria-labelledby="experience-heading"
                  className={SECTION_SHELL}
                >
                  <RunningHead id="experience" folio={2} />
                  <SectionHeading
                    index="I"
                    title="Experience"
                    id="experience-heading"
                  />
                  <ExperienceList />
                  <FolioNumber value={roman(2)} />
                </section>

                <section
                  id="work"
                  aria-labelledby="work-heading"
                  className={SECTION_SHELL}
                >
                  <RunningHead id="work" folio={3} />
                  <SectionHeading
                    index="II"
                    title="Selected work"
                    id="work-heading"
                  />
                  <SelectedWork />
                  <FolioNumber value={roman(3)} />
                </section>

                <section
                  id="skills"
                  aria-labelledby="skills-heading"
                  className={SECTION_SHELL}
                >
                  <RunningHead id="skills" folio={4} />
                  <SectionHeading index="III" title="Skills" id="skills-heading" />
                  <SkillGroups />
                  <FolioNumber value={roman(4)} />
                </section>

                <section
                  id="education"
                  aria-labelledby="education-heading"
                  className={SECTION_SHELL}
                >
                  <RunningHead id="education" folio={5} />
                  <SectionHeading
                    index="IV"
                    title="Education"
                    id="education-heading"
                  />
                  <Reveal>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="font-serif text-xl italic text-ink">
                          {education.degree}
                        </h3>
                        <p className="mt-0.5 text-sm text-ink-soft">
                          {education.school}
                        </p>
                      </div>
                      <p className="text-[13px] text-meta">
                        {education.dates}
                        <span className="mx-2 text-rule">/</span>
                        {education.location}
                      </p>
                    </div>
                  </Reveal>
                  <FolioNumber value={roman(5)} />
                </section>

                <section
                  id="contact"
                  aria-labelledby="contact-heading"
                  className={SECTION_SHELL}
                >
                  <RunningHead id="contact" folio={6} />
                  <SectionHeading index="V" title="Colophon" id="contact-heading" />
                  <Reveal>
                    <WaxSeal />
                  </Reveal>

                  <div className="mt-14">
                    <RuleWithLozenge />
                    <p className="mt-5 text-center font-display text-[9px] tracking-[0.28em] text-meta/80">
                      SET IN CINZEL AND CORMORANT GARAMOND · ABUJA ·{" "}
                      {new Date().getFullYear()}
                    </p>
                  </div>

                  <FolioNumber value={roman(6)} />
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
