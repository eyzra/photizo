"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { purpose } from "@/lib/content";
import { Halo, Radiance, Arrow, Constellation } from "@/components/sketches";
import { Button } from "@/components/Button";
import { useIntroDone } from "@/lib/intro";
import { asset, heroPhoto, srcSetFor } from "@/lib/media";
import { markBook, markRays, markViewBox } from "@/lib/brand-mark";
import { joinCommunityHref } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The cinematic opening. A tall section with a sticky stage:
 *   01  THE ILLUMINATION CHURCH
 *   02  TILL ALL MEN SEE JESUS.
 *   03  We exist to help people see Jesus clearly.
 */
export function HeroSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const [stage, setStage] = useState(0);
  const introDone = useIntroDone();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(v < 0.27 ? 0 : v < 0.6 ? 1 : 2);
  });

  /* Moment 1 */
  const m1Opacity = useTransform(p, [0, 0.2, 0.3], [1, 1, 0]);
  const m1Scale = useTransform(p, [0, 0.3], [1, reduce ? 1 : 0.9]);
  const m1Y = useTransform(p, [0, 0.3], ["0vh", reduce ? "0vh" : "-8vh"]);
  const m1BlurV = useTransform(p, [0.16, 0.3], [0, reduce ? 0 : 14]);
  const m1Blur = useMotionTemplate`blur(${m1BlurV}px)`;
  const photoY = useTransform(p, [0, 0.3], ["0%", reduce ? "0%" : "6%"]);
  const photoScale = useTransform(p, [0, 0.3], [1.04, reduce ? 1.04 : 1.12]);

  /* Moment 2 */
  const m2Opacity = useTransform(p, [0.26, 0.32, 0.56, 0.64], [0, 1, 1, 0]);
  const line1 = useTransform(p, [0.27, 0.37], ["105%", "0%"]);
  const line2 = useTransform(p, [0.32, 0.43], ["105%", "0%"]);
  const underline = useTransform(p, [0.42, 0.52], [0, 1]);
  const sunScale = useTransform(p, [0.3, 0.5], [0.6, 1]);
  const m2Y = useTransform(p, [0.56, 0.64], ["0vh", reduce ? "0vh" : "-6vh"]);

  /* Moment 3 */
  const m3Opacity = useTransform(p, [0.6, 0.68], [0, 1]);
  const m3Y = useTransform(p, [0.6, 0.7], [reduce ? "0vh" : "6vh", "0vh"]);

  /* Glow that follows the story */
  const glowX = useTransform(p, [0, 0.45, 1], ["50%", "56%", "70%"]);
  const glowScale = useTransform(p, [0, 0.45, 1], [1, 1.25, 0.9]);

  const words = purpose.body.split(" ");

  return (
    <section ref={ref} aria-label="Introduction" data-hero className="relative h-[400svh] md:h-[460vh]">
      <div data-hero-stage className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Central cyan light */}
        <motion.div
          aria-hidden="true"
          style={{ left: glowX, scale: glowScale }}
          className="pointer-events-none absolute top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        >
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.35),rgb(232_247_250/0.4)_45%,transparent_72%)]" />
        </motion.div>
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]" />

        {/* ---------- 01 ---------- */}
        <motion.div
          style={{ opacity: m1Opacity, scale: m1Scale, y: m1Y }}
          data-hero-moment className="absolute inset-0 flex flex-col justify-center pb-16 pt-24 md:pt-28"
         
        >
          {/* Faint photograph of Ezra Anya preaching, behind the title */}
          <motion.div
            aria-hidden="true"
            style={{ y: photoY, scale: photoScale }}
            className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[60%]"
          >
            <img
              src={asset(heroPhoto.src)}
              srcSet={srcSetFor(heroPhoto)}
              sizes="(min-width: 768px) 60vw, 100vw"
              alt=""
              fetchPriority="high"
              className="size-full object-cover object-[50%_18%] opacity-[0.2] grayscale contrast-150 brightness-110 [mask-image:radial-gradient(45%_70%_at_50%_42%,black_30%,transparent_80%)] max-md:object-[48%_12%] max-md:opacity-[0.16] max-md:[mask-image:radial-gradient(75%_50%_at_50%_38%,black_20%,transparent_82%)]"
            />
          </motion.div>
          {introDone && <Halo className="pointer-events-none absolute left-1/2 top-1/2 w-[min(88vw,760px)] -translate-x-1/2 -translate-y-[54%] text-navy/15" accent="cyan" />}
          {introDone && <Constellation className="pointer-events-none absolute right-[5%] top-[14%] hidden w-56 text-navy/50 md:block" delay={1.4} />}
          <div className="container-x relative">
            <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.06em] text-navy text-[clamp(2.4rem,min(14.6vw,19svh),15.5rem)]">
              {["The", "Illumination", "Church"].map((w, i) => (
                <span key={w} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${i === 1 ? "relative" : ""} ${i === 2 ? "md:pl-[18%]" : ""}`}
                    initial={reduce ? false : { y: "105%" }}
                    animate={introDone ? { y: "0%" } : { y: "105%" }}
                    transition={{ duration: 1.2, delay: 0.35 + i * 0.16, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </motion.div>

        {/* ---------- 02 ---------- */}
        <motion.div style={{ opacity: m2Opacity, y: m2Y }} data-hero-moment className="absolute inset-0 flex items-center pt-20">
          <motion.div
            style={{ scale: sunScale }}
            className="pointer-events-none absolute right-[-22vw] top-1/2 w-[78vw] max-w-[820px] -translate-y-1/2 md:right-[-4vw] md:w-[50vw]"
          >
            <RisingMark progress={p} />
          </motion.div>
          <div className="container-x relative">
            <p className="eyebrow mb-6 flex items-center gap-3 text-ink-2 md:mb-8">
              <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
              Our Mandate
            </p>
            <h2 className="font-display font-bold uppercase leading-[0.86] tracking-[-0.06em] text-navy text-[clamp(3rem,min(13vw,17svh),13rem)]">
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span style={{ y: line1 }} className="block">Till all men</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.16em]">
                <motion.span style={{ y: line2 }} className="block">
                  See{" "}
                  <span className="relative inline-block">
                    Jesus
                    <UnderlineStroke progress={underline} />
                  </span>
                  <span className="text-orange">.</span>
                </motion.span>
              </span>
            </h2>
          </div>
        </motion.div>

        {/* ---------- 03 ---------- */}
        <motion.div style={{ opacity: m3Opacity, y: m3Y }} data-hero-moment className="absolute inset-0 flex items-center pt-20">
          <div className="container-x relative grid items-center gap-10 pt-16 md:grid-cols-12 md:gap-8 md:pt-0">
            <div className="relative md:col-span-7">
              <p className="eyebrow mb-6 flex items-center gap-3 text-ink-2">
                <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
                Why we exist
              </p>
              <h2 className="display-lg text-navy">
                We exist to help people{" "}
                <span className="relative whitespace-nowrap">
                  see Jesus
                  <span className="absolute bottom-[0.14em] left-0 h-[0.1em] w-full">
                    {stage === 2 && <ArrowlessUnderline />}
                  </span>
                </span>{" "}
                clearly.
              </h2>
              {stage === 2 && (
                <Arrow variant="loop" className="absolute -bottom-20 right-[6%] hidden w-40 text-navy/70 md:block" accent="orange" delay={0.5} />
              )}
            </div>
            <div className="relative md:col-span-5">
              <div className="pointer-events-none absolute -right-24 -top-36 w-[420px] text-navy/15 max-md:hidden">
                {stage === 2 && <Radiance className="w-full" />}
              </div>
              <ScrollWords words={words} progress={p} />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about/" variant="dark">Get to know us</Button>
                <Button href={joinCommunityHref} variant="outline">Join the Community</Button>
              </div>
            </div>
          </div>
        </motion.div>

        <ScrollIndicator progress={scrollYProgress} stage={stage} />
      </div>
    </section>
  );
}

/** The brand mark assembling itself: the book settles, then each ray rises in turn. */
function RisingMark({ progress }: { progress: MotionValue<number> }) {
  const bookOpacity = useTransform(progress, [0.27, 0.36], [0, 1]);
  const bookY = useTransform(progress, [0.27, 0.38], [24, 0]);
  return (
    <svg viewBox={markViewBox} className="w-full overflow-visible" aria-hidden="true" focusable="false">
      <g>
        {markRays.map((d, i) => (
          <Ray key={i} d={d} index={i} progress={progress} />
        ))}
      </g>
      <motion.path d={markBook} fill="var(--color-navy)" fillOpacity={0.05} fillRule="evenodd" style={{ opacity: bookOpacity, y: bookY }} />
    </svg>
  );
}
function Ray({ d, index, progress }: { d: string; index: number; progress: MotionValue<number> }) {
  // rays rise from the centre outward
  const order = Math.abs(index - 4);
  const start = 0.33 + order * 0.025;
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const y = useTransform(progress, [start, start + 0.06], [40, 0]);
  return <motion.path d={d} fill="var(--color-orange)" fillOpacity={0.28} style={{ opacity, y }} />;
}

function UnderlineStroke({ progress }: { progress: MotionValue<number> }) {
  const offset = useTransform(progress, [0, 1], [1, 0]);
  const opacity = useTransform(progress, [0, 0.02], [0, 1]);
  return (
    <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="pointer-events-none absolute bottom-[0.02em] left-[-2%] h-[0.2em] w-[104%] text-orange" aria-hidden="true">
      <motion.path d="M4 18 C70 6 170 4 296 12" pathLength={1} strokeDasharray="1 1" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" style={{ strokeDashoffset: offset, opacity }} />
      <motion.path d="M40 26 C120 18 210 18 270 22" pathLength={1} strokeDasharray="1 1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ strokeDashoffset: offset, opacity }} />
    </svg>
  );
}

function ArrowlessUnderline() {
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="size-full text-orange" aria-hidden="true">
      <motion.path
        d="M4 12 C80 4 180 4 296 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Body copy whose words brighten as the reader scrolls. */
function ScrollWords({ words, progress }: { words: string[]; progress: MotionValue<number> }) {
  return (
    <p className="font-serif text-[1.15rem] leading-[1.65] text-navy md:text-[1.32rem]">
      {words.map((w, i) => (
        <Word key={i} progress={progress} start={0.66 + (i / words.length) * 0.24} word={w} />
      ))}
    </p>
  );
}
function Word({ progress, start, word }: { progress: MotionValue<number>; start: number; word: string }) {
  const opacity = useTransform(progress, [start, start + 0.025], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function ScrollIndicator({ progress, stage }: { progress: MotionValue<number>; stage: number }) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const fade = useTransform(progress, [0.9, 1], [1, 0]);
  const labels = ["The Church", "The Mandate", "The Purpose"];
  return (
    <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="container-x flex items-end justify-between pb-6 md:pb-8">
        <div className="flex items-center gap-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-2">
          <span className="relative block h-12 w-px overflow-hidden bg-navy/15">
            <motion.span className="absolute inset-x-0 top-0 block h-1/3 bg-orange" animate={{ y: ["-100%", "300%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
          </span>
          Scroll
        </div>
        <ol className="flex items-end gap-5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em]" aria-label="Introduction progress">
          {labels.map((l, i) => (
            <li key={l} aria-current={stage === i ? "step" : undefined} className={`flex items-center gap-2 transition-colors duration-500 ${stage === i ? "text-navy" : "text-navy/35"}`}>
              <span>0{i + 1}</span>
              <span className="hidden sm:inline">{l}</span>
            </li>
          ))}
          <li aria-hidden="true" className="relative ml-1 h-12 w-[3px] overflow-hidden rounded-full bg-navy/10">
            <motion.span style={{ height }} className="absolute inset-x-0 top-0 block rounded-full bg-navy" />
          </li>
        </ol>
      </div>
    </motion.div>
  );
}
