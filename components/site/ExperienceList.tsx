"use client";

import { motion, useReducedMotion } from "framer-motion";

import { experience } from "@/data";

import { ease } from "./motion";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const row = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export function ExperienceList() {
  const reduce = useReducedMotion();

  return (
    <motion.ol
      className="mt-2"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={list}
    >
      {experience.map((job, index) => (
        <motion.li
          key={job.id}
          tabIndex={0}
          variants={row}
          className="group relative py-1 outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          {index < experience.length - 1 ? (
            <span
              aria-hidden
              className="absolute bottom-[-0.35rem] left-[3px] top-7 w-px bg-rule"
            />
          ) : null}
          <span
            aria-hidden
            className="absolute left-[-2px] top-[1.55rem] h-2 w-2 rotate-45 border border-gold bg-paper"
          />

          <div className="grid grid-cols-1 gap-2 py-5 pl-6 sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-8 sm:py-6">
            <div className="text-[13px] leading-5 text-meta sm:pt-1">
              {job.dates
                ? job.dates.split(" – ").map((part) => (
                    <p key={part}>{part}</p>
                  ))
                : null}
              {job.mode ? <p className={job.dates ? "mt-1" : undefined}>{job.mode}</p> : null}
            </div>

            <div className="-mx-3 rounded-xl px-3 py-1 transition-colors duration-500 ease-out group-hover:bg-wash group-focus-within:bg-wash">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl italic leading-tight text-ink">{job.title}</h3>
                  <p className="mt-0.5 font-display text-[12px] tracking-[0.14em] text-ink-soft">{job.company}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 hidden text-lg leading-none text-meta transition-transform duration-500 ease-out group-hover:rotate-45 group-focus-within:rotate-45 lg:inline"
                >
                  +
                </span>
              </div>

              <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-within:grid-rows-[1fr] lg:group-focus-within:opacity-100">
                <div className="overflow-hidden">
                  <ul className="space-y-2.5 pb-2 pt-4">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-2 text-[14.5px] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.65em] h-px w-2.5 bg-gold"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
