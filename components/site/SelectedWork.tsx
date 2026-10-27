"use client";

import { useState } from "react";

import { projects, type Project } from "@/data";

import { useReveal } from "./motion";
import { Tuner } from "./play/Tuner";
import { TypingTest } from "./play/TypingTest";

/** Each project leads with the thing itself, not a description of it. */
const playable = {
  tuner: Tuner,
  mothtype: TypingTest,
};

function WorkPanel({ project, index }: { project: Project; index: number }) {
  const { ref, className } = useReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  const Playable = playable[project.figure];

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`${className} grid items-start gap-7 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-10`}
    >
      <div>
        <Playable />
      </div>

      <div>
        <h3 className="font-serif text-4xl italic leading-none text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-meta">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="border border-gold/40 px-2 py-0.5 font-display text-[10px] tracking-[0.14em] text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* The detail is kept, but it no longer competes with the toy. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group mt-6 flex items-center gap-2.5 font-display text-[10px] tracking-[0.18em] text-meta transition-colors hover:text-gold"
        >
          <span
            aria-hidden
            className={`inline-block h-px w-5 bg-current transition-all duration-300 ${open ? "w-8" : ""}`}
          />
          {open ? "HIDE THE ENGINEERING" : "THE ENGINEERING"}
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 pt-5">
              {project.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-2 text-[14.5px] leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="mt-[0.65em] h-px w-2.5 bg-gold" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <div className="mt-2 space-y-14">
      {projects.map((project, index) => (
        <WorkPanel key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
