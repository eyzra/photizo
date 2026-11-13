import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { OpenBook, Orbits } from "@/components/sketches";
import { Invitation } from "@/components/Invitation";
import { jesus, statementOfFaith } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Beliefs",
  description: "The statement of faith of Photizo Global and The Illumination Church, and what we believe about Jesus.",
};

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Believe"
        title="Jesus at the centre of our message."
        art={<Orbits className="w-full text-navy/25" />}
        intro={
          <p>
            We take the Scriptures seriously because we want people to understand what they believe, why they believe it and how that understanding should shape the way they live.
          </p>
        }
      />

      {/* Four S's */}
      <section aria-labelledby="jesus-heading" className="relative overflow-hidden bg-navy py-28 text-white md:py-36">
        <div className="grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-40 -top-20 size-[36rem] rounded-full bg-cyan/20 blur-3xl" />
        <div className="container-x relative">
          <Eyebrow tone="light">What We Believe About Jesus</Eyebrow>
          <MaskedText as="h2" id="jesus-heading" className="display-lg mt-6 max-w-4xl">
            Superior. Supreme. Sufficient. <span className="text-orange">Stable.</span>
          </MaskedText>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 ring-1 ring-white/10 md:grid-cols-2">
            {jesus.map((j, i) => (
              <Reveal key={j.word} delay={(i % 2) * 0.08} className="group bg-navy p-8 transition-colors duration-500 hover:bg-navy-800 md:p-12">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-cyan">0{i + 1}</span>
                <h3 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">
                  {j.word.replace("His ", "")}
                </h3>
                <p className="mt-1 font-serif italic text-white/60">{j.word}</p>
                <p className="mt-5 max-w-lg leading-relaxed text-white/80">{j.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of faith */}
      <section aria-labelledby="sof-heading" className="relative py-28 md:py-40">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <Eyebrow>Our Statement of Faith</Eyebrow>
              <MaskedText as="h2" id="sof-heading" className="display-md mt-6 text-navy">
                The convictions we stand on.
              </MaskedText>
              <OpenBook className="mt-10 w-full max-w-xs text-navy/50" />
              <nav aria-label="Statement of faith sections" className="mt-8 hidden md:block">
                <ul className="space-y-2 font-display text-sm">
                  {statementOfFaith.map((s, i) => (
                    <li key={s.title}>
                      <a href={`#belief-${i + 1}`} className="text-ink-2 transition-colors hover:text-navy">
                        <span className="mr-3 text-navy/40">0{i + 1}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {statementOfFaith.map((s, i) => (
              <Reveal as="li" key={s.title} className="scroll-mt-32 border-b border-navy/10 py-10 first:border-t md:py-12">
                <article id={`belief-${i + 1}`} className="grid gap-4 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-4xl font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.2px_rgb(7_29_73/0.4)]">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-bold tracking-[-0.035em] text-navy">{s.title}</h3>
                    <p className="editorial mt-4 text-ink-2">{s.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Invitation
        heading="Questions are welcome here."
        body="If something on this page raises a question for you, we'd love to talk it through. Sincere questions and honest conversations are part of how we grow."
      />
    </>
  );
}
