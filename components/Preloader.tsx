"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_EVENT } from "@/lib/intro";
import { LogoMark } from "./Logo";

const LINES = [
  { text: "ARE YOU READY", accent: "" },
  { text: "COME AND SEE", accent: "JESUS" },
];
const GLYPHS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const STORAGE_KEY = "photizo-intro-seen";

/** Scrambles text into place, the way a corrupted video frame resolves. */
function useScramble(target: string, run: boolean, duration = 650) {
  const [out, setOut] = useState(target.replace(/\S/g, " "));
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * target.length);
      setOut(
        target
          .split("")
          .map((ch, i) => (ch === " " ? " " : i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return out;
}

function GlitchLine({ text, accent, reduce }: { text: string; accent: string; reduce: boolean }) {
  const main = useScramble(text, !reduce);
  const acc = useScramble(accent, !reduce && !!accent, 900);
  const shownMain = reduce ? text : main;
  const shownAcc = reduce ? accent : acc;
  return (
    <p className="font-display text-[clamp(2.8rem,13vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] text-white">
      <span className={reduce ? "" : "glitch"} data-text={shownMain}>
        {shownMain}
      </span>
      {accent && (
        <>
          <br />
          <span className={`text-orange ${reduce ? "" : "glitch glitch-strong"}`} data-text={shownAcc}>
            {shownAcc}
          </span>
        </>
      )}
    </p>
  );
}

/**
 * First-visit intro: "ARE YOU READY" then "COME AND SEE JESUS?" with a glitching video feel.
 * Plays once per browser session, can be skipped, and is hidden entirely without JavaScript.
 */
export function Preloader() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(false);
  const [line, setLine] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setLeaving(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(INTRO_EVENT));
    window.setTimeout(() => {
      document.documentElement.classList.remove("intro-active");
      setActive(false);
    }, 900);
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-active")) return;
    setActive(true);
    const step = reduce ? 1000 : 1350;
    timers.current = [window.setTimeout(() => setLine(1), step), window.setTimeout(finish, step * 2 + 200)];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish, reduce]);

  return (
    <div
      className="preloader fixed inset-0 z-[200] items-center justify-center overflow-hidden bg-navy-900 text-white"
      style={{
        clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1)",
      }}
      aria-hidden={!active}
    >
      {/* Video noise: grain, scanlines, a rolling bar and colour bleed */}
      <div className="grain pointer-events-none absolute inset-[-50%] opacity-30 [animation:noise-shift_0.4s_steps(4)_infinite]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.035)_0px,rgb(255_255_255/0.035)_1px,transparent_1px,transparent_3px)]" />
      {!reduce && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan/10 to-transparent [animation:roll-bar_2.6s_linear_infinite]" />}
      <div className="pointer-events-none absolute -left-40 top-1/4 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.24),transparent)]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(245_130_32/0.16),transparent)]" />

      <div className="container-x relative" role="status" aria-live="polite">
        <LogoMark className={`mb-10 h-12 w-auto text-white/80 ${reduce ? "" : "[animation:flicker_2.2s_steps(1)_infinite]"}`} />
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={line}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: 18, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <GlitchLine text={LINES[line].text} accent={LINES[line].accent} reduce={reduce} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-12 flex items-center gap-4">
          <span className="relative block h-[2px] w-40 overflow-hidden bg-white/15">
            {active && (
              <span
                className="absolute inset-y-0 left-0 bg-orange"
                style={{ width: "100%", transformOrigin: "left", animation: `intro-progress ${reduce ? 2.2 : 2.9}s linear forwards` }}
              />
            )}
          </span>
          <button
            type="button"
            onClick={finish}
            className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-white/60 hover:text-white"
          >
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
