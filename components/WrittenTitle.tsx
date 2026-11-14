"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { titleGlyphs, titleViewBox } from "@/lib/about-title";

/**
 * "Knowing Jesus. Making Him known." written letter by letter as the visitor scrolls.
 * Each letter's outline is stroked from the first letter to the last, then filled in.
 * A faint outline of every letter shows from the start so the title can always be read.
 */
export function WrittenTitle({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [range, setRange] = useState(700);

  useEffect(() => {
    const set = () => setRange(Math.max(360, window.innerHeight * (window.innerWidth >= 1024 ? 0.75 : 0.55)));
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const raw = useTransform(scrollY, [0, range], [0, 1], { clamp: true });
  const progress = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.4 });
  const n = titleGlyphs.length;

  return (
    <svg viewBox={titleViewBox} className={`w-full overflow-visible ${className}`} aria-hidden="true" focusable="false">
      {titleGlyphs.map((g, i) => (
        <Letter key={i} d={g.d} accent={g.accent} index={i} count={n} progress={progress} still={!!reduce} />
      ))}
    </svg>
  );
}

function Letter({ d, accent, index, count, progress, still }: { d: string; accent: boolean; index: number; count: number; progress: MotionValue<number>; still: boolean }) {
  // Each letter gets an overlapping slice of the scroll so the pen keeps moving smoothly
  const span = 0.86 / count;
  const start = 0.02 + index * span;
  const end = start + span * 2.4;
  const dash = useTransform(progress, [start, end], [1, 0]);
  const fill = useTransform(progress, [start + (end - start) * 0.55, end + span], [0, 1]);
  const color = accent ? "var(--color-orange)" : "var(--color-navy)";

  if (still) return <path d={d} fill={color} />;

  return (
    <g>
      {/* faint guide so the words are readable before they are written */}
      <path d={d} fill="none" stroke={color} strokeOpacity={0.16} strokeWidth={1} />
      <motion.path
        d={d}
        className="title-fill"
        fill={color}
        stroke={color}
        strokeWidth={1.3}
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 1"
        style={{ strokeDashoffset: dash, fillOpacity: fill }}
      />
    </g>
  );
}
