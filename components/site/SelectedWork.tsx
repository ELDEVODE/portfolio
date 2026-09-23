"use client";

import { projects, type Project } from "@/data";

import { MothtypeFigure, TunerFigure } from "./Figures";
import { useReveal } from "./motion";

const figures = {
  tuner: TunerFigure,
  mothtype: MothtypeFigure,
};

function WorkPanel({ project, index }: { project: Project; index: number }) {
  const { ref, className } = useReveal<HTMLElement>();
  const Figure = figures[project.figure];

  return (
          <article
            ref={ref}
            style={{ transitionDelay: `${index * 80}ms` }}
            className={`${className} group grid items-start gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10`}
          >
            <div className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              <Figure />
            </div>
            <div>
              <h3 className="font-serif text-4xl italic leading-none text-ink">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-meta">{project.summary}</p>
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
              <ul className="mt-6 space-y-2.5">
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
          </article>
  );
}

export function SelectedWork() {
  return (
    <div className="mt-2 space-y-12">
      {projects.map((project, index) => (
        <WorkPanel key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
