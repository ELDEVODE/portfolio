"use client";

import { motion, useReducedMotion } from "framer-motion";

import { projects } from "@/data";

import { MothtypeFigure, TunerFigure } from "./Figures";
import { ease } from "./motion";

const figures = {
  tuner: TunerFigure,
  mothtype: MothtypeFigure,
};

export function SelectedWork() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-2 space-y-12">
      {projects.map((project, index) => {
        const Figure = figures[project.figure];
        return (
          <motion.article
            key={project.id}
            className="group grid items-start gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease, delay: index * 0.08 }}
          >
            <motion.div
              className="will-change-transform"
              whileHover={reduce ? undefined : { x: 6 }}
              transition={{ duration: 0.55, ease }}
            >
              <Figure />
            </motion.div>
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
          </motion.article>
        );
      })}
    </div>
  );
}
