/**
 * The ornament library.
 *
 * Everything here is stroked in currentColor so each piece takes the colour
 * of whatever it sits in. The rule they all follow: at the size they are
 * actually used, every line must stay separable. Curls and filled leaves
 * merge into smudges at 16–50px, so these are built from straight rules,
 * single arcs and solid lozenges — the vocabulary of an engraved rule,
 * not of a drawn vine.
 */

/** Rule — lozenge — rule. The section-heading mark. */
export function Fleuron({ className = "text-gold/70" }: { className?: string }) {
  return (
    <svg
      width="88"
      height="12"
      viewBox="0 0 88 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 6h30M58 6h30" stroke="currentColor" strokeWidth="1" />
      <path d="M34 6h4M50 6h4" stroke="currentColor" strokeWidth="1" />
      <path d="M44 1.5 48.5 6 44 10.5 39.5 6 44 1.5Z" fill="currentColor" />
    </svg>
  );
}

/** A corner bracket with a single quarter-arc and a bead. */
export function CornerAcanthus({
  className = "text-gold/40",
}: {
  className?: string;
}) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M0.5 14V0.5H14" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 18V4.5H18" stroke="currentColor" strokeWidth="0.5" />
      <path
        d="M10 30A20 20 0 0 1 30 10"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** A double rule broken by a lozenge. */
export function RuleWithLozenge({
  className = "text-gold/50",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={`h-3 w-full ${className}`}
    >
      <path d="M0 4h186M214 4h186" stroke="currentColor" strokeWidth="0.9" />
      <path d="M0 8h186M214 8h186" stroke="currentColor" strokeWidth="0.5" />
      <path d="M200 0.5 206 6l-6 5.5L194 6l6-5.5Z" fill="currentColor" />
    </svg>
  );
}

/**
 * The flourish flanking the hero's role line: a tapering rule that ends in
 * a bead. It replaces the laurel sprig, which at this size read as fuzz.
 */
export function Flourish({
  className = "text-gold/55",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      width="40"
      height="8"
      viewBox="0 0 40 8"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M8 4h30" stroke="currentColor" strokeWidth="0.9" />
      <path d="M14 1.5h18" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

/** The frame behind an illuminated initial: two rules and four beads. */
export function InitialFrame({
  className = "text-gold/50",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      <rect x="0.5" y="0.5" width="71" height="71" stroke="currentColor" strokeWidth="1" />
      <rect x="4.5" y="4.5" width="63" height="63" stroke="currentColor" strokeWidth="0.5" />
      {[
        [8, 8],
        [64, 8],
        [8, 64],
        [64, 64],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.3" fill="currentColor" />
      ))}
    </svg>
  );
}

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function roman(n: number) {
  return ROMAN[n] ?? String(n);
}

/** A folio number, flanked by hairlines, as it sits at the foot of a page. */
export function FolioNumber({ value }: { value: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3 py-5 text-gold/55"
    >
      <span className="h-px w-8 bg-current" />
      <span className="font-display text-[10px] tracking-[0.34em]">{value}</span>
      <span className="h-px w-8 bg-current" />
    </div>
  );
}
