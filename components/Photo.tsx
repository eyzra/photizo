"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { asset, srcSetFor, type Photo as PhotoType } from "@/lib/media";

/**
 * Photograph that unveils with a clip mask on entry and drifts gently inside its frame on scroll.
 * The frame keeps its aspect ratio, so nothing shifts while images load.
 */
export function Photo({
  photo,
  className = "",
  imgClassName = "",
  caption,
  parallax = true,
  priority = false,
  rounded = "rounded-[1.75rem]",
  tone = "light",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  sizes?: string;
  photo: PhotoType;
  className?: string;
  imgClassName?: string;
  caption?: string;
  parallax?: boolean;
  priority?: boolean;
  rounded?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce || !parallax ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.figure
      ref={ref}
      data-reveal
      initial={reduce ? false : { clipPath: "inset(12% 8% 12% 8% round 1.75rem)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0rem)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate overflow-hidden ${rounded} ${tone === "dark" ? "bg-navy-800" : "bg-pale"} ${className}`}
    >
      <motion.img
        src={asset(photo.src)}
        srcSet={srcSetFor(photo)}
        sizes={sizes}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ y }}
        className={`absolute left-0 top-[-6%] h-[112%] w-full object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.04] ${imgClassName}`}
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5 pt-14 font-display text-[0.8rem] font-medium tracking-[0.04em] text-white">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
