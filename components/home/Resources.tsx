import { ArrowUpRight, Send } from "lucide-react";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Button, TextLink } from "@/components/Button";
import { Constellation } from "@/components/sketches";
import { dearAtheist, formatDate, questionOf } from "@/lib/articles";
import { site } from "@/lib/site";

/** Homepage preview of the Dear Atheist letters and the Telegram teaching channel. */
export function Resources() {
  const latest = [...dearAtheist].reverse().slice(0, 3);
  return (
    <section aria-labelledby="resources-heading" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Eyebrow>Keep Reading</Eyebrow>
            <MaskedText as="h2" id="resources-heading" className="display-lg mt-6 text-navy">
              Dear Atheist,
            </MaskedText>
            <Reveal>
              <p className="editorial mt-8 max-w-md text-ink-2">
                A letter series by Ezra Anya on the honest questions people ask about God. Every letter meets the objection at full strength.
              </p>
              <div className="mt-8">
                <TextLink href="/articles/">See every letter</TextLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative mt-12 overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white">
                <div className="grain pointer-events-none absolute inset-0 opacity-25" />
                <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-cyan/25 blur-3xl" />
                <Send className="relative size-6 text-orange" aria-hidden="true" />
                <p className="relative mt-5 font-display text-xl font-bold leading-snug tracking-[-0.02em]">Teachings, notes and daily meditations are shared on Telegram.</p>
                <div className="relative mt-6">
                  <Button href={site.telegram} variant="primary">Join {site.telegramHandle}</Button>
                </div>
              </div>
            </Reveal>
            <Constellation className="mt-12 hidden w-64 text-navy/40 md:block" />
          </div>
          <ol className="md:col-span-7">
            {latest.map((a, i) => (
              <Reveal as="li" key={a.url} delay={i * 0.06}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="group flex gap-6 border-b border-navy/10 py-8 first:border-t">
                  <span className="flex-1">
                    <span className="block font-display text-sm text-ink-2">
                      <time dateTime={a.date}>{formatDate(a.date)}</time>
                    </span>
                    <span className="mt-3 block font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-navy transition-transform duration-500 ease-out-soft group-hover:translate-x-2">
                      {questionOf(a.title)}
                    </span>
                    <span className="mt-3 block max-w-lg text-[0.95rem] leading-relaxed text-ink-2">{a.subtitle}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-navy/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
