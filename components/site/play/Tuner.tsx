"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A working guitar tuner, in the page.
 *
 * It runs the same chain as the Rust CLI this project describes: a Hann
 * window over the time-domain buffer, an FFT, parabolic interpolation
 * around the spectral peak for sub-bin accuracy, harmonic correction for
 * the low strings, and an EMA to stop the needle twitching.
 *
 * The FFT is hand-rolled (iterative radix-2) rather than taken from
 * AnalyserNode.getByteFrequencyData, because we need the real and
 * imaginary parts to interpolate properly — the byte API has already
 * thrown that away.
 *
 * Nothing is recorded and nothing leaves the browser.
 */

const STRINGS = [
  { name: "E", octave: 2, hz: 82.41 },
  { name: "A", octave: 2, hz: 110.0 },
  { name: "D", octave: 3, hz: 146.83 },
  { name: "G", octave: 3, hz: 196.0 },
  { name: "B", octave: 3, hz: 246.94 },
  { name: "e", octave: 4, hz: 329.63 },
];

const FFT_SIZE = 8192;

/** Round every trig result: server and client must agree to the last bit,
 *  or React tears the tree down on hydration. */
const at = (v: number) => Number(v.toFixed(3));

/** In-place iterative radix-2 FFT. */
function fft(re: Float32Array, im: Float32Array) {
  const n = re.length;

  for (let i = 1, j = 0; i < n; i += 1) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }

  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wRe = Math.cos(ang);
    const wIm = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curRe = 1;
      let curIm = 0;
      for (let k = 0; k < len / 2; k += 1) {
        const aRe = re[i + k];
        const aIm = im[i + k];
        const bRe = re[i + k + len / 2] * curRe - im[i + k + len / 2] * curIm;
        const bIm = re[i + k + len / 2] * curIm + im[i + k + len / 2] * curRe;
        re[i + k] = aRe + bRe;
        im[i + k] = aIm + bIm;
        re[i + k + len / 2] = aRe - bRe;
        im[i + k + len / 2] = aIm - bIm;
        const nextRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe;
        curRe = nextRe;
      }
    }
  }
}

/** Returns the fundamental in Hz, or null when the signal is too quiet. */
function detectPitch(buffer: Float32Array, sampleRate: number): number | null {
  const n = FFT_SIZE;
  const re = new Float32Array(n);
  const im = new Float32Array(n);

  // DC offset removal
  let mean = 0;
  for (let i = 0; i < n; i += 1) mean += buffer[i];
  mean /= n;

  let rms = 0;
  for (let i = 0; i < n; i += 1) {
    const s = buffer[i] - mean;
    rms += s * s;
    // Hann window
    re[i] = s * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)));
  }
  rms = Math.sqrt(rms / n);
  if (rms < 0.004) return null;

  fft(re, im);

  const binHz = sampleRate / n;
  const lo = Math.floor(70 / binHz);
  const hi = Math.ceil(1200 / binHz);

  const mag = (i: number) => Math.hypot(re[i], im[i]);

  let peak = lo;
  let peakMag = 0;
  for (let i = lo; i < hi; i += 1) {
    const m = mag(i);
    if (m > peakMag) {
      peakMag = m;
      peak = i;
    }
  }
  if (peakMag <= 0) return null;

  // The loudest partial on a low string is often the 2nd or 3rd harmonic.
  // If a sub-multiple carries real energy, prefer it as the fundamental.
  for (const divisor of [3, 2]) {
    const cand = Math.round(peak / divisor);
    if (cand >= lo && mag(cand) > peakMag * 0.4) {
      peak = cand;
      peakMag = mag(cand);
    }
  }

  // Parabolic interpolation around the peak for sub-bin resolution
  const a = mag(peak - 1);
  const b = peakMag;
  const c = mag(peak + 1);
  const shift = (0.5 * (a - c)) / (a - 2 * b + c || 1);

  return (peak + shift) * binHz;
}

