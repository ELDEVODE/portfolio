"use client";

import { levelOrder, skillGroups, type SkillLevel } from "@/data";

export type AstrolabeTarget = {
  group: string;
  index: number;
  level: SkillLevel;
} | null;

const RADII = [78, 62, 46, 30];

/** Round every trig result: server and client must agree to the last bit,
 *  or React tears the tree down on hydration. */
const at = (value: number) => Number(value.toFixed(3));

const polar = (angle: number, radius: number) => ({
  x: at(100 + Math.sin(angle) * radius),
  y: at(100 - Math.cos(angle) * radius),
});

/** Degrees the alidade swings to for each level. */
const LEVEL_ANGLE: Record<SkillLevel, number> = {
  Competent: -58,
  Intermediate: 0,
  Advanced: 58,
};

/**
 * A brass instrument standing in for a skills chart: one ring per group,
 * a rete of degree ticks, and an alidade that swings to the level of
 * whatever skill the reader is pointing at. The ledger rows beside it
 * remain the readable truth — this is the dial that answers them.
 */
export function Astrolabe({ target }: { target: AstrolabeTarget }) {
  const active = target
    ? skillGroups.findIndex((group) => group.id === target.group)
    : -1;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className="h-full w-full text-gold"
    >
      {/* mater */}
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />

      {/* throne */}
      <path
        d="M94 8h12l-2 6h-8l-2-6Z"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.6"
      />
      <circle cx="100" cy="6" r="2.4" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />

      {/* limb: degree ticks, every 5° with a longer mark at 30° */}
      <g opacity="0.55">
        {Array.from({ length: 72 }, (_, i) => {
          const angle = (i * 5 * Math.PI) / 180;
          const long = i % 6 === 0;
          const r1 = long ? 80 : 84;
          const inner = polar(angle, r1);
          const outer = polar(angle, 88);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="currentColor"
              strokeWidth={long ? 0.8 : 0.4}
            />
          );
        })}
      </g>

      {/* one ring per skill group. The pointed-at ring turns to its skill
          and brightens; the outermost keeps a very slow idle rotation. */}
      {skillGroups.map((group, groupIndex) => {
        const radius = RADII[groupIndex] ?? 24;
        const isActive = active === groupIndex;
        const step = 360 / Math.max(group.skills.length, 1);
        const rotation = isActive && target ? at(-target.index * step) : 0;

        return (
          <g
            key={group.id}
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "100px 100px",
              transition: "transform 1.1s cubic-bezier(.22,1,.36,1), opacity .5s ease",
            }}
            opacity={isActive ? 1 : 0.4}
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="currentColor"
              strokeWidth={isActive ? 1 : 0.5}
              strokeDasharray={groupIndex % 2 ? "3 4" : undefined}
            />
            {group.skills.map((skill, skillIndex) => {
              const angle = (skillIndex * step * Math.PI) / 180;
              const { x: cx, y: cy } = polar(angle, radius);
              const here = isActive && target?.index === skillIndex;
              return (
                <g key={skill.name}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={here ? 3.4 : 1.8}
                    fill={here ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="0.7"
                    style={{ transition: "r .4s ease" }}
                  />
                  {here ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="6.4"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                  ) : null}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* rete: the star-map plate, turning slowly at rest */}
      <g
        className="animate-turn"
        style={{ transformOrigin: "100px 100px" }}
        opacity="0.25"
      >
        <path
          d="M100 24c20 14 30 32 30 52s-10 38-30 52c-20-14-30-32-30-52s10-38 30-52Z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path d="M34 100h132M100 34v132" stroke="currentColor" strokeWidth="0.4" />
      </g>

      {/* alidade: swings to the level of the pointed-at skill */}
      <g
        style={{
          transform: `rotate(${target ? LEVEL_ANGLE[target.level] : 0}deg)`,
          transformOrigin: "100px 100px",
          transition: "transform 1s cubic-bezier(.34,1.3,.64,1)",
        }}
      >
        <line
          x1="100"
          y1="14"
          x2="100"
          y2="186"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity={target ? 0.95 : 0.4}
        />
        <path
          d="M96 20h8l-4 7-4-7Z"
          fill="currentColor"
          opacity={target ? 0.95 : 0.35}
        />
        <circle cx="100" cy="100" r="5" fill="var(--paper)" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="100" cy="100" r="1.5" fill="currentColor" />
      </g>

      {/* the three level stops, engraved on the limb */}
      {levelOrder.map((level) => {
        const angle = (LEVEL_ANGLE[level] * Math.PI) / 180;
        const stop = polar(angle, 88);
        return (
          <circle
            key={level}
            cx={stop.x}
            cy={stop.y}
            r="1.9"
            fill={target?.level === level ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="0.7"
          />
        );
      })}
    </svg>
  );
}
