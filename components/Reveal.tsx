"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Children, isValidElement, useRef, type ElementType, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/**
 * Heading whose words rise out of a mask one after another.
 * Pass plain strings and inline elements as children; strings are split into words.
 */
export function MaskedText({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
  id,
}: {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  const parts: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      child.split(/(\s+)/).forEach((w) => w && parts.push(w));
    } else if (isValidElement(child)) parts.push(child);
  });

  let wordIndex = 0;
  const animateProps =
    trigger === "view"
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: "show" };

  return (
    <Tag id={id} className={className}>
      <motion.span data-reveal className="block" initial={reduce ? false : "hide"} {...animateProps}>
        {parts.map((p, i) => {
          if (typeof p === "string" && /^\s+$/.test(p)) return <span key={i}> </span>;
          const idx = wordIndex++;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                data-reveal
                className="inline-block"
                variants={{ hide: { y: "108%" }, show: { y: "0%" } }}
                transition={{ duration: 1, ease, delay: delay + idx * stagger }}
              >
                {p}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/** Moves children vertically at a different rate to the page for depth. */
export function Parallax({ children, speed = 0.15, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed * 300, speed * -300]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