function nearestString(hz: number) {
  let best = STRINGS[0];
  let bestCents = Infinity;
  for (const s of STRINGS) {
    const cents = Math.abs(1200 * Math.log2(hz / s.hz));
    if (cents < bestCents) {
      bestCents = cents;
      best = s;
    }
  }
  return { string: best, cents: 1200 * Math.log2(hz / best.hz) };
}

type Mode = "off" | "demo" | "mic";

export function Tuner() {
  const [mode, setMode] = useState<Mode>("off");
  const [note, setNote] = useState<string>("—");
  const [cents, setCents] = useState<number | null>(null);
  const [hz, setHz] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [demoString, setDemoString] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const rafRef = useRef(0);
  const smoothed = useRef<number | null>(null);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    oscRef.current?.stop();
    oscRef.current?.disconnect();
    oscRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    ctxRef.current?.close();
    ctxRef.current = null;
    analyserRef.current = null;
    smoothed.current = null;
    setMode("off");
    setNote("—");
    setCents(null);
    setHz(null);
  }, []);

  useEffect(() => stop, [stop]);

  const loop = useCallback(() => {
    const analyser = analyserRef.current;
    const ctx = ctxRef.current;
    if (!analyser || !ctx) return;

    const buf = new Float32Array(FFT_SIZE);
    analyser.getFloatTimeDomainData(buf);
    const found = detectPitch(buf, ctx.sampleRate);

    if (found) {
      // exponential moving average — the needle should settle, not jitter
      smoothed.current =
        smoothed.current == null ? found : smoothed.current * 0.78 + found * 0.22;
      const { string, cents: off } = nearestString(smoothed.current);
      setNote(`${string.name}${string.octave}`);
      setCents(off);
      setHz(smoothed.current);
    } else {
      smoothed.current = null;
      setCents(null);
      setHz(null);
      setNote("—");
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const build = useCallback(() => {
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtor();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = FFT_SIZE;
    analyser.smoothingTimeConstant = 0;
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    return { ctx, analyser };
  }, []);

  const startDemo = useCallback(
    (index: number) => {
      stop();
      setError(null);
      const { ctx, analyser } = build();

      // a plucked string, detuned a little, with a 2nd harmonic so the
      // harmonic-correction path above is genuinely exercised
      const target = STRINGS[index];
      const detuned = target.hz * Math.pow(2, (index % 2 ? 11 : -14) / 1200);

      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = detuned;
      const gain = ctx.createGain();
      gain.gain.value = 0.28;
      osc.connect(gain).connect(analyser);
      osc.start();
      oscRef.current = osc;

      setDemoString(index);
      setMode("demo");
      rafRef.current = requestAnimationFrame(loop);
    },
    [build, loop, stop],
  );

  const startMic = useCallback(async () => {
    stop();
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;
      const { ctx, analyser } = build();
      ctx.createMediaStreamSource(stream).connect(analyser);
      setMode("mic");
      rafRef.current = requestAnimationFrame(loop);
    } catch {
      setError(
        "No microphone — the tuner is running on a synthesized string instead.",
      );
      startDemo(0);
    }
  }, [build, loop, startDemo, stop]);

  const inTune = cents != null && Math.abs(cents) < 5;
  const needle = cents == null ? 0 : Math.max(-50, Math.min(50, cents));

  return (
    <div className="rounded-sm border border-gold/35 bg-wash/40 p-5">
      {/* the dial */}
      <svg viewBox="0 0 260 150" className="w-full" role="img" aria-label="Tuning dial">
        <rect
          x="0.5"
          y="0.5"
          width="259"
          height="149"
          fill="none"
          stroke="rgb(var(--gold-rgb) / 0.4)"
          strokeWidth="1"
        />
        {/* cent ticks, −50 to +50 */}
        {Array.from({ length: 21 }, (_, i) => {
          const c = -50 + i * 5;
          const a = ((c / 50) * 52 - 90) * (Math.PI / 180);
          const major = c % 25 === 0;
          const r1 = major ? 86 : 94;
          return (
            <g key={c}>
              <line
                x1={at(130 + Math.cos(a) * r1)}
                y1={at(138 + Math.sin(a) * r1)}
                x2={at(130 + Math.cos(a) * 100)}
                y2={at(138 + Math.sin(a) * 100)}
                stroke="rgb(var(--gold-rgb) / 0.55)"
                strokeWidth={major ? 1.1 : 0.5}
              />
              {major ? (
                <text
                  x={at(130 + Math.cos(a) * 74)}
                  y={at(138 + Math.sin(a) * 74)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgb(var(--meta-rgb))"
                  style={{ fontSize: 8, letterSpacing: "0.1em" }}
                >
                  {c > 0 ? `+${c}` : c}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* the in-tune window */}
        <path
          d="M123 44 L130 38 L137 44"
          fill="none"
          stroke={
            inTune ? "rgb(var(--gold-rgb))" : "rgb(var(--rule-rgb))"
          }
          strokeWidth="1.4"
        />

        {/* needle */}
        <g
          style={{
            transform: `rotate(${(needle / 50) * 52}deg)`,
            transformOrigin: "130px 138px",
            transition: "transform 140ms linear",
          }}
        >
          <line
            x1="130"
            y1="138"
            x2="130"
            y2="46"
            stroke={inTune ? "rgb(var(--gold-rgb))" : "rgb(var(--ink-rgb))"}
            strokeWidth="1.6"
          />
          <circle cx="130" cy="138" r="5" fill="rgb(var(--paper-rgb))" stroke="rgb(var(--gold-rgb))" strokeWidth="1.2" />
        </g>

        <text
          x="130"
          y="118"
          textAnchor="middle"
          fill="rgb(var(--ink-rgb))"
          className="font-serif"
          style={{ fontSize: 30, fontStyle: "italic" }}
        >
          {note}
        </text>
      </svg>

      {/* readout */}
      <p
        aria-live="polite"
        className="mt-2 text-center font-display text-[10px] tracking-[0.2em] text-meta"
      >
        {mode === "off"
          ? "IDLE"
          : hz == null
            ? "LISTENING…"
            : `${hz.toFixed(1)} HZ · ${cents! > 0 ? "+" : ""}${cents!.toFixed(0)} CENTS${inTune ? " · IN TUNE" : ""}`}
      </p>

      {/* controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {mode === "off" ? (
          <>
            <button
              type="button"
              onClick={startMic}
              className="border border-gold/45 px-3 py-2 font-display text-[10px] tracking-[0.16em] text-ink transition-colors hover:bg-wash"
            >
              LET IT LISTEN
            </button>
            <button
              type="button"
              onClick={() => startDemo(0)}
              className="border border-rule px-3 py-2 font-display text-[10px] tracking-[0.16em] text-meta transition-colors hover:text-ink"
            >
              DEMO TONE
            </button>
          </>
        ) : (
          <>
            {mode === "demo"
              ? STRINGS.map((s, i) => (
                  <button
                    key={s.name + s.octave}
                    type="button"
                    onClick={() => startDemo(i)}
                    aria-pressed={demoString === i}
                    className={`h-8 w-8 border font-serif text-sm italic transition-colors ${
                      demoString === i
                        ? "border-gold bg-wash text-ink"
                        : "border-rule text-meta hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </button>
                ))
              : null}
            <button
              type="button"
              onClick={stop}
              className="border border-rule px-3 py-2 font-display text-[10px] tracking-[0.16em] text-meta transition-colors hover:text-ink"
            >
              STOP
            </button>
          </>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] leading-snug text-meta">
        {error ??
          (mode === "mic"
            ? "Listening locally. Nothing is recorded or sent anywhere."
            : "Hann window → FFT → parabolic interpolation → EMA, the same chain as the Rust CLI.")}
      </p>
    </div>
  );
}
