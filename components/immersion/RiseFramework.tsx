"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { immersion } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The four RISE letters. On large screens the active letter expands to show its
 * meaning; on small screens each letter is a stacked panel.
 */
export function RiseFramework({ detailed = false }: { detailed?: boolean }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div>
      {/* Large screens: expanding columns */}
      <div className="hidden h-[34rem] gap-3 lg:flex" role="tablist" aria-label="The RISE Experience">
        {immersion.rise.map((r, i) => {
          const on = active === i;
          return (
            <motion.div
              key={r.letter}
              layout={!reduce}
              transition={{ duration: 0.7, ease }}
              onMouseEnter={() => setActive(i)}
              className={`relative flex min-w-0 cursor-default flex-col overflow-hidden rounded-[1.75rem] ring-1 transition-colors duration-500 ${
                on ? "flex-[3.2] bg-white/[0.07] ring-white/20" : "flex-1 bg-white/[0.02] ring-white/10"
              }`}
            >
              <button
                role="tab"
                aria-selected={on}
                aria-controls={`rise-panel-${i}`}
                id={`rise-tab-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex items-start justify-between p-8 text-left"
              >
                <span
                  className={`font-display text-[9rem] font-bold leading-[0.8] tracking-[-0.06em] transition-colors duration-500 ${
                    on ? "text-orange" : "text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.45)]"
                  }`}
                >
                  {r.letter}
                </span>
                <span className="mt-2 font-display text-xs font-semibold tracking-[0.2em] text-white/50">0{i + 1}</span>
              </button>
              <div className="mt-auto p-8 pt-0">
                <p className={`font-display font-bold uppercase tracking-[-0.03em] text-white transition-all duration-500 ${on ? "text-3xl" : "text-base [writing-mode:vertical-rl] rotate-180"}`}>
                  {r.word}
                </p>
                <motion.div
                  id={`rise-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`rise-tab-${i}`}
                  hidden={!on}
                  initial={false}
                  animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: on ? 0.25 : 0, ease }}
                  className="max-w-md"
                >
                  <p className="mt-3 font-serif text-lg italic text-white/90">{r.line}</p>
                  {(detailed ? r.paragraphs : r.paragraphs.slice(0, 1)).map((p, j) => (
                    <p key={j} className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{p}</p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Small screens */}
      <ol className="space-y-3 lg:hidden">
        {immersion.rise.map((r, i) => (
          <motion.li
            key={r.letter}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease }}
            data-reveal
            className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.05] p-6 ring-1 ring-white/10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-7xl font-bold leading-none tracking-[-0.06em] text-orange">{r.letter}</span>
              <span className="font-display text-2xl font-bold uppercase tracking-[-0.03em] text-white">{r.word}</span>
            </div>
            <p className="mt-4 font-serif text-lg italic text-white/90">{r.line}</p>
            {(detailed ? r.paragraphs : r.paragraphs.slice(0, 1)).map((p, j) => (
              <p key={j} className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{p}</p>
            ))}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
