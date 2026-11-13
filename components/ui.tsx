import type { ReactNode } from "react";
import { Camera } from "lucide-react";
import { Constellation } from "./sketches";

/** Small uppercase label with an orange marker and optional index number. */
export function Eyebrow({ children, index, tone = "navy", className = "" }: { children: ReactNode; index?: string; tone?: "navy" | "light"; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-cyan" : "text-ink-2"} ${className}`}>
      <span className="inline-block size-1.5 rounded-full bg-orange" aria-hidden="true" />
      {index && <span className={tone === "light" ? "text-white/50" : "text-navy/40"}>{index}</span>}
      <span>{children}</span>
    </p>
  );
}

/** Clearly labelled slot for authentic photography that has not been supplied yet. */
export function PhotoPlaceholder({ label, className = "", tone = "light" }: { label: string; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <figure
      className={`relative isolate overflow-hidden rounded-[1.75rem] ${dark ? "bg-white/[0.04] text-white ring-1 ring-white/10" : "bg-pale text-navy ring-1 ring-navy/5"} ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "dot-field-light" : "dot-field"} opacity-70`} />
      <div className={`absolute -right-10 -top-10 size-60 rounded-full ${dark ? "bg-cyan/10" : "bg-cyan/25"} blur-2xl`} />
      <Constellation className={`absolute right-[6%] top-[10%] w-[46%] max-w-[240px] ${dark ? "text-white/40" : "text-navy/40"}`} />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5">
        <span className={`grid size-8 shrink-0 place-items-center rounded-full ${dark ? "bg-white/10" : "bg-white"}`}>
          <Camera className="size-4" aria-hidden="true" />
        </span>
        <span className={`font-display text-[0.78rem] leading-tight ${dark ? "text-white/70" : "text-ink-2"}`}>
          <span className="block font-semibold uppercase tracking-[0.16em]">Photo to come</span>
          {label}
        </span>
      </figcaption>
    </figure>
  );
}

/** Generic labelled placeholder for details that still need to be supplied. */
export function PendingNote({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 font-display text-[0.8rem] ${
        tone === "dark" ? "border-white/30 text-white/75" : "border-navy/25 text-ink-2"
      }`}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-orange" aria-hidden="true" />
      {children}
    </p>
  );
}
