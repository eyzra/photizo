import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { ExpressionMark, Halo, Constellation } from "@/components/sketches";
import { Button } from "@/components/Button";
import { Invitation } from "@/components/Invitation";
import { expressions } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { asset, intensifyFlyer, spiritInfluence } from "@/lib/media";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Our Expressions",
  description: "ILLUMINATE, INTENSIFY, IMMERSION and IDENTIFICATION: the gatherings of Photizo Global and The Illumination Church.",
};

export default function ExpressionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Expressions"
        title="Different gatherings. One mandate."
        art={<Halo className="w-full text-navy/20" />}
        intro={
          <p>
            We create opportunities for people to learn, pray, worship, ask questions and grow together. Each expression of Photizo Global serves a particular purpose in helping us fulfil the mandate.
          </p>
        }
      >
        <nav aria-label="Expressions" className="mt-10 flex flex-wrap gap-2">
          {expressions.map((e) => (
            <a key={e.slug} href={`#${e.slug}`} className="rounded-full border border-navy/15 px-4 py-2 font-display text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
              {e.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {expressions.map((e, i) => {
        const dark = i % 2 === 1;
        const href = "href" in e ? e.href : whatsappLink(e.message);
        return (
          <section
            key={e.slug}
            id={e.slug}
            aria-labelledby={`${e.slug}-heading`}
            className={`relative scroll-mt-20 overflow-hidden py-28 md:py-36 ${dark ? "bg-navy text-white" : ""}`}
          >
            {dark && <div className="grain pointer-events-none absolute inset-0 opacity-25" />}
            {dark && <div className="pointer-events-none absolute -left-40 top-10 size-[34rem] rounded-full bg-cyan/20 blur-3xl" />}
            <Constellation className={`pointer-events-none absolute right-[4%] top-12 hidden w-56 md:block ${dark ? "text-white/30" : "text-navy/30"}`} />
            <div className="container-x relative grid gap-12 md:grid-cols-12 md:items-center">
              <div className={`md:col-span-5 ${dark ? "md:order-2 md:col-start-8" : ""}`}>
                {e.slug === "intensify" ? (
                  <figure className="relative max-w-[440px]">
                    <img src={asset(intensifyFlyer.src)} alt={intensifyFlyer.alt} width={intensifyFlyer.w} height={intensifyFlyer.h} loading="lazy" decoding="async" className="w-full rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10" />
                    <figcaption className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-white/55">A past season: INTENSIFY, January 2025</figcaption>
                  </figure>
                ) : e.slug === "immersion" ? (
                  <Photo photo={spiritInfluence[0]} className="aspect-[4/5] max-w-[440px]" caption="IMMERSION Minna 2024: The Spirit Influence" />
                ) : (
                  <div className={`relative grid aspect-square max-w-[420px] place-items-center rounded-[2.5rem] ${dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-pale/80 ring-1 ring-navy/5"}`}>
                    <div className={`absolute inset-0 rounded-[2.5rem] ${dark ? "dot-field-light" : "dot-field"} opacity-60`} />
                    <ExpressionMark kind={e.slug} className={`relative w-1/2 ${dark ? "text-white" : "text-navy"}`} />
                    <span className={`absolute left-6 top-6 font-display text-sm font-semibold tracking-[0.2em] ${dark ? "text-white/50" : "text-ink-2"}`}>0{i + 1} / 04</span>
                  </div>
                )}
              </div>
              <div className={`md:col-span-6 ${dark ? "md:order-1" : "md:col-start-7"}`}>
                <Eyebrow tone={dark ? "light" : "navy"}>{e.kind}</Eyebrow>
                <MaskedText as="h2" id={`${e.slug}-heading`} className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.06em]">
                  {e.name}
                </MaskedText>
                <Reveal>
                  <p className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-semibold ${dark ? "bg-white/10 text-white" : "bg-pale text-navy"}`}>
                    <Clock className="size-4 text-orange" aria-hidden="true" /> {e.when}
                  </p>
                  {e.body.map((b, j) => (
                    <p key={j} className={`editorial mt-6 max-w-xl ${dark ? (j === 0 ? "text-white" : "text-white/75") : j === 0 ? "text-navy" : "text-ink-2"}`}>
                      {b}
                    </p>
                  ))}
                  <div className="mt-8">
                    <Button href={href} variant={dark ? "primary" : "dark"}>{e.cta}</Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <Invitation />
    </>
  );
}
