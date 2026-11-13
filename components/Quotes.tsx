"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { essenceOfDevotion } from "@/lib/content";
import { Eyebrow } from "./ui";
import { TextLink } from "./Button";

/** Rotating quotations from Ezra Anya's ILLUMINATE teaching, The Essence of Devotion. */
export function Quotes({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const quotes = essenceOfDevotion.quotes;
  const dark = tone === "dark";

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, [reduce, paused, quotes.length]);

  return (
    <section
      aria-labelledby="quotes-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`relative overflow-hidden py-28 md:py-36 ${dark ? "bg-navy text-white" : "text-navy"}`}
    >
      {dark && <div className="grain pointer-events-none absolute inset-0 opacity-25" />}
      {dark && <div className="pointer-events-none absolute -left-32 top-0 size-[32rem] rounded-full bg-cyan/15 blur-3xl" />}
      <span aria-hidden="true" className={`pointer-events-none absolute -top-16 right-[4%] font-serif text-[22rem] leading-none ${dark ? "text-white/[0.04]" : "text-navy/[0.05]"}`}>
        &ldquo;
      </span>
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone={dark ? "light" : "navy"}>From ILLUMINATE</Eyebrow>
            <h2 id="quotes-heading" className="mt-4 font-display text-xl font-semibold tracking-[-0.01em]">
              {essenceOfDevotion.title}
            </h2>
          </div>
          <TextLink href={`/teachings/${essenceOfDevotion.slug}/`} tone={dark ? "white" : "navy"}>Read the teaching</TextLink>
        </div>

        <figure className="mt-12 min-h-[18rem] md:min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-serif text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.25]"
              aria-live="polite"
            >
              &ldquo;{quotes[i]}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <figcaption className={`mt-8 font-display text-sm font-semibold uppercase tracking-[0.2em] ${dark ? "text-orange" : "text-ink-2"}`}>Ezra Anya</figcaption>
        </figure>

        <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Choose a quote">
          {quotes.map((q, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Quote ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? `w-12 ${dark ? "bg-orange" : "bg-navy"}` : `w-5 ${dark ? "bg-white/25 hover:bg-white/50" : "bg-navy/20 hover:bg-navy/40"}`}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
