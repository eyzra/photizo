"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { dna } from "@/lib/content";
import { Network, Ripple, SunBurst } from "@/components/sketches";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const art: ReactNode[] = [
  <SunBurst key="s" className="w-full text-navy/60" accent="orange" />,
  <Ripple key="r" className="w-full text-navy/60" accent="orange" />,
  <Network key="n" className="w-full text-navy/60" accent="orange" />,
];

export function DNA() {
  return (
    <section aria-labelledby="dna-heading" className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Our DNA</Eyebrow>
            <h2 id="dna-heading" className="sr-only">Illumination. Impact. Influence.</h2>
          </div>
          <Reveal>
            <p className="max-w-md font-serif text-lg italic leading-snug text-ink-2">
              These values describe the kind of people we are becoming and the difference we want to make.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="mt-12 md:mt-16">
        {dna.map((item, i) => (
          <DnaRow key={item.word} index={i} {...item} art={art[i]} />
        ))}
      </div>
      <div className="container-x mt-16">
        <Reveal>
          <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-navy">
            We are luminaries and <span className="relative inline-block">lightbearers<span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-orange" /></span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DnaRow({ word, line, body, index, art }: { word: string; line: string; body: string; index: number; art: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dir = index % 2 === 0 ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`${6 * dir}%`, `${-6 * dir}%`]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-12 * dir, 12 * dir]);

  return (
    <div ref={ref} className="group relative border-t border-navy/10 py-10 last:border-b md:py-14">
      <div className="container-x grid items-center gap-8 md:grid-cols-12">
        <div className="relative md:col-span-12">
          <motion.p
            aria-hidden="true"
            style={{ x }}
            className="whitespace-nowrap font-display text-[clamp(3.6rem,13vw,12rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em] text-navy transition-colors duration-700 group-hover:text-navy-800"
          >
            {word}
            <span className="text-orange">.</span>
          </motion.p>
        </div>
        <div className="relative md:col-span-5 md:col-start-8">
          <motion.div style={{ rotate }} className="absolute -right-2 -top-40 w-32 opacity-80 md:-left-40 md:right-auto md:-top-8 md:w-36">
            {art}
          </motion.div>
          <h3 className="relative font-display text-xl font-semibold tracking-[-0.01em] text-navy">
            <span className="sr-only">{word}: </span>
            {line}
          </h3>
          <p className="relative mt-3 leading-relaxed text-ink-2">{body}</p>
        </div>
      </div>
    </div>
  );
}
