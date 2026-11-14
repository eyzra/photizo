import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { ExpressionMark, Halo, Constellation } from "@/components/sketches";
import { Button } from "@/components/Button";
import { Invitation } from "@/components/Invitation";
import { expressions } from "@/lib/content";
import { asset, flyers, intensifyFlyer, spiritInfluence, thumb } from "@/lib/media";
import { Gallery } from "@/components/Gallery";
import { site } from "@/lib/site";
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
        const href = "href" in e ? e.href : e.link === "community" ? site.whatsappCommunity : site.whatsappChannel;
        return (
          <section
            key={e.slug}
            id={e.slug}
            aria-labelledby={`${e.slug}-heading`}
            className={`relative scroll-mt-20 overflow-hidden py-20 md:py-28 ${dark ? "bg-navy text-white" : ""}`}
          >
            {dark && <div className="grain pointer-events-none absolute inset-0 opacity-25" />}
            {dark && <div className="pointer-events-none absolute -left-40 top-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.32),transparent)]" />}
            <Constellation className={`pointer-events-none absolute right-[4%] top-12 hidden w-56 md:block ${dark ? "text-white/30" : "text-navy/30"}`} />
            <div className="container-x relative grid gap-12 md:grid-cols-12 md:items-center">
              <div className={`md:col-span-5 ${dark ? "md:order-2 md:col-start-8" : ""}`}>
                {e.slug === "intensify" ? (
                  <div className="relative mx-auto h-[26rem] max-w-[440px] md:h-[30rem]">
                    {[
                      { ph: flyers.intensify40, cls: "left-0 top-6 w-[62%] -rotate-[7deg]" },
                      { ph: flyers.intensify30, cls: "right-0 top-0 w-[62%] rotate-[6deg]" },
                      { ph: intensifyFlyer, cls: "left-[16%] bottom-0 w-[68%] rotate-[-1deg]" },
                    ].map(({ ph, cls }, k) => (
                      <img
                        key={ph.src}
                        src={thumb(ph)}
                        alt={ph.alt}
                        width={ph.w}
                        height={ph.h}
                        loading="lazy"
                        className={`absolute rounded-2xl shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-out-soft hover:z-10 hover:scale-[1.04] hover:rotate-0 ${cls}`}
                        style={{ zIndex: k }}
                      />
                    ))}
                    <p className="absolute -bottom-10 left-0 font-display text-xs uppercase tracking-[0.2em] text-white/55">Past INTENSIFY seasons</p>
                  </div>
                ) : e.slug === "illuminate" ? (
                  <figure className="relative max-w-[440px]">
                    <img src={thumb(flyers.illuminateDevotion)} alt={flyers.illuminateDevotion.alt} width={1280} height={1280} loading="lazy" className="w-full rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(7_29_73/0.6)]" />
                    <figcaption className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-ink-2">From a past ILLUMINATE series: The Essence of Devotion</figcaption>
                  </figure>
                ) : e.slug === "identification" ? (
                  <figure className="relative max-w-[440px]">
                    <img src={thumb(flyers.identification)} alt={flyers.identification.alt} width={flyers.identification.w} height={flyers.identification.h} loading="lazy" className="w-full rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10" />
                    <figcaption className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-white/55">IDENTIFICATION 2026: Easter Sunday, 5th April, Nyanya, Abuja</figcaption>
                  </figure>
                ) : e.slug === "immersion" ? (
                  <Photo photo={spiritInfluence[0]} className="aspect-[4/5] max-w-[440px]" caption="IMMERSION Minna 2024: The Spirit Influence" />
                ) : (
                  <div className={`relative grid aspect-square max-w-[420px] place-items-center rounded-[2.5rem] ${dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-pale/80 ring-1 ring-navy/5"}`}>
                    <div className={`absolute inset-0 rounded-[2.5rem] ${dark ? "dot-field-light" : "dot-field"} opacity-60`} />
                    <ExpressionMark kind={(e as { slug: string }).slug} className={`relative w-1/2 ${dark ? "text-white" : "text-navy"}`} />
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
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={href} variant={dark ? "primary" : "dark"}>{e.cta}</Button>
                    {e.slug === "intensify" && <Button href={site.telegram} variant="ghost-light">Join on Telegram</Button>}
                    {e.slug === "illuminate" && <Button href={site.telegram} variant="outline">Join on Telegram</Button>}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="archive-heading" className="relative py-16 md:py-24">
        <div className="container-x">
          <div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>From the Archive</Eyebrow>
              <MaskedText as="h2" id="archive-heading" className="display-lg mt-6 text-navy">
                Seasons we have walked through together.
              </MaskedText>
            </div>
            <p className="editorial text-ink-2 md:col-span-5">
              Flyers from past gatherings, fasts and teaching series, including AUXANO, our 21 days of discipleship. Tap any one to see it in full.
            </p>
          </div>
          <Gallery
            layout="masonry"
            label="Past Photizo Global programmes"
            photos={[flyers.auxano, flyers.spiritInfluence, flyers.illuminateDevotion, flyers.intensify40, flyers.shekinah, flyers.nowFaithIs, flyers.intensify30, flyers.immersionComing, intensifyFlyer, flyers.faithFundamentals, flyers.identification]}
            captions={[
              "AUXANO: 21 Days of Discipleship",
              "IMMERSION Minna 2024: The Spirit Influence",
              "ILLUMINATE: The Essence of Devotion",
              "INTENSIFY: 40 Days of Prayer and Fasting",
              "IMMERSION Abuja 2024: Shekinah",
              "IMMERSION Abuja 2025: Now Faith Is",
              "INTENSIFY: 30-Day Prayer and Fasting",
              "IMMERSION is coming",
              "INTENSIFY: January 2025",
              "IMMERSION Minna 2026: Faith Fundamentals",
              "IDENTIFICATION 2026: Easter Sunday",
            ]}
          />
        </div>
      </section>

      <Invitation />
    </>
  );
}
