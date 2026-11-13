"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Suspense treatment for an unannounced theme: soft, blurred lettering
 * behind a slowly moving veil of light. Deliberately contains no theme text.
 */
export function ThemeVeil({ className = "", size = "lg" }: { className?: string; size?: "sm" | "lg" }) {
  const reduce = useReducedMotion();
  const glyphs = size === "lg" ? ["▇▇▇▇▇▇", "▇▇▇▇ ▇▇▇▇▇"] : ["▇▇▇▇▇ ▇▇▇"];
  return (
    <div className={`relative isolate overflow-hidden ${className}`} aria-hidden="true">
      <div className="select-none">
        {glyphs.map((g, i) => (
          <motion.p
            key={i}
            className={`font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white/70 ${size === "lg" ? "text-[clamp(3rem,9vw,8rem)]" : "text-4xl"}`}
            style={{ filter: "blur(18px)" }}
            animate={reduce ? undefined : { opacity: [0.35, 0.8, 0.35], filter: ["blur(22px)", "blur(14px)", "blur(22px)"] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          >
            {g}
          </motion.p>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-[-20%] animate-veil bg-[linear-gradient(100deg,transparent_20%,rgb(82_215_237/0.22)_40%,rgb(255_255_255/0.18)_50%,rgb(245_130_32/0.14)_60%,transparent_80%)] mix-blend-screen" />
    </div>
  );
}
