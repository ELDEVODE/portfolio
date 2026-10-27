"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Mothtype, playable. A short timed typing test on a real code snippet,
 * scored locally — no backend, nothing to break, nothing to pay for.
 *
 * The whole thing is driven by a single hidden input so it works with a
 * keyboard, with an IME and on a phone, and the score is announced
 * through a live region rather than only drawn.
 */

const SNIPPETS = [
  `const sum = xs.reduce((a, b) => a + b, 0);`,
  `impl Iterator for Tuner { type Item = f32; }`,
  `export async function GET() { return Response.json(data); }`,
  `let mut buf = vec![0f32; 1 << 13];`,
  `type Result<T> = { ok: true; value: T } | { ok: false };`,
];

const SECONDS = 15;

export function TypingTest() {
  const [target, setTarget] = useState(SNIPPETS[0]);
  const [typed, setTyped] = useState("");
  const [left, setLeft] = useState(SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);

  const input = useRef<HTMLInputElement>(null);
  const started = useRef(0);

  const reset = useCallback((next = true) => {
    if (next) {
      setTarget((cur) => {
        const others = SNIPPETS.filter((s) => s !== cur);
        return others[Math.floor(Math.random() * others.length)];
      });
    }
    setTyped("");
    setLeft(SECONDS);
    setRunning(false);
    setDone(false);
    setCorrectChars(0);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const elapsed = (Date.now() - started.current) / 1000;
      const remaining = Math.max(0, SECONDS - elapsed);
      setLeft(remaining);
      if (remaining <= 0) {
        setRunning(false);
        setDone(true);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [running]);

  const onChange = (value: string) => {
    if (done) return;
    if (!running) {
      started.current = Date.now();
      setRunning(true);
    }
    const next = value.slice(0, target.length);
    setTyped(next);

    let right = 0;
    for (let i = 0; i < next.length; i += 1) {
      if (next[i] === target[i]) right += 1;
    }
    setCorrectChars(right);

    if (next.length === target.length) {
      setRunning(false);
      setDone(true);
    }
  };

  const elapsed = done || running ? Math.max(0.001, SECONDS - left) : 0;
  const wpm = done || running ? Math.round(correctChars / 5 / (elapsed / 60)) : 0;
  const accuracy = typed.length
    ? Math.round((correctChars / typed.length) * 100)
    : 100;

  return (
    <div
      className="rounded-sm border border-gold/35 bg-wash/40 p-5"
      onClick={() => input.current?.focus()}
    >
      {/* the line being set */}
      <p className="break-words font-mono text-[15px] leading-[1.9] tracking-tight">
        {target.split("").map((ch, i) => {
          const state =
            i >= typed.length
              ? "pending"
              : typed[i] === ch
                ? "right"
                : "wrong";
          const isCursor = i === typed.length && !done;
          return (
            <span
              key={`${ch}-${i}`}
              className={
                state === "pending"
                  ? "text-meta/55"
                  : state === "right"
                    ? "text-ink"
                    : "bg-sinopia/20 text-sinopia"
              }
              style={
                isCursor
                  ? { borderLeft: "2px solid rgb(var(--gold-rgb))", marginLeft: -1 }
                  : undefined
              }
            >
              {ch === " " && state === "wrong" ? "␣" : ch}
            </span>
          );
        })}
      </p>

      {/* the hidden input does all the real work */}
      <input
        ref={input}
        value={typed}
        onChange={(e) => onChange(e.target.value)}
        disabled={done}
        aria-label="Type the line shown above"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="sr-only"
      />

      {/* the scorecard */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-rule border-y border-rule text-center">
        {[
          { label: "WPM", value: wpm },
          { label: "ACCURACY", value: `${accuracy}%` },
          { label: "SECONDS", value: left.toFixed(1) },
        ].map((cell) => (
          <div key={cell.label} className="py-3">
            <p className="font-serif text-2xl italic leading-none text-ink">
              {cell.value}
            </p>
            <p className="mt-1 font-display text-[9px] tracking-[0.2em] text-meta">
              {cell.label}
            </p>
          </div>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {done ? `Finished. ${wpm} words per minute at ${accuracy} percent accuracy.` : ""}
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            reset(done);
            window.setTimeout(() => input.current?.focus(), 0);
          }}
          className="border border-gold/45 px-3 py-2 font-display text-[10px] tracking-[0.16em] text-ink transition-colors hover:bg-wash"
        >
          {done ? "ANOTHER LINE" : running ? "RESTART" : "CLICK HERE AND TYPE"}
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-meta">
        {done
          ? `${wpm} wpm · ${accuracy}% accurate`
          : "Fifteen seconds. Scored in the browser, nothing sent anywhere."}
      </p>
    </div>
  );
}
