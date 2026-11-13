"use client";

import { motion, useReducedMotion, type SVGMotionProps } from "motion/react";

type DrawProps = Omit<SVGMotionProps<SVGPathElement>, "initial" | "whileInView" | "animate"> & {
  d: string;
  delay?: number;
  duration?: number;
  /** Draw when scrolled into view (default) or immediately on mount. */
  trigger?: "view" | "mount";
};

/** An SVG path that draws itself like a pen stroke. */
export function Draw({ d, delay = 0, duration = 1.6, trigger = "view", strokeWidth = 1.4, ...rest }: DrawProps) {
  const reduce = useReducedMotion();
  const target = { pathLength: 1, opacity: 1 };
  const transition = {
    pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const },
    opacity: { delay, duration: 0.2 },
  };
  return (
    <motion.path
      data-draw
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      {...(trigger === "view"
        ? { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: target })}
      transition={transition}
      {...rest}
    />
  );
}
