"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode, PointerEvent } from "react";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-orange text-navy hover:bg-[#ff9338]",
  dark: "bg-navy text-white hover:bg-navy-800",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-pale",
  "ghost-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode | false;
  className?: string;
  size?: "md" | "lg";
  external?: boolean;
};

/** Pill button that leans gently toward the pointer. */
export function Button({ href, children, variant = "primary", icon, className = "", size = "md", external }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const cls = `group/btn relative inline-flex items-center gap-2.5 rounded-full font-display font-semibold tracking-[-0.01em] transition-colors duration-300 ${
    size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-[0.95rem]"
  } ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {icon !== false && (
        <span className="relative grid size-5 place-items-center overflow-hidden" aria-hidden="true">
          {icon ?? (
            <>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-soft group-hover/btn:-translate-y-5 group-hover/btn:translate-x-5" />
              <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-soft group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block" onPointerMove={onMove} onPointerLeave={onLeave}>
      {isExternal ? (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}

/** Understated text link with an animated underline. */
export function TextLink({ href, children, className = "", tone = "navy" }: { href: string; children: ReactNode; className?: string; tone?: "navy" | "white" }) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `group/link inline-flex items-center gap-1.5 font-display font-semibold ${tone === "white" ? "text-white" : "text-navy"} ${className}`;
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-30 bg-orange transition-transform duration-500 ease-out-soft group-hover/link:scale-x-100" />
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
    </>
  );
  return isExternal ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
