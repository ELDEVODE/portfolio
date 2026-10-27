"use client";

import { useState } from "react";

import { skillGroups, type Skill, type SkillLevel } from "@/data";

import { Astrolabe, type AstrolabeTarget } from "./Astrolabe";
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

function SkillRow({
  skill,
  index,
  onPoint,
  onRelease,
}: {
  skill: Skill;
  index: number;
  onPoint: () => void;
  onRelease: () => void;
}) {
  const { ref, className } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      tabIndex={0}
      onMouseEnter={onPoint}
      onFocus={onPoint}
      onMouseLeave={onRelease}
      onBlur={onRelease}
      style={{ transitionDelay: `${index * 35}ms` }}
      className={`${className} flex items-start justify-between gap-4 py-3 outline-none transition-colors duration-300 hover:bg-wash/70 focus-visible:bg-wash/70`}
    >
      <div className="min-w-0">
        <p className="font-serif text-lg leading-tight text-ink">{skill.name}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-meta">{skill.focus}</p>
      </div>
      <LevelMark level={skill.level} />
    </li>
  );
}

export function SkillGroups() {
  const [target, setTarget] = useState<AstrolabeTarget>(null);

  return (
    <div className="mt-2 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
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
                <SkillRow
                  key={skill.name}
                  skill={skill}
                  index={index}
                  onPoint={() =>
                    setTarget({ group: group.id, index, level: skill.level })
                  }
                  onRelease={() =>
                    setTarget((current) =>
                      current && current.group === group.id && current.index === index
                        ? null
                        : current,
                    )
                  }
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* The instrument. Decorative: every fact it shows is in the rows. */}
      <div className="mt-12 hidden lg:sticky lg:top-24 lg:mt-0 lg:block lg:self-start">
        <div className="aspect-square w-full">
          <Astrolabe target={target} />
        </div>
        <p className="mt-4 text-center font-display text-[10px] tracking-[0.2em] text-meta">
          {target
            ? skillGroups
                .find((group) => group.id === target.group)
                ?.skills[target.index]?.name.toUpperCase()
            : "POINT AT A SKILL"}
        </p>
      </div>
    </div>
  );
}
