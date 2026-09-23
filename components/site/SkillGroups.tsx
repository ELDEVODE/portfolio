"use client";

import { skillGroups, type Skill, type SkillLevel } from "@/data";

import { useReveal } from "./motion";

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

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const { ref, className } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${index * 35}ms` }}
      className={`${className} flex items-start justify-between gap-4 py-3 transition-colors duration-300 hover:bg-wash/70`}
    >
      <div>
        <p className="font-serif text-lg leading-tight text-ink">{skill.name}</p>
        <p className="mt-0.5 text-[13px] text-meta">{skill.focus}</p>
      </div>
      <LevelMark level={skill.level} />
    </li>
  );
}

export function SkillGroups() {
  return (
    <div className="mt-2 grid gap-10 md:grid-cols-2">
      {skillGroups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-label`}>
          <h3
            id={`${group.id}-label`}
            className="font-display text-[11px] tracking-[0.22em] text-gold"
          >
            {group.label}
          </h3>
          <ul className="mt-4 divide-y divide-rule">
            {group.skills.map((skill, index) => (
              <SkillRow key={skill.name} skill={skill} index={index} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
