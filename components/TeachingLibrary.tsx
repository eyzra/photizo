"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BookOpen, Download, FileText, Headphones, Search, Video, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, formats, teachings, type Category, type Format } from "@/lib/teachings";

const formatIcon: Record<Format, typeof BookOpen> = {
  Sermon: BookOpen,
  Article: FileText,
  Audio: Headphones,
  Video: Video,
  "Study Resource": Download,
};

export function TeachingLibrary() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const initialCat = params.get("category");
  const [category, setCategory] = useState<Category | "All">(
    initialCat && (categories as readonly string[]).includes(initialCat) ? (initialCat as Category) : "All",
  );
  const [format, setFormat] = useState<Format | "All">("All");
  const [query, setQuery] = useState("");

  const pickCategory = (c: Category | "All") => {
    setCategory(c);
    const url = c === "All" ? pathname : `${pathname}?category=${encodeURIComponent(c)}`;
    router.replace(url, { scroll: false });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teachings.filter(
      (t) =>
        (category === "All" || t.category === category) &&
        (format === "All" || t.format === format) &&
        (!q || [t.title, t.summary, t.category, t.format, t.speaker, t.scripture].join(" ").toLowerCase().includes(q)),
    );
  }, [category, format, query]);

  const hasSamples = teachings.some((t) => t.sample);

  return (
    <div>
      {hasSamples && (
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-dashed border-navy/25 bg-pale/60 p-5 font-display text-sm text-ink-2">
          <span className="mt-1 size-2 shrink-0 animate-pulse rounded-full bg-orange" aria-hidden="true" />
          <p>
            <strong className="text-navy">The library is being prepared.</strong> The entries below are samples that show how sermons, articles, audio, video and study resources will appear once they are added.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <label htmlFor="teaching-search" className="eyebrow text-ink-2">Search</label>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-2" aria-hidden="true" />
            <input
              id="teaching-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, topics or scriptures"
              className="w-full rounded-full border border-navy/15 bg-white/80 py-4 pl-14 pr-12 font-display text-navy outline-none backdrop-blur transition-colors placeholder:text-ink-2/60 focus:border-navy"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-pale">
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink-2" id="format-label">Format</p>
          <div role="group" aria-labelledby="format-label" className="mt-3 flex flex-wrap gap-2">
            {(["All", ...formats] as const).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={format === f}
                onClick={() => setFormat(f)}
                className="rounded-full border border-navy/15 px-4 py-2.5 font-display text-sm font-medium text-navy transition-colors hover:border-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="eyebrow text-ink-2" id="cat-label">Categories</p>
          <ul role="group" aria-labelledby="cat-label" className="no-scrollbar mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0">
            {(["All", ...categories] as const).map((c) => {
              const count = c === "All" ? teachings.length : teachings.filter((t) => t.category === c).length;
              return (
                <li key={c} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => pickCategory(c)}
                    className="group flex w-full items-center justify-between gap-4 rounded-full border border-navy/10 px-4 py-2.5 text-left font-display text-sm text-ink-2 transition-colors hover:text-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-4 lg:text-base lg:aria-pressed:bg-transparent lg:aria-pressed:text-navy"
                  >
                    <span className="flex items-center gap-3">
                      <span className="hidden size-1.5 rounded-full bg-orange opacity-0 transition-opacity group-aria-pressed:opacity-100 lg:block" aria-hidden="true" />
                      {c === "All" ? "All teachings" : c}
                    </span>
                    <span className="text-xs opacity-60">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="lg:col-span-9">
          <p className="sr-only" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          {results.length === 0 ? (
            <div className="rounded-[2rem] bg-pale/70 p-12 text-center">
              <p className="font-display text-2xl font-bold tracking-[-0.02em] text-navy">Nothing here yet.</p>
              <p className="mt-3 text-ink-2">Try another category or search term. New teachings will be added over time.</p>
            </div>
          ) : (
            <motion.ul layout={!reduce} className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {results.map((t) => {
                  const Icon = formatIcon[t.format];
                  return (
                    <motion.li
                      key={t.slug}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link href={`/teachings/${t.slug}/`} className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white/85 p-7 ring-1 ring-navy/10 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgb(7_29_73/0.45)] hover:ring-navy/30">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 rounded-full bg-pale px-3 py-1.5 font-display text-xs font-semibold text-navy">
                            <Icon className="size-3.5" aria-hidden="true" /> {t.format}
                          </span>
                          {t.sample && (
                            <span className="rounded-full border border-dashed border-orange px-2.5 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy">Sample</span>
                          )}
                        </div>
                        <p className="mt-8 eyebrow text-ink-2">{t.category}</p>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-navy">{t.title}</h3>
                        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{t.summary}</p>
                        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-navy">
                          Open
                          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
}
