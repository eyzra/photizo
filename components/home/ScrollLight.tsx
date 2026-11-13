"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const WEAVES = 9; // how many gentle side-to-side turns the light makes on its way down
const AMP = 9; // px

const pathD = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const v = i / 200;
    pts.push(`${(20 + Math.sin(v * Math.PI * WEAVES) * AMP).toFixed(2)} ${(v * 1000).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
})();

/**
 * A point of light that travels down the right edge of the page as the visitor scrolls,
 * leaving a fine thread of light behind it. Its tail stretches when you scroll quickly.
 */
export function ScrollLight() {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const p = useSpring(scrollYProgress, reduce ? { stiffness: 1000, damping: 100 } : { stiffness: 70, damping: 18, mass: 0.6 });
  const velocity = useVelocity(scrollY);
  const tailRaw = useTransform(velocity, [-2500, 0, 2500], reduce ? [24, 24, 24] : [120, 26, 120]);
  const tail = useSpring(tailRaw, { stiffness: 200, damping: 30 });

  const top = useTransform(p, (v) => `calc(13vh + ${(v * 80).toFixed(3)}vh)`);
  const x = useTransform(p, (v) => -Math.sin(v * Math.PI * WEAVES) * AMP);
  const dash = useTransform(p, (v) => 1 - v);
  const glow = useTransform(velocity, [-2500, 0, 2500], [1.5, 1, 1.5]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 z-40 w-10 max-md:right-[-6px] max-md:scale-75">
      {/* the path of light already travelled */}
      <svg viewBox="0 0 40 1000" preserveAspectRatio="none" className="absolute right-0 top-[13vh] h-[80vh] w-10 overflow-visible">
        <defs>
          <linearGradient id="thread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#52D7ED" stopOpacity="0" />
            <stop offset="0.5" stopColor="#52D7ED" stopOpacity="0.55" />
            <stop offset="1" stopColor="#F58220" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d={pathD} fill="none" stroke="rgb(7 29 73 / 0.09)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#thread)"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          style={{ strokeDashoffset: dash }}
        />
      </svg>

      {/* the light itself */}
      <motion.div style={{ top, x }} className="absolute right-[20px] translate-x-1/2">
        <motion.div
          style={{ height: tail }}
          className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-t from-white via-cyan/70 to-transparent blur-[1px]"
        />
        <motion.div style={{ scale: glow }} className="relative -translate-y-1/2">
          <span className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(245_130_32/0.35),transparent)]" />
          <span className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.9),rgb(82_215_237/0.2)_60%,transparent)] animate-breathe" />
          <span className="relative block size-3 rounded-full bg-white shadow-[0_0_10px_3px_rgb(255_255_255/0.9),0_0_22px_6px_rgb(82_215_237/0.6)]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
