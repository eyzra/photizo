"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Orbits, Radiance } from "@/components/sketches";
import { asset, spiritInfluence } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

/** Full-screen navy opening for the IMMERSION page. */
export function ImmersionHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section ref={ref} aria-labelledby="immersion-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy pb-16 pt-32 text-white md:pb-24">
      <motion.div style={{ scale }} aria-hidden="true" className="pointer-events-none absolute inset-0 origin-center">
        <img src={asset(spiritInfluence[2].src)} alt="" fetchPriority="high" className="size-full object-cover opacity-30 mix-blend-luminosity" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(7_29_73/0.55)_0%,rgb(7_29_73/0.75)_55%,rgb(7_29_73/0.97)_100%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="dot-field-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-[20%] top-[-10%] size-[60vmax] animate-drift-a rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.32),transparent)]" />
      <div className="pointer-events-none absolute -right-[20%] bottom-[-20%] size-[55vmax] animate-drift-b rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.22),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-[38%] size-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(245_130_32/0.18),transparent)]" />

      <motion.div style={{ rotate: artRotate }} className="pointer-events-none absolute left-1/2 top-[40%] w-[120vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 text-white/20">
        <Orbits className="w-full" delay={0.4} />
      </motion.div>
      <Radiance className="pointer-events-none absolute left-1/2 top-[40%] w-[70vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 text-white/15" delay={0.8} />

      {/* Water lines */}
      <svg aria-hidden="true" viewBox="0 0 1440 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-cyan/30">
        {[40, 80, 120, 160].map((yy, i) => (
          <motion.path
            key={yy}
            d={`M0 ${yy} C 180 ${yy - 20} 360 ${yy + 20} 540 ${yy} S 900 ${yy - 20} 1080 ${yy} S 1300 ${yy + 16} 1440 ${yy}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.6 + i * 0.2, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
      </svg>

      <motion.div style={{ y, opacity: fade }} className="container-x relative w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="eyebrow flex items-center gap-3 text-cyan"
        >
          <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
          The Annual Camp Meeting of Photizo Global
        </motion.p>
        <motion.h1 id="immersion-title" style={{ scale }} className="mt-6 origin-bottom-left font-display text-[clamp(3.6rem,16.4vw,17rem)] font-bold leading-[0.8] tracking-[-0.075em]">
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block" initial={reduce ? false : { y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1.3, delay: 0.3, ease }}>
              IMMERSION<span className="text-orange">.</span>
            </motion.span>
          </span>
        </motion.h1>
        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
            className="font-display text-[clamp(2rem,5vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]"
          >
            Immersed <span className="text-orange">to rise.</span>
          </motion.p>
          <motion.a
            href="#about-immersion"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="group inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            Discover the camp
            <span className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-orange group-hover:bg-orange group-hover:text-navy">
              <ChevronDown className="size-4 animate-float" aria-hidden="true" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
