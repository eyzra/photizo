"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Soft cyan light entering a white room from the left and right edges.
 * Layered radial gradients drift slowly (CSS) and shift a little with scroll.
 * Fixed behind all content, pointer-events disabled.
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -160]);
  const yRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 200]);
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 14]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white [&>div:not(.grain)]:max-md:opacity-60">
      {/* Left edge */}
      <motion.div style={{ y: yLeft, rotate: rot }} className="absolute -left-[22vw] top-[-12vh] h-[80vh] w-[48vw] min-w-[340px]">
        <div
          className="absolute inset-0 animate-drift-a rounded-[50%] opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 62% 48%, rgb(82 215 237 / 0.55), rgb(82 215 237 / 0.18) 46%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-[10%] top-[40%] h-[70%] w-[80%] animate-drift-c rounded-[50%] opacity-60"
          style={{
            background: "radial-gradient(50% 40% at 50% 50%, rgb(232 247 250 / 1), rgb(82 215 237 / 0.22) 55%, transparent 75%)",
            transform: "rotate(-24deg)",
          }}
        />
      </motion.div>
      <motion.div style={{ y: yLeft }} className="absolute -left-[16vw] bottom-[-26vh] h-[70vh] w-[40vw] min-w-[300px]">
        <div
          className="absolute inset-0 animate-drift-b rounded-[50%] opacity-55"
          style={{ background: "radial-gradient(55% 45% at 60% 45%, rgb(82 215 237 / 0.45), transparent 70%)", filter: "blur(22px)" }}
        />
      </motion.div>

      {/* Right edge */}
      <motion.div style={{ y: yRight, rotate: rot }} className="absolute -right-[24vw] top-[18vh] h-[90vh] w-[50vw] min-w-[340px]">
        <div
          className="absolute inset-0 animate-drift-b rounded-[50%] opacity-70"
          style={{
            background:
              "radial-gradient(58% 48% at 38% 52%, rgb(82 215 237 / 0.5), rgb(82 215 237 / 0.16) 50%, transparent 74%)",
          }}
        />
        <div
          className="absolute right-[18%] top-[6%] h-[50%] w-[70%] animate-drift-a rounded-[50%] opacity-50"
          style={{
            background: "radial-gradient(50% 40% at 50% 50%, rgb(255 255 255 / 0.9), rgb(82 215 237 / 0.25) 60%, transparent 78%)",
            transform: "rotate(28deg)",
          }}
        />
      </motion.div>

      {/* Grain keeps the gradients from banding and adds a paper feel */}
      <div className="grain absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
