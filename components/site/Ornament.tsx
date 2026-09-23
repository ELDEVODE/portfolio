export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 16"
      className={`h-4 w-[4.5rem] text-gold ${className}`}
      aria-hidden
    >
      <path d="M1 8 H30" stroke="currentColor" strokeWidth="0.6" />
      <path d="M58 8 H87" stroke="currentColor" strokeWidth="0.6" />
      <path
        d="M44 1.5 L51 8 L44 14.5 L37 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <circle cx="44" cy="8" r="1.15" fill="currentColor" />
    </svg>
  );
}
