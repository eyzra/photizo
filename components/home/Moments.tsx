"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { asset, gatherings, onStage, spiritInfluence, type Photo } from "@/lib/media";
import { MaskedText } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Arrow } from "@/components/sketches";

const rowA: Photo[] = [spiritInfluence[0], gatherings.stage3, spiritInfluence[1], gatherings.ff1, gatherings.speaker1, spiritInfluence[2], gatherings.ff2, onStage, gatherings.stage2];
const rowB: Photo[] = [gatherings.stage1, spiritInfluence[7], gatherings.ff3, gatherings.hall, gatherings.speaker3, spiritInfluence[6], gatherings.stage4, gatherings.speaker2, spiritInfluence[3]];

/** Two rows of photographs that slide past each other as the visitor scrolls. */
export function Moments() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["2%", "-22%"]);
  const xB = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["-24%", "0%"]);

  return (
    <section ref={ref} aria-labelledby="moments-heading" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Eyebrow>In the Room</Eyebrow>
          <MaskedText as="h2" id="moments-heading" className="display-lg mt-6 max-w-4xl text-navy">
            Gathered around the Word.
          </MaskedText>
        </div>
        <div className="flex items-end gap-3">
          <p className="max-w-xs pb-1 font-serif text-lg italic leading-snug text-ink-2">Teaching, prayer and worship from our gatherings.</p>
          <Arrow variant="down" className="hidden h-24 text-navy/50 md:block" accent="orange" />
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">
        <Row photos={rowA} x={xA} />
        <Row photos={rowB} x={xB} />
      </div>
    </section>
  );
}

function Row({ photos, x }: { photos: Photo[]; x: MotionValue<string> }) {
  return (
    <motion.ul style={{ x }} className="flex w-max gap-4 md:gap-5" role="list">
      {photos.map((ph) => (
        <li key={ph.src} className="group relative h-[13rem] shrink-0 overflow-hidden rounded-[1.5rem] bg-pale md:h-[20rem]" style={{ aspectRatio: `${ph.w} / ${ph.h}` }}>
          <img
            src={asset(ph.src)}
            alt={ph.alt}
            width={ph.w}
            height={ph.h}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-700 group-hover:bg-navy/10" />
        </li>
      ))}
    </motion.ul>
  );
}
