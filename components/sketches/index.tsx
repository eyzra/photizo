"use client";

import type { CSSProperties, ReactNode } from "react";
import { Draw } from "./Draw";
import { rays, rng, smooth, sparkle, wobblyEllipse, wobblyLine } from "@/lib/wobble";

type Accent = "orange" | "cyan" | "navy" | "pale";
const accentColor: Record<Accent, string> = {
  orange: "var(--color-orange)",
  cyan: "var(--color-cyan)",
  navy: "var(--color-navy)",
  pale: "var(--color-pale)",
};

const spinStyle: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

type SketchProps = { className?: string; accent?: Accent; delay?: number; strokeWidth?: number };

/* ------------------------------------------------------------------ */
/*  Sun with radiating beams: the core "illumination" mark            */
/* ------------------------------------------------------------------ */
export function SunBurst({ className, accent = "orange", delay = 0, strokeWidth = 1.3, rayCount = 28, seed = 4 }: SketchProps & { rayCount?: number; seed?: number }) {
  const beams = rays(200, 200, 74, 190, rayCount, seed);
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="194" fill="none" stroke="currentColor" strokeOpacity=".35" strokeDasharray="1 7" strokeLinecap="round" />
      <g className="animate-spin-slower" style={spinStyle}>
        {beams.map((d, i) => (
          <Draw key={i} d={d} delay={delay + 0.5 + i * 0.03} duration={0.9} strokeWidth={strokeWidth} />
        ))}
      </g>
      <Draw d={wobblyEllipse(200, 200, 48, 48, { seed: seed + 1, sweep: 1.12 })} delay={delay} duration={1.4} strokeWidth={strokeWidth + 0.3} />
      <Draw d={wobblyEllipse(200, 200, 62, 60, { seed: seed + 2, sweep: 0.86, start: 1.2 })} delay={delay + 0.25} duration={1.2} strokeWidth={strokeWidth} style={{ color: accentColor[accent] }} />
      <Draw d={sparkle(200, 200, 13)} delay={delay + 1.2} duration={0.8} strokeWidth={strokeWidth} style={{ color: accentColor[accent] }} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Imperfect concentric halos that breathe                            */
/* ------------------------------------------------------------------ */
export function Halo({ className, accent = "cyan", delay = 0, strokeWidth = 1.2, rings = 4 }: SketchProps & { rings?: number }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <g className="animate-breathe" style={spinStyle}>
        {Array.from({ length: rings }).map((_, i) => {
          const r = 60 + i * 42;
          return (
            <Draw
              key={i}
              d={wobblyEllipse(200, 200, r, r * 0.97, { seed: 11 + i * 7, sweep: 1.04 + (i % 2) * 0.05, jitter: 0.03, start: i * 1.4 })}
              delay={delay + i * 0.18}
              duration={1.6}
              strokeWidth={strokeWidth}
              strokeOpacity={1 - i * 0.18}
              style={i === 1 ? { color: accentColor[accent] } : undefined}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constellation with slowly turning stars                            */
/* ------------------------------------------------------------------ */
const STARS: [number, number, number][] = [
  [30, 140, 7], [92, 96, 10], [150, 120, 6], [196, 58, 12], [258, 88, 7], [232, 160, 5], [120, 176, 4],
];
export function Constellation({ className, accent = "orange", delay = 0, strokeWidth = 1.1 }: SketchProps) {
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [2, 6]];
  return (
    <svg viewBox="0 0 290 200" className={className} aria-hidden="true" focusable="false">
      {links.map(([a, b], i) => (
        <Draw
          key={i}
          d={wobblyLine(STARS[a][0], STARS[a][1], STARS[b][0], STARS[b][1], { seed: 40 + i, jitter: 1.2, segments: 3 })}
          delay={delay + 0.4 + i * 0.12}
          duration={0.8}
          strokeWidth={strokeWidth * 0.8}
         
          strokeOpacity={0.55}
        />
      ))}
      {STARS.map(([x, y, s], i) => (
        <g key={i} className={i % 2 ? "animate-spin-slow" : "animate-spin-slower"} style={spinStyle}>
          <Draw d={sparkle(x, y, s)} delay={delay + i * 0.1} duration={0.9} strokeWidth={strokeWidth} style={i === 3 ? { color: accentColor[accent] } : undefined} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbital paths                                                      */
/* ------------------------------------------------------------------ */
export function Orbits({ className, accent = "orange", delay = 0, strokeWidth = 1.1 }: SketchProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <g transform="rotate(-18 200 200)">
        <Draw d={wobblyEllipse(200, 200, 180, 70, { seed: 5, sweep: 1.03, jitter: 0.015 })} delay={delay} strokeWidth={strokeWidth} />
      </g>
      <g transform="rotate(32 200 200)">
        <Draw d={wobblyEllipse(200, 200, 150, 56, { seed: 9, sweep: 1.03, jitter: 0.015 })} delay={delay + 0.2} strokeWidth={strokeWidth} strokeOpacity={0.7} />
      </g>
      <Draw d={wobblyEllipse(200, 200, 110, 110, { seed: 13, sweep: 1.05, jitter: 0.02 })} delay={delay + 0.35} strokeWidth={strokeWidth} strokeOpacity={0.5} />
      <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="310" cy="200" r="6" fill={accentColor[accent]} />
      </g>
      <Draw d={sparkle(200, 200, 16)} delay={delay + 0.8} strokeWidth={strokeWidth + 0.2} style={{ color: accentColor[accent] }} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Radiance: light spreading outward in rings and beams               */
/* ------------------------------------------------------------------ */
export function Radiance({ className, accent = "orange", delay = 0, strokeWidth = 1.1 }: SketchProps) {
  const beams = rays(300, 300, 40, 290, 36, 21);
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      {[70, 120, 175, 235].map((r, i) => (
        <Draw key={r} d={wobblyEllipse(300, 300, r, r, { seed: 70 + i, sweep: 1.02, jitter: 0.02, start: i })} delay={delay + i * 0.22} duration={1.8} strokeWidth={strokeWidth} strokeOpacity={0.9 - i * 0.18} />
      ))}
      <g className="animate-spin-slower" style={spinStyle}>
        {beams.map((d, i) => (
          <Draw key={i} d={d} delay={delay + 0.8 + i * 0.02} duration={1} strokeWidth={strokeWidth * 0.8} strokeOpacity={0.45} />
        ))}
      </g>
      <Draw d={wobblyEllipse(300, 300, 26, 26, { seed: 3, sweep: 1.15 })} delay={delay} strokeWidth={strokeWidth + 0.6} style={{ color: accentColor[accent] }} />
      <circle cx="300" cy="300" r="5" fill={accentColor[accent]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hand-drawn arrows                                                  */
/* ------------------------------------------------------------------ */
const ARROWS = {
  curve: { box: "0 0 200 120", body: "M8 96 C46 30 110 8 178 46", head: "M160 26 L180 47 L154 56" },
  loop: { box: "0 0 220 120", body: "M8 86 C36 108 74 96 82 66 C90 34 58 26 54 52 C50 82 118 100 200 52", head: "M178 40 L201 51 L182 70" },
  down: { box: "0 0 120 200", body: "M70 6 C30 50 96 92 58 132 C44 148 50 168 60 186", head: "M44 170 L60 190 L76 172" },
} as const;
export function Arrow({ className, variant = "curve", delay = 0, strokeWidth = 1.6, accent }: SketchProps & { variant?: keyof typeof ARROWS }) {
  const a = ARROWS[variant];
  return (
    <svg viewBox={a.box} className={className} aria-hidden="true" focusable="false" style={accent ? { color: accentColor[accent] } : undefined}>
      <Draw d={a.body} delay={delay} duration={1.1} strokeWidth={strokeWidth} />
      <Draw d={a.head} delay={delay + 1} duration={0.35} strokeWidth={strokeWidth} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Underline and circle annotations                                   */
/* ------------------------------------------------------------------ */
export function Underline({ className, accent = "orange", delay = 0, strokeWidth = 3, double = true, trigger = "view" }: SketchProps & { double?: boolean; trigger?: "view" | "mount" }) {
  return (
    <svg viewBox="0 0 300 28" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false" style={{ color: accentColor[accent] }}>
      <Draw d="M4 15 C62 7 150 4 296 9" delay={delay} duration={0.8} strokeWidth={strokeWidth} trigger={trigger} />
      {double && <Draw d="M34 22 C112 15 204 15 272 18" delay={delay + 0.55} duration={0.6} strokeWidth={strokeWidth * 0.7} trigger={trigger} />}
    </svg>
  );
}

export function Circled({ children, accent = "orange", delay = 0.2, strokeWidth = 2, seed = 7 }: { children: ReactNode; accent?: Accent; delay?: number; strokeWidth?: number; seed?: number }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[12%] -inset-y-[22%] h-[144%] w-[124%]" aria-hidden="true" focusable="false" style={{ color: accentColor[accent] }}>
        <Draw d={wobblyEllipse(100, 50, 92, 42, { seed, sweep: 1.14, jitter: 0.035, start: -2.4 })} delay={delay} duration={1.1} strokeWidth={strokeWidth} />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Mountains: spiritual growth                                        */
/* ------------------------------------------------------------------ */
export function Mountains({ className, accent = "orange", delay = 0, strokeWidth = 1.3 }: SketchProps) {
  return (
    <svg viewBox="0 0 600 260" className={className} aria-hidden="true" focusable="false">
      <g style={{ color: accentColor[accent] }}>
        <Draw d={wobblyEllipse(372, 86, 34, 34, { seed: 17, sweep: 1.1 })} delay={delay} strokeWidth={strokeWidth} />
        {rays(372, 86, 44, 74, 12, 8).map((d, i) => (
          <Draw key={i} d={d} delay={delay + 0.5 + i * 0.05} duration={0.6} strokeWidth={strokeWidth * 0.8} />
        ))}
      </g>
      <Draw d="M0 236 C38 214 66 172 104 160 C130 152 146 178 172 166 C214 146 238 96 274 82 C300 72 312 110 338 118 C368 128 384 104 412 116 C452 134 470 172 512 176 C546 180 572 196 600 204" delay={delay + 0.3} duration={2.2} strokeWidth={strokeWidth} />
      <Draw d="M0 250 C60 236 98 206 146 210 C188 214 214 190 250 186 C292 182 318 214 360 212 C410 210 436 186 478 194 C522 202 560 230 600 236" delay={delay + 0.7} duration={2.2} strokeWidth={strokeWidth} strokeOpacity={0.55} />
      <path d="M140 244 C176 230 196 214 222 196 C244 180 252 150 274 112" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray="2 7" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Open book with light rising from its pages                         */
/* ------------------------------------------------------------------ */
export function OpenBook({ className, accent = "orange", delay = 0, strokeWidth = 1.3 }: SketchProps) {
  const fan = Array.from({ length: 9 }).map((_, i) => {
    const a = -Math.PI / 2 + (i - 4) * 0.2;
    return wobblyLine(200 + Math.cos(a) * 30, 118 + Math.sin(a) * 30, 200 + Math.cos(a) * (96 + (i % 2) * 18), 118 + Math.sin(a) * (96 + (i % 2) * 18), { seed: 90 + i, jitter: 1, segments: 3 });
  });
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false">
      <Draw d="M200 246 C162 226 104 220 46 230 L46 128 C102 118 162 124 200 146" delay={delay} duration={1.4} strokeWidth={strokeWidth} />
      <Draw d="M200 246 C238 226 296 220 354 230 L354 128 C298 118 238 124 200 146" delay={delay + 0.15} duration={1.4} strokeWidth={strokeWidth} />
      <Draw d="M200 146 L200 246" delay={delay + 0.6} duration={0.6} strokeWidth={strokeWidth} />
      {[160, 176, 192, 208].map((y, i) => (
        <g key={y}>
          <Draw d={`M70 ${y + 4} C110 ${y - 4} 150 ${y - 2} 182 ${y + 10}`} delay={delay + 0.9 + i * 0.08} duration={0.6} strokeWidth={strokeWidth * 0.7} strokeOpacity={0.5} />
          <Draw d={`M218 ${y + 10} C250 ${y - 2} 290 ${y - 4} 330 ${y + 4}`} delay={delay + 0.95 + i * 0.08} duration={0.6} strokeWidth={strokeWidth * 0.7} strokeOpacity={0.5} />
        </g>
      ))}
      <g style={{ color: accentColor[accent] }}>
        {fan.map((d, i) => (
          <Draw key={i} d={d} delay={delay + 1.3 + i * 0.05} duration={0.7} strokeWidth={strokeWidth} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pathway leading toward light on the horizon                        */
/* ------------------------------------------------------------------ */
export function Pathway({ className, accent = "orange", delay = 0, strokeWidth = 1.3 }: SketchProps) {
  return (
    <svg viewBox="0 0 320 400" className={className} aria-hidden="true" focusable="false">
      <Draw d="M10 132 C90 128 230 128 310 132" delay={delay} duration={1} strokeWidth={strokeWidth} strokeOpacity={0.6} />
      <g style={{ color: accentColor[accent] }}>
        <Draw d={wobblyEllipse(160, 114, 22, 22, { seed: 31, sweep: 1.1 })} delay={delay + 0.3} strokeWidth={strokeWidth} />
        {rays(160, 114, 30, 58, 14, 12).map((d, i) => (
          <Draw key={i} d={d} delay={delay + 0.6 + i * 0.04} duration={0.6} strokeWidth={strokeWidth * 0.8} />
        ))}
      </g>
      <Draw d="M152 134 C140 190 90 230 96 286 C100 330 60 362 30 396" delay={delay + 0.4} duration={2} strokeWidth={strokeWidth} />
      <Draw d="M168 134 C184 190 226 228 214 290 C206 334 252 366 290 396" delay={delay + 0.55} duration={2} strokeWidth={strokeWidth} />
      <path d="M160 150 C156 210 140 250 150 300 C158 340 156 370 160 396" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray="2 9" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Continuous scribble line                                           */
/* ------------------------------------------------------------------ */
export function Scribble({ className, delay = 0, strokeWidth = 1.4, accent }: SketchProps) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false" style={accent ? { color: accentColor[accent] } : undefined}>
      <Draw
        d="M5 70 C60 20 90 110 130 60 C160 25 196 30 186 62 C176 92 140 80 160 55 C190 20 260 100 320 60 C370 30 404 84 450 56 C496 30 520 92 548 70 C566 56 552 36 538 50 C524 66 560 84 595 40"
        delay={delay}
        duration={2.4}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Blueprint construction drawing                                     */
/* ------------------------------------------------------------------ */
export function Blueprint({ className, delay = 0, strokeWidth = 1, label = "fig. 01", accent = "orange" }: SketchProps & { label?: string }) {
  const ticks = Array.from({ length: 36 }).map((_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const r0 = i % 3 === 0 ? 150 : 158;
    return `M${200 + Math.cos(a) * r0} ${200 + Math.sin(a) * r0} L${200 + Math.cos(a) * 166} ${200 + Math.sin(a) * 166}`;
  });
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="166" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeOpacity=".4" />
      <g strokeOpacity=".5">
        {ticks.map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeWidth={strokeWidth} />
        ))}
      </g>
      <Draw d="M20 200 L380 200" delay={delay} duration={1.2} strokeWidth={strokeWidth} strokeOpacity={0.5} />
      <Draw d="M200 20 L200 380" delay={delay + 0.2} duration={1.2} strokeWidth={strokeWidth} strokeOpacity={0.5} />
      <Draw d="M80 320 L320 80" delay={delay + 0.4} duration={1.2} strokeWidth={strokeWidth} strokeOpacity={0.3} />
      <Draw d={wobblyEllipse(200, 200, 96, 96, { seed: 2, sweep: 1.03, jitter: 0.012 })} delay={delay + 0.6} duration={1.6} strokeWidth={strokeWidth + 0.3} style={{ color: accentColor[accent] }} />
      <Draw d="M296 200 A96 96 0 0 0 200 104" delay={delay + 1.2} duration={0.8} strokeWidth={strokeWidth} strokeOpacity={0.6} />
      <text x="212" y="190" fontSize="11" fontFamily="var(--font-display)" letterSpacing="2" fill="currentColor" opacity=".6">
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Ripple: impact spreading outward from a single point               */
/* ------------------------------------------------------------------ */
export function Ripple({ className, accent = "orange", delay = 0, strokeWidth = 1.2 }: SketchProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      {[24, 58, 98, 142, 186].map((r, i) => (
        <Draw key={r} d={wobblyEllipse(200, 200, r, r * 0.42, { seed: 50 + i, sweep: 1.03, jitter: 0.02, start: i * 0.8 })} delay={delay + i * 0.2} duration={1.4} strokeWidth={strokeWidth} strokeOpacity={1 - i * 0.16} style={i === 0 ? { color: accentColor[accent] } : undefined} />
      ))}
      <Draw d="M200 40 C204 90 196 130 200 186" delay={delay} duration={1} strokeWidth={strokeWidth} style={{ color: accentColor[accent] }} />
      <circle cx="200" cy="40" r="5" fill={accentColor[accent]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Network: influence reaching outward from one life                  */
/* ------------------------------------------------------------------ */
export function Network({ className, accent = "orange", delay = 0, strokeWidth = 1.1 }: SketchProps) {
  const rand = rng(77);
  const nodes = Array.from({ length: 14 }).map((_, i) => {
    const a = (i / 14) * Math.PI * 2 + rand() * 0.3;
    const r = 90 + rand() * 90;
    return [200 + Math.cos(a) * r, 200 + Math.sin(a) * r] as [number, number];
  });
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      {nodes.map(([x, y], i) => (
        <Draw key={`l${i}`} d={smooth([[200, 200], [(200 + x) / 2 + (rand() - 0.5) * 18, (200 + y) / 2 + (rand() - 0.5) * 18], [x, y]])} delay={delay + 0.3 + i * 0.06} duration={0.9} strokeWidth={strokeWidth} strokeOpacity={0.55} />
      ))}
      {nodes.map(([x, y], i) => (
        <Draw key={`n${i}`} d={wobblyEllipse(x, y, 6 + (i % 3) * 2, 6 + (i % 3) * 2, { seed: 100 + i, sweep: 1.1 })} delay={delay + 0.9 + i * 0.05} duration={0.5} strokeWidth={strokeWidth} />
      ))}
      <g style={{ color: accentColor[accent] }}>
        <Draw d={wobblyEllipse(200, 200, 22, 22, { seed: 6, sweep: 1.14 })} delay={delay} duration={0.9} strokeWidth={strokeWidth + 0.6} />
      </g>
      <circle cx="200" cy="200" r="6" fill={accentColor[accent]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small line-art marks for the four expressions                      */
/* ------------------------------------------------------------------ */
export function ExpressionMark({ kind, className, delay = 0 }: { kind: string; className?: string; delay?: number }) {
  const sw = 1.6;
  const orange = { color: "var(--color-orange)" };
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      {kind === "illuminate" && (
        <>
          <Draw d="M40 64 C32 60 20 58 10 60 L10 34 C20 32 32 34 40 40 C48 34 60 32 70 34 L70 60 C60 58 48 60 40 64 Z" delay={delay} strokeWidth={sw} />
          <Draw d="M40 40 L40 64" delay={delay + 0.4} strokeWidth={sw} />
          <g style={orange}>
            {[-0.5, -0.25, 0, 0.25, 0.5].map((o, i) => (
              <Draw key={i} d={`M${40 + Math.sin(o) * 8} ${30 - Math.cos(o) * 2} L${40 + Math.sin(o) * 20} ${30 - Math.cos(o) * 20}`} delay={delay + 0.6 + i * 0.06} duration={0.5} strokeWidth={sw} />
            ))}
          </g>
        </>
      )}
      {kind === "intensify" && (
        <>
          <Draw d="M40 70 C24 70 16 58 18 46 C20 34 30 28 30 16 C40 24 46 30 44 40 C50 36 52 30 52 26 C60 34 64 44 62 52 C60 62 52 70 40 70 Z" delay={delay} duration={1.4} strokeWidth={sw} />
          <g style={orange}>
            <Draw d="M40 66 C33 66 30 60 31 55 C32 50 37 47 38 42 C44 48 48 52 47 58 C46 63 44 66 40 66 Z" delay={delay + 0.8} duration={0.9} strokeWidth={sw} />
          </g>
        </>
      )}
      {kind === "immersion" && (
        <>
          <g style={orange}>
            <Draw d="M24 42 C24 30 32 22 40 22 C48 22 56 30 56 42" delay={delay} strokeWidth={sw} />
            {[-1.2, -0.6, 0, 0.6, 1.2].map((o, i) => (
              <Draw key={i} d={`M${40 + Math.sin(o) * 22} ${42 - Math.cos(o) * 24} L${40 + Math.sin(o) * 30} ${42 - Math.cos(o) * 32}`} delay={delay + 0.5 + i * 0.06} duration={0.5} strokeWidth={sw} />
            ))}
          </g>
          <Draw d="M6 48 C14 44 20 52 28 48 C36 44 42 52 50 48 C58 44 64 52 74 48" delay={delay + 0.3} strokeWidth={sw} />
          <Draw d="M10 58 C18 54 24 62 32 58 C40 54 46 62 54 58 C62 54 66 60 70 58" delay={delay + 0.45} strokeWidth={sw} />
          <Draw d="M16 68 C24 64 30 72 38 68 C46 64 52 70 64 68" delay={delay + 0.6} strokeWidth={sw} />
        </>
      )}
      {kind === "identification" && (
        <>
          <Draw d="M40 10 L40 70" delay={delay} strokeWidth={sw} />
          <Draw d="M24 28 L56 28" delay={delay + 0.3} strokeWidth={sw} />
          <g style={orange}>
            <Draw d={wobblyEllipse(40, 28, 26, 26, { seed: 8, sweep: 1.1 })} delay={delay + 0.6} duration={1.2} strokeWidth={sw} />
          </g>
          <Draw d="M12 70 C26 66 54 66 68 70" delay={delay + 0.9} strokeWidth={sw} />
        </>
      )}
    </svg>
  );
}
