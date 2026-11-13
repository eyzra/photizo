"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset, type Photo } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

/** Editorial photo grid with an accessible full-screen viewer. */
export function Gallery({ photos, label }: { photos: Photo[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, go, close]);

  // Layout rhythm: a large tile, then smaller ones
  const span = (i: number) => (i % 9 === 0 ? "col-span-2 row-span-2" : "");

  return (
    <>
      <ul className="grid grid-flow-row-dense auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4" aria-label={label}>
        {photos.map((ph, i) => (
          <motion.li
            key={ph.src}
            data-reveal
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease }}
            className={span(i)}
          >
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block size-full overflow-hidden rounded-[1.5rem] bg-pale"
              aria-label={`View larger: ${ph.alt}`}
            >
              <img src={asset(ph.src)} alt={ph.alt} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105" />
              <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/25" />
              <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" aria-hidden="true" />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${label}: photo ${open + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex flex-col bg-navy-900/95 p-4 text-white backdrop-blur md:p-8"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-sm tracking-[0.18em] text-white/70">
                {String(open + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </p>
              <button ref={closeBtn} type="button" onClick={close} aria-label="Close viewer" className="grid size-11 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-navy">
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={open}
                  src={asset(photos[open].src)}
                  alt={photos[open].alt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                  className="max-h-full max-w-full rounded-2xl object-contain"
                />
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-navy">
                <ChevronLeft className="size-5" />
              </button>
              <p className="max-w-xl text-center font-serif text-sm italic text-white/75">{photos[open].alt}</p>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-navy">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
