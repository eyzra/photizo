"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { immersion } from "@/lib/content";
import { PhotoPlaceholder } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { spiritInfluence } from "@/lib/media";
import { ThemeVeil } from "./ThemeVeil";

const ease = [0.22, 1, 0.36, 1] as const;

/** Horizontal rail of IMMERSION editions, held and upcoming. */
export function ImmersionTimeline({ tone = "light" }: { tone?: "light" | "dark" }) {
  const rail = useRef<HTMLOListElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "center center"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dark = tone === "dark";

  const scrollBy = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 400;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={wrap} className="relative">
      <div className="container-x flex items-center justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous editions" className={`grid size-11 place-items-center rounded-full border transition-colors ${dark ? "border-white/20 text-white hover:bg-white hover:text-navy" : "border-navy/15 text-navy hover:bg-navy hover:text-white"}`}>
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next editions" className={`grid size-11 place-items-center rounded-full border transition-colors ${dark ? "border-white/20 text-white hover:bg-white hover:text-navy" : "border-navy/15 text-navy hover:bg-navy hover:text-white"}`}>
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="relative mt-8">
        {/* Connecting thread */}
        <svg className="pointer-events-none absolute left-0 top-[1.15rem] h-6 w-full" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
          <motion.path d="M0 12 C120 4 240 20 360 12 C480 4 600 20 720 12 C840 4 920 18 1000 12" fill="none" stroke={dark ? "rgb(255 255 255 / 0.3)" : "rgb(7 29 73 / 0.25)"} strokeWidth="1.5" style={{ pathLength: reduce ? 1 : line }} />
        </svg>

        <ol
          ref={rail}
          aria-label="IMMERSION editions"
          tabIndex={0}
          className="no-scrollbar relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-[clamp(1.25rem,4vw,3.5rem)] focus-visible:outline-offset-[-2px]"
        >
          {immersion.editions.map((e, i) => {
            const upcoming = e.status === "upcoming";
            return (
              <motion.li
                key={`${e.year}-${e.city}`}
                data-reveal
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="w-[82vw] max-w-[400px] shrink-0 snap-start sm:w-[400px]"
              >
                <div className="flex items-center gap-3">
                  <span className={`relative grid size-9 place-items-center rounded-full ${upcoming ? "bg-orange" : dark ? "bg-white" : "bg-navy"}`}>
                    <span className={`size-2 rounded-full ${upcoming ? "animate-ping bg-navy" : "bg-orange"}`} />
                  </span>
                  <span className={`font-display text-sm font-semibold tracking-[0.18em] ${dark ? "text-white/60" : "text-ink-2"}`}>
                    {upcoming ? "UPCOMING" : `EDITION 0${i + 1}`}
                  </span>
                </div>

                <article
                  className={`mt-6 flex h-[30rem] flex-col overflow-hidden rounded-[1.75rem] ${
                    upcoming ? "bg-navy text-white ring-1 ring-orange/40" : dark ? "bg-white/[0.05] text-white ring-1 ring-white/10" : "bg-white/80 text-navy ring-1 ring-navy/10 backdrop-blur"
                  }`}
                >
                  {upcoming ? (
                    <div className="relative flex-1 overflow-hidden bg-navy-900">
                      <div className="grain absolute inset-0 opacity-30" />
                      <div className="absolute -right-10 -top-10 size-56 rounded-full bg-cyan/25 blur-3xl" />
                      <ThemeVeil size="sm" className="absolute inset-x-6 top-1/2 -translate-y-1/2" />
                    </div>
                  ) : "image" in e && e.image ? (
                    <Photo photo={spiritInfluence.find((ph) => ph.src.includes(e.image))!} tone={dark ? "dark" : "light"} parallax={false} className="m-3 mb-0 flex-1" rounded="rounded-[1.4rem]" />
                  ) : (
                    <PhotoPlaceholder label={`IMMERSION ${e.city} ${e.year}`} tone={dark ? "dark" : "light"} className="m-3 mb-0 flex-1 !rounded-[1.4rem]" />
                  )}
                  <div className="p-6">
                    <div className={`flex items-center gap-2 font-display text-sm ${upcoming ? "text-white/70" : dark ? "text-white/60" : "text-ink-2"}`}>
                      <span className="font-semibold">{e.year}</span>
                      <span aria-hidden="true">/</span>
                      <MapPin className="size-3.5" aria-hidden="true" />
                      <span>{e.city}</span>
                    </div>
                    <h3 className="mt-2 font-display text-[1.75rem] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
                      {e.theme ?? (
                        <>
                          Theme to be <span className="text-orange">revealed</span>
                        </>
                      )}
                    </h3>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
