"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { asset, globeVideo } from "@/lib/media";
import { MaskedText, Reveal } from "./Reveal";
import { Eyebrow } from "./ui";

/** Full-bleed band with the globe film behind the mandate to the nations. */
export function NationsVideo() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = asset(globeVideo.src);
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={ref} aria-labelledby="nations-heading" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-900 text-white">
      <motion.div style={{ scale, y }} className="absolute inset-0 -z-10">
        <video
          ref={video}
          className="size-full object-cover opacity-75"
          poster={asset(globeVideo.poster)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(4_18_47/0.95)_0%,rgb(4_18_47/0.7)_45%,rgb(4_18_47/0.15)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-900 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-20" />

      <div className="container-x py-20">
        <Eyebrow tone="light">To the Nations</Eyebrow>
        <MaskedText as="h2" id="nations-heading" className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          To hearts, homes, campuses, communities and <span className="text-orange">nations.</span>
        </MaskedText>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl font-serif text-xl italic leading-relaxed text-white/85">
            In every heart and every home, Jesus revealed and Jesus glorified.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
