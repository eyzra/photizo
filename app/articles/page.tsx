import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Button, TextLink } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { Arrow, Circled } from "@/components/sketches";
import { dearAtheist, formatDate, questionOf, substack } from "@/lib/articles";
import { onStage } from "@/lib/media";
import { QuestionForm } from "@/components/forms/QuestionForm";

function TextLinkLight({ href }: { href: string }) {
  return <TextLink href={href} tone="white">Get new letters by email</TextLink>;
}

export const metadata: Metadata = {
  title: "Articles: Dear Atheist",
  description:
    "Dear Atheist is a letter series by Ezra Anya that takes the honest questions about God seriously: who created God, why there is evil, why God seems hidden, and why anyone believes at all.",
};

export default function ArticlesPage() {
  const letters = [...dearAtheist].reverse();
  const first = dearAtheist[0];

  return (
    <>
      {/* Opening */}
      <section aria-labelledby="articles-title" className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_30%_30%,black,transparent)]" />
        <div className="container-x relative grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Articles · A Letter Series</Eyebrow>
            <MaskedText as="h1" id="articles-title" trigger="mount" delay={0.15} className="display-xl mt-8 text-navy">
              Dear <Circled seed={52}>Atheist</Circled>,
            </MaskedText>
            <Reveal delay={0.5}>
              <p className="editorial mt-10 max-w-xl text-ink-2">
                Letters by Ezra Anya on the questions people ask about God. Each letter takes the objection at full strength before it answers, so you can read along whether you believe or not.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={first.url} variant="dark">Start with the first letter</Button>
                <Button href={substack.subscribe} variant="outline">Subscribe on Substack</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="relative lg:col-span-5">
            <Photo photo={onStage} className="aspect-[4/3]" priority caption="Ezra Anya" />
            <Arrow variant="loop" className="absolute -bottom-16 -left-10 hidden w-40 -scale-x-100 text-navy/50 lg:block" accent="orange" delay={1.2} />
          </Reveal>
        </div>
      </section>

      {/* Letters */}
      <section aria-labelledby="letters-heading" className="relative pb-20 md:pb-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-navy/10 pb-6">
            <h2 id="letters-heading" className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-ink-2">
              {dearAtheist.length} letters so far · newest first
            </h2>
            <a href={substack.url} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-semibold text-navy hover:text-ink-2">
              {substack.name} on Substack ↗
            </a>
          </div>
          <ol>
            {letters.map((a) => {
              const n = dearAtheist.indexOf(a) + 1;
              return (
                <Reveal as="li" key={a.url}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-6 border-b border-navy/10 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-14"
                  >
                    <div className="md:col-span-2">
                      <p className="font-display text-sm font-semibold tracking-[0.2em] text-ink-2">LETTER {String(n).padStart(2, "0")}</p>
                      <p className="mt-2 font-display text-sm text-ink-2">
                        <time dateTime={a.date}>{formatDate(a.date)}</time>
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="font-serif text-lg italic text-ink-2">Dear Atheist,</p>
                      <h3 className="mt-1 font-display text-[clamp(1.9rem,4vw,3.6rem)] font-bold leading-[0.98] tracking-[-0.045em] text-navy transition-transform duration-500 ease-out-soft group-hover:translate-x-2">
                        {questionOf(a.title)}
                      </h3>
                      <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">{a.subtitle}</p>
                    </div>
                    <div className="flex items-start md:col-span-2 md:justify-end">
                      <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 font-display text-sm font-semibold text-navy transition-all duration-500 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                        Read
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Invitation to write in */}
      <section aria-labelledby="ask-heading" className="relative pb-24 md:pb-32">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-16 text-white md:px-16 md:py-24">
            <div className="grain pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.32),transparent)]" />
            <div className="relative grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <Eyebrow tone="light">Your Question</Eyebrow>
                <MaskedText as="h2" id="ask-heading" className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-bold leading-[0.92] tracking-[-0.05em]">
                  What would you ask <span className="text-orange">God?</span>
                </MaskedText>
              </div>
              <Reveal className="md:col-span-7">
                <QuestionForm />
              </Reveal>
              <Reveal className="md:col-span-5 md:row-start-2">
                <p className="font-serif text-lg italic leading-relaxed text-white/80">
                  Send the question that keeps you from believing, or the one you get asked most. It might shape the next letter.
                </p>
                <div className="mt-6">
                  <TextLinkLight href={substack.subscribe} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
