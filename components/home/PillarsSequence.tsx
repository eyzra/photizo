"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { pillars } from "@/lib/content";
import { Halo, OpenBook, Pathway, SunBurst, Underline } from "@/components/sketches";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

const art: ReactNode[] = [
  <OpenBook key="b" className="w-full text-navy/70" />,
  <Pathway key="p" className="h-full max-h-[300px] text-navy/70" />,
  <Halo key="h" className="w-full text-navy/50" rings={4} />,
  <SunBurst key="s" className="w-full text-white/40" accent="orange" />,
];

function Heading({ size = "display-lg" }: { size?: string }) {
  return (
    <>
      <Eyebrow>Our Four Pillars</Eyebrow>
      <MaskedText as="h2" className={`${size} mt-6 text-navy`}>
        What We Are Building Our{" "}
        <span className="relative inline-block">
          Lives
          <Underline className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full" />
        </span>{" "}
        On.
      </MaskedText>
    </>
  );
}

export function PillarsSequence() {
  return (
    <section aria-label="Our Four Pillars" id="pillars" className="relative">
      <DesktopTrack />
      <MobileStack />
    </section>
  );
}

function DesktopTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(p, [0.04, 0.96], [0, -distance]);
  const bar = useTransform(p, [0.04, 0.96], ["0%", "100%"]);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={ref} className="relative hidden h-[420vh] md:block" style={{ height: reduce ? "auto" : undefined }}>
      <div className={reduce ? "py-20" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"}>
        <motion.div ref={track} style={reduce ? undefined : { x }} className={`flex items-stretch gap-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-[8vw] ${reduce ? "flex-wrap" : "w-max"}`}>
          <div className="flex w-[38vw] max-w-[620px] shrink-0 flex-col justify-center pr-6">
            <Heading size="display-md" />
            <p className="editorial mt-8 max-w-md text-ink-2">
              These four commitments shape the way we teach and the way we grow together. Keep scrolling to walk through each one.
            </p>
          </div>
          {pillars.map((pillar, i) => {
            const dark = i === 3;
            return (
              <article
                key={pillar.no}
                className={`relative flex h-[72vh] max-h-[680px] min-h-[480px] w-[min(58vw,760px)] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-10 lg:p-12 ${
                  dark ? "bg-navy text-white" : i === 1 ? "bg-pale/80 text-navy ring-1 ring-navy/5" : "bg-white/70 text-navy ring-1 ring-navy/10"
                }`}
              >
                {dark && <div className="grain pointer-events-none absolute inset-0 opacity-25" />}
                {dark && <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.32),transparent)]" />}
                <div className="relative flex items-start justify-between gap-6">
                  <span
                    className={`font-display text-[clamp(5rem,9vw,9rem)] font-bold leading-none tracking-[-0.06em] ${dark ? "text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.5)]" : "text-transparent [-webkit-text-stroke:1.5px_rgb(7_29_73/0.35)]"}`}
                    aria-hidden="true"
                  >
                    {pillar.no}
                  </span>
                  <div className="flex w-[48%] max-w-[340px] items-start justify-end">{art[i]}</div>
                </div>
                <div className="relative">
                  <p className={`eyebrow ${dark ? "text-orange" : "text-ink-2"}`}>Pillar {pillar.no}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">{pillar.title}</h3>
                  <p className={`mt-5 max-w-xl font-serif text-[1.25rem] italic leading-snug ${dark ? "text-white/90" : "text-navy"}`}>{pillar.line}</p>
                  <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${dark ? "text-white/70" : "text-ink-2"}`}>{pillar.body}</p>
                </div>
              </article>
            );
          })}
        </motion.div>
        {!reduce && (
          <div className="container-x mt-10 flex items-center gap-4">
            <span className="eyebrow text-ink-2">Scroll</span>
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-navy/10">
              <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 rounded-full bg-navy" />
            </div>
            <span className="eyebrow text-ink-2">04 Pillars</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileStack() {
  return (
    <div className="container-x py-24 md:hidden">
      <Heading />
      <ol className="mt-14 space-y-5">
        {pillars.map((pillar, i) => (
          <Reveal as="li" key={pillar.no} delay={0.05}>
            <article className={`relative overflow-hidden rounded-[1.75rem] p-7 ${i === 3 ? "bg-navy text-white" : "bg-white/80 text-navy ring-1 ring-navy/10"}`}>
              <div className="flex items-start justify-between">
                <span className={`font-display text-6xl font-bold tracking-[-0.06em] text-transparent ${i === 3 ? "[-webkit-text-stroke:1.2px_rgb(255_255_255/0.55)]" : "[-webkit-text-stroke:1.2px_rgb(7_29_73/0.4)]"}`} aria-hidden="true">
                  {pillar.no}
                </span>
                <div className="flex w-28 justify-end">{art[i]}</div>
              </div>
              <h3 className="mt-6 font-display text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.04em]">{pillar.title}</h3>
              <p className={`mt-4 font-serif text-lg italic leading-snug ${i === 3 ? "text-white/90" : ""}`}>{pillar.line}</p>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${i === 3 ? "text-white/70" : "text-ink-2"}`}>{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
