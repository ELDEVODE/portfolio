"use client";

import { motion, useReducedMotion } from "framer-motion";

import { skillGroups, type SkillLevel } from "@/data";

import { ease } from "./motion";

const filled: Record<SkillLevel, number> = {
  Advanced: 3,
  Intermediate: 2,
  Competent: 1,
};

function LevelMark({ level }: { level: SkillLevel }) {
  const count = filled[level];

  return (
    <span className="flex shrink-0 items-center gap-2">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-px w-3.5 ${index < count ? "bg-gold" : "bg-rule"}`}
          />
        ))}
      </span>
      <span className="font-display text-[10px] tracking-[0.16em] text-meta">
        {level}
      </span>
    </span>
  );
}

export function SkillGroups() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-2 grid gap-10 md:grid-cols-2">
      {skillGroups.map((group, groupIndex) => (
        <motion.section
          key={group.id}
          aria-labelledby={`${group.id}-label`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease, delay: groupIndex * 0.06 }}
        >
          <h3
            id={`${group.id}-label`}
            className="font-display text-[11px] tracking-[0.22em] text-gold"
          >
            {group.label}
          </h3>
          <ul className="mt-4 divide-y divide-rule">
            {group.skills.map((skill, skillIndex) => (
              <motion.li
                key={skill.name}
                className="flex items-start justify-between gap-4 py-3 transition-colors duration-300 hover:bg-wash/70"
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: skillIndex * 0.03 }}
              >
                <div>
                  <p className="font-serif text-lg leading-tight text-ink">{skill.name}</p>
                  <p className="mt-0.5 text-[13px] text-meta">{skill.focus}</p>
                </div>
                <LevelMark level={skill.level} />
              </motion.li>
            ))}
          </ul>
        </motion.section>
      ))}
    </div>
  );
}
