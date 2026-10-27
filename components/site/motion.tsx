"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Anything already level with or above the fold has been "read"
    // already — on a deep link or a reload partway down the folio it
    // would otherwise never intersect, and stay invisible for good.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Intersecting, or already scrolled past — a hash jump can carry
        // the page over an element without it ever being in view.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: shown ? "reveal is-shown" : "reveal",
  };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${revealClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
