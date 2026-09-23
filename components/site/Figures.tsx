export function TunerFigure() {
  return (
    <svg
      viewBox="0 0 280 180"
      className="h-auto w-full"
      role="img"
      aria-label="Tuner meter with a needle near the center pitch mark"
    >
      <rect width="280" height="180" fill="#e7d7bc" />
      <rect x="6" y="6" width="268" height="168" fill="none" stroke="#8a5a2b" strokeWidth="0.6" />
      <path
        d="M46 128 A94 94 0 0 1 234 128"
        fill="none"
        stroke="#cbb892"
        strokeWidth="1.25"
      />
      {[
        [58, 118, 64, 104],
        [78, 92, 86, 80],
        [108, 68, 114, 54],
        [140, 58, 140, 42],
        [172, 68, 166, 54],
        [202, 92, 194, 80],
        [222, 118, 216, 104],
      ].map(([x1, y1, x2, y2], index) => (
        <line
          key={index}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={index === 3 ? "#8a5a2b" : "#b89a6a"}
          strokeWidth={index === 3 ? 1.75 : 1.25}
          strokeLinecap="round"
        />
      ))}
      <g transform="rotate(-8 140 128)">
        <line
          x1="140"
          y1="128"
          x2="140"
          y2="62"
          stroke="#2a160f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <circle cx="140" cy="128" r="4.5" fill="#8a5a2b" />
      <text
        x="64"
        y="152"
        fill="#7a614c"
        fontSize="11"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        −50
      </text>
      <text
        x="128"
        y="152"
        fill="#8a5a2b"
        fontSize="11"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        E
      </text>
      <text
        x="196"
        y="152"
        fill="#7a614c"
        fontSize="11"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        +50
      </text>
    </svg>
  );
}

export function MothtypeFigure() {
  return (
    <svg
      viewBox="0 0 280 180"
      className="h-auto w-full"
      role="img"
      aria-label="Typing line with a caret after the completed words"
    >
      <rect width="280" height="180" fill="#e7d7bc" />
      <rect x="6" y="6" width="268" height="168" fill="none" stroke="#8a5a2b" strokeWidth="0.6" />
      <text
        x="28"
        y="78"
        fontSize="15"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        <tspan fill="#8a5a2b">the quick</tspan>
        <tspan fill="#b89a6a"> brown</tspan>
      </text>
      <rect x="118" y="64" width="1.5" height="18" fill="#8a5a2b" />
      <text
        x="28"
        y="108"
        fill="#c4aa80"
        fontSize="15"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        fox jumps
      </text>
    </svg>
  );
}
