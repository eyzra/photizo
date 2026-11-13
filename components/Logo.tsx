import type { CSSProperties } from "react";
import { asset } from "@/lib/media";
import { markBook, markRays, markViewBox } from "@/lib/brand-mark";

/**
 * Official Photizo Global logo files live in /public/brand as SVG.
 * They render through a CSS mask, so each one takes the colour of the text around it
 * (navy on light sections, white on dark ones) from a single file.
 */
const variants = {
  horizontal: { file: "photizo-horizontal.svg", ratio: 882 / 237 },
  stacked: { file: "photizo-stacked.svg", ratio: 617 / 609 },
  badge: { file: "photizo-badge.svg", ratio: 380 / 440 },
  mark: { file: "photizo-mark.svg", ratio: 207 / 235 },
  arch: { file: "photizo-arch.svg", ratio: 367 / 389 },
} as const;

export type BrandVariant = keyof typeof variants;

export function BrandLogo({
  variant = "horizontal",
  className = "",
  label = "Photizo Global",
  decorative = false,
  style,
}: {
  variant?: BrandVariant;
  className?: string;
  label?: string;
  decorative?: boolean;
  style?: CSSProperties;
}) {
  const v = variants[variant];
  const url = `url("${asset(`/brand/${v.file}`)}")`;
  return (
    <span
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: String(v.ratio),
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}

/** Wordmark used in the navigation and footer. */
export function Logo({ tone = "navy", className = "h-9 md:h-10" }: { tone?: "navy" | "white"; className?: string }) {
  return (
    <span className={`flex items-center transition-colors duration-500 ${tone === "white" ? "text-white" : "text-navy"}`}>
      <BrandLogo variant="horizontal" className={className} />
    </span>
  );
}

/** The mark as inline SVG, split into rays and book so it can be animated or tinted. */
export function LogoMark({ className, raysClassName, bookClassName }: { className?: string; raysClassName?: string; bookClassName?: string }) {
  return (
    <svg viewBox={markViewBox} className={className} aria-hidden="true" focusable="false">
      <g className={raysClassName} fill="currentColor">
        {markRays.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path className={bookClassName} d={markBook} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
