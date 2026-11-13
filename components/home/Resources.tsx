import Link from "next/link";
import { ArrowUpRight, BookOpen, Download, FileText, Headphones, Video } from "lucide-react";
import { categories, categoryNotes } from "@/lib/teachings";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow, PendingNote } from "@/components/ui";
import { Constellation } from "@/components/sketches";

const formatIcons = [
  { label: "Sermons", Icon: BookOpen },
  { label: "Articles", Icon: FileText },
  { label: "Audio", Icon: Headphones },
  { label: "Video", Icon: Video },
  { label: "Study resources", Icon: Download },
];

export function Resources() {
  return (
    <section aria-labelledby="resources-heading" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Eyebrow>Teachings and Resources</Eyebrow>
            <MaskedText as="h2" id="resources-heading" className="display-lg mt-6 text-navy">
              A growing library of teaching.
            </MaskedText>
            <Reveal>
              <p className="editorial mt-8 max-w-md text-ink-2">
                We&apos;re gathering sermons, articles, audio, video and study guides into one place so you can keep learning between gatherings.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {formatIcons.map(({ label, Icon }) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-full bg-pale px-3.5 py-2 font-display text-sm text-navy">
                    <Icon className="size-4" aria-hidden="true" /> {label}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PendingNote>The library is being prepared. New teachings will appear here.</PendingNote>
              </div>
            </Reveal>
            <Constellation className="mt-12 hidden w-72 text-navy/50 md:block" />
          </div>
          <ul className="md:col-span-7">
            {categories.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.05}>
                <Link
                  href={`/teachings/?category=${encodeURIComponent(c)}`}
                  className="group flex items-center gap-6 border-b border-navy/10 py-7 first:border-t"
                >
                  <span className="font-display text-sm font-medium tracking-[0.2em] text-ink-2">0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.04em] text-navy transition-transform duration-500 ease-out-soft group-hover:translate-x-2">
                      {c}
                    </span>
                    <span className="mt-2 block max-w-lg text-[0.95rem] text-ink-2">{categoryNotes[c]}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-navy/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
