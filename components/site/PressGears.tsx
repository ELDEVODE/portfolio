"use client";

import { useRef } from "react";

import { useGsapContext } from "@/lib/gsap";

function Gear({ teeth, r }: { teeth: number; r: number }) {
  const inner = r * 0.74;
  const step = (Math.PI * 2) / teeth;
  const points: string[] = [];

  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    const b = a + step * 0.42;
    const c = a + step * 0.5;
    const d = a + step * 0.92;
    points.push(
      `${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`,
      `${(50 + Math.cos(b) * r).toFixed(2)} ${(50 + Math.sin(b) * r).toFixed(2)}`,
      `${(50 + Math.cos(c) * inner).toFixed(2)} ${(50 + Math.sin(c) * inner).toFixed(2)}`,
      `${(50 + Math.cos(d) * inner).toFixed(2)} ${(50 + Math.sin(d) * inner).toFixed(2)}`,
    );
  }

  return (
    <>
      <polygon
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r={inner * 0.45} fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r={inner * 0.16} fill="currentColor" />
      {[0, 60, 120].map((deg) => (
        <line
          key={deg}
          x1={Number((50 + Math.cos((deg * Math.PI) / 180) * inner * 0.2).toFixed(3))}
          y1={Number((50 + Math.sin((deg * Math.PI) / 180) * inner * 0.2).toFixed(3))}
          x2={Number((50 + Math.cos((deg * Math.PI) / 180) * inner * 0.44).toFixed(3))}
          y2={Number((50 + Math.sin((deg * Math.PI) / 180) * inner * 0.44).toFixed(3))}
          stroke="currentColor"
          strokeWidth="0.8"
        />
      ))}
    </>
  );
}

/**
 * Two meshed gears in the margin, driven by how fast you are reading.
 *
 * ScrollTrigger reports scroll velocity; we fold that into an angle each
 * frame and let it decay, so the press spins up when you flick down the
 * page and coasts to a stop when you settle on a paragraph. The second
 * gear counter-rotates at its tooth ratio, as a meshed pair must.
 */
export function PressGears() {
  const big = useRef<SVGGElement>(null);
  const small = useRef<SVGGElement>(null);

  const scope = useGsapContext(({ gsap, ScrollTrigger }) => {
    let angle = 0;
    let velocity = 0;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // px/s → a workable angular nudge
        velocity += self.getVelocity() * 0.00035;
      },
    });

    const tick = () => {
      // idle creep, so the press is never completely dead
      angle += velocity + 0.06;
      velocity *= 0.92;
      if (big.current) big.current.style.transform = `rotate(${angle}deg)`;
      // 13 teeth driving 9: the small wheel turns faster, and backwards
      if (small.current)
        small.current.style.transform = `rotate(${-angle * (13 / 9)}deg)`;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  });

  return (
    <div
      ref={scope as React.RefObject<HTMLDivElement>}
      aria-hidden="true"
      className="pointer-events-none hidden text-gold/35 xl:block"
    >
      <svg viewBox="0 0 160 118" className="h-[118px] w-[160px] overflow-visible">
        <g ref={big} style={{ transformOrigin: "50px 50px" }}>
          <Gear teeth={13} r={34} />
        </g>
        {/* position on the outer group, spin on the inner one: an inline
            style transform would otherwise clobber the translate */}
        <g transform="translate(58, 34)">
          <g ref={small} style={{ transformOrigin: "50px 50px" }}>
            <Gear teeth={9} r={23} />
          </g>
        </g>
      </svg>
    </div>
  );
}
