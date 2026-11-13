import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { ImmersionHero } from "@/components/immersion/ImmersionHero";
import { RiseFramework } from "@/components/immersion/RiseFramework";
import { ImmersionTimeline } from "@/components/immersion/Timeline";
import { ThemeVeil } from "@/components/immersion/ThemeVeil";
import { MaskedText, Parallax, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Arrow, Circled, Halo, Pathway, SunBurst } from "@/components/sketches";
import { Button } from "@/components/Button";
import { immersion } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Gallery } from "@/components/Gallery";
import { asset, flyers, spiritInfluence } from "@/lib/media";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "IMMERSION",
  description:
    "IMMERSION is the flagship annual camp meeting of Photizo Global. Immersed to Rise: Rejuvenation, Indoctrination, Supernatural Signs and Equipping.",
};

const updatesHref = whatsappLink("Hello Photizo Global, please keep me updated about IMMERSION Abuja 2026.");
const attendHref = whatsappLink("Hello Photizo Global, I'd like to attend IMMERSION Minna: Faith Fundamentals on 11th and 12th December.");

const faqs = [
  {
    q: "What is IMMERSION?",
    a: "IMMERSION is the flagship annual camp meeting of Photizo Global. It brings believers together for extended biblical teaching, prayer, worship, fellowship and encounters with the power of God.",
  },
  {
    q: "Who is IMMERSION for?",
    a: "Anyone looking to deepen their understanding of Scripture, strengthen their faith, find answers to difficult questions or spend intentional time seeking God. It is an opportunity to grow alongside other believers.",
  },
  {
    q: "What happens at the camp?",
    a: "The camp is shaped by the RISE experience: Rejuvenation, Indoctrination, Supernatural Signs and Equipping. Expect systematic teaching, prayer, worship and fellowship across the days we spend together.",
  },
  {
    q: "Where have past editions been held?",
    a: "IMMERSION has been held in Minna and Abuja. The Spirit Influence met at the CACSF Auditorium, Gidan Kwano, Minna, in May 2024. Shekinah met at MFM NCR35 Phase IV, Nyanya, Abuja, in December 2024, and Now Faith Is met at the MFM NCR35 Youth Church Auditorium, Nyanya, in December 2025. The next edition, Faith Fundamentals, returns to Gidan Kwano, Minna, in December 2026.",
  },
  {
    q: "When is the next edition and how do I attend?",
    a: "The next edition is IMMERSION Minna: Faith Fundamentals, on Friday 11th December at 5PM and Saturday 12th December at 6AM and 5PM, 2026, at the MFM Campus Fellowship permanent site, behind Alheri Lodge, Gofamint, Gidan Kwano. Send us a message on WhatsApp to let us know you're coming. IMMERSION Abuja 2026 follows, and its theme will be revealed soon.",
  },
  {
    q: "Who do I contact with other questions?",
    a: `Call or WhatsApp ${site.phoneDisplay}, or email ${site.email}. We'd be glad to hear from you.`,
  },
];

export default function ImmersionPage() {
  const [p1, p2, p3, p4] = immersion.intro;
  return (
    <>
      <ImmersionHero />

      {/* Why we gather */}
      <section id="about-immersion" aria-labelledby="why-heading" className="relative scroll-mt-16 py-28 md:py-40">
        <Parallax speed={0.12} className="pointer-events-none absolute -left-[10%] top-10 w-[50vw] max-w-[620px] text-navy/10">
          <Halo className="w-full" />
        </Parallax>
        <div className="container-x relative grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>Why We Gather</Eyebrow>
            <MaskedText as="h2" id="why-heading" className="display-md mt-6 text-navy">
              There are seasons when we need to{" "}
              <Circled seed={44}>withdraw</Circled>.
            </MaskedText>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-6">
            <Reveal>
              <p className="editorial text-navy">{p1}</p>
              <p className="mt-6 font-display text-2xl font-bold tracking-[-0.02em] text-navy">{p2}</p>
            </Reveal>
          </div>
        </div>

        <div className="container-x relative mt-24 grid gap-14 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-7">
            <Photo photo={spiritInfluence[1]} className="aspect-[16/10]" caption="IMMERSION Minna 2024: The Spirit Influence" />
          </Reveal>
          <div className="md:col-span-5">
            <Eyebrow>What IMMERSION Is</Eyebrow>
            <Reveal>
              <p className="editorial mt-6 text-navy">{p3}</p>
              <p className="editorial mt-6 text-ink-2">{p4}</p>
            </Reveal>
            <Arrow variant="down" className="mt-6 hidden h-28 text-navy/50 md:block" accent="orange" />
          </div>
        </div>
      </section>

      {/* RISE */}
      <section aria-labelledby="rise-heading" className="relative overflow-hidden bg-navy py-28 text-white md:py-40">
        <div className="grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-cyan/20 blur-3xl" />
        <SunBurst className="pointer-events-none absolute -left-40 bottom-[-10rem] w-[40rem] text-white/10" />
        <div className="container-x relative">
          <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow tone="light">The RISE Experience</Eyebrow>
              <MaskedText as="h2" id="rise-heading" className="mt-6 font-display text-[clamp(4rem,14vw,12rem)] font-bold leading-[0.82] tracking-[-0.07em]">
                R.I.S.E<span className="text-orange">.</span>
              </MaskedText>
            </div>
            <p className="max-w-md font-serif text-lg italic text-white/75 md:col-span-4 md:col-start-9">
              Four emphases that shape every IMMERSION. Hover, tap or tab through each letter.
            </p>
          </div>
          <RiseFramework detailed />
        </div>
      </section>

      {/* Journey */}
      <section id="past-editions" aria-labelledby="journey-heading" className="relative scroll-mt-16 py-28 md:py-40">
        <div className="container-x mb-4 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow>History and Past Editions</Eyebrow>
            <MaskedText as="h2" id="journey-heading" className="display-lg mt-6 text-navy">
              The IMMERSION journey.
            </MaskedText>
          </div>
          <p className="editorial text-ink-2 md:col-span-4">Three editions held so far across Minna and Abuja. Faith Fundamentals comes next, in Minna this December.</p>
        </div>
        <ImmersionTimeline />
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="relative pb-28 md:pb-40">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Event Gallery</Eyebrow>
              <h2 id="gallery-heading" className="display-md mt-6 text-navy">
                The Spirit Influence<span className="text-orange">.</span>
              </h2>
              <p className="mt-3 font-display text-sm uppercase tracking-[0.2em] text-ink-2">IMMERSION Minna 2024</p>
            </div>
          </div>
          <div className="mt-12">
            <Gallery photos={spiritInfluence} label="IMMERSION Minna 2024: The Spirit Influence" />
          </div>
        </div>
      </section>

      {/* Next edition */}
      <section id="register" aria-labelledby="next-heading" className="relative scroll-mt-16 overflow-hidden bg-navy py-28 text-white md:py-40">
        <div className="grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -left-40 top-10 size-[40rem] rounded-full bg-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-orange/15 blur-3xl" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px]">
              <img
                src={asset(flyers.faithFundamentals.src)}
                alt={flyers.faithFundamentals.alt}
                width={flyers.faithFundamentals.w}
                height={flyers.faithFundamentals.h}
                className="w-full rounded-[2rem] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)] ring-1 ring-white/10"
              />
              <span className="absolute -left-4 -top-4 rotate-[-6deg] rounded-full bg-orange px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-navy">Next edition</span>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow inline-flex items-center gap-3 text-cyan">
              <span className="size-1.5 animate-pulse rounded-full bg-orange" aria-hidden="true" />
              IMMERSION Minna 2026
            </p>
            <MaskedText as="h2" id="next-heading" className="mt-6 font-display text-[clamp(2.5rem,5.4vw,5rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] [overflow-wrap:anywhere]">
              Faith <span className="text-orange">Fundamentals.</span>
            </MaskedText>
            <Reveal>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
                {[
                  ["When", "Friday 11th December, 5PM\nSaturday 12th December, 6AM and 5PM"],
                  ["Where", "MFM Campus Fellowship permanent site, behind Alheri Lodge, Gofamint, Gidan Kwano, Minna"],
                  ["With", "Pastor Ezra Anya"],
                  ["Hosted with", "Mountain of Fire and Miracles Ministries Campus Fellowship, FUTMinna Chapter"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-navy p-6">
                    <dt className="eyebrow text-cyan">{k}</dt>
                    <dd className="mt-2 whitespace-pre-line font-display text-[1.02rem] font-medium leading-snug text-white/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={attendHref} variant="primary" size="lg">I&apos;m coming</Button>
                <Button href={site.telegram} variant="ghost-light" size="lg">Updates on Telegram</Button>
              </div>
              <p className="mt-4 text-sm text-white/60">&ldquo;I&apos;m coming&rdquo; opens WhatsApp with a message ready for you to send.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* After that */}
      <section id="upcoming" aria-labelledby="upcoming-heading" className="relative scroll-mt-16 overflow-hidden bg-navy-900 py-28 text-white md:py-36">
        <div className="grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.18),transparent)]" />
        <div className="container-x relative text-center">
          <p className="eyebrow inline-flex items-center gap-3 text-cyan">
            <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
            Coming Later
          </p>
          <h2 id="upcoming-heading" className="mt-6 font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            IMMERSION ABUJA <span className="text-orange">2026</span>
          </h2>
          <p className="mt-6 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.02em]">Something is coming.</p>
          <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] bg-white/[0.03] px-6 py-16 ring-1 ring-white/10 md:py-24">
            <ThemeVeil className="mx-auto" />
            <p className="relative mt-8 font-serif text-xl italic text-white/85">The theme will be revealed soon.</p>
          </div>
          <div className="mt-10 flex justify-center">
            <Button href={updatesHref} variant="primary">Get updates on WhatsApp</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="relative py-28 md:py-40">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Frequently Asked</Eyebrow>
            <MaskedText as="h2" id="faq-heading" className="display-md mt-6 text-navy">
              Questions about IMMERSION.
            </MaskedText>
            <Pathway className="mt-10 hidden w-48 text-navy/40 md:block" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-navy/10 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-[clamp(1.15rem,1.8vw,1.45rem)] font-semibold tracking-[-0.015em] text-navy [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-navy/15 transition-all duration-500 group-open:rotate-45 group-open:border-orange group-open:bg-orange">
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="editorial max-w-2xl pb-8 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section aria-labelledby="come-heading" className="relative overflow-hidden pb-32 md:pb-44">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-20 text-center text-white md:px-16 md:py-28">
            <div className="grain pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-cyan/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-96 rounded-full bg-orange/15 blur-3xl" />
            <MaskedText as="h2" id="come-heading" className="relative mx-auto max-w-4xl font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]">
              Come, be immersed <span className="text-orange">to rise.</span>
            </MaskedText>
            <Reveal className="relative">
              <p className="editorial mx-auto mt-8 max-w-2xl text-white/80">{immersion.invitation.body}</p>
              <p className="mt-4 font-serif text-xl italic text-white">{immersion.invitation.close}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="#register" variant="primary" size="lg">Join us at Faith Fundamentals</Button>
                <Button href="#past-editions" variant="ghost-light" size="lg">Explore Past Editions</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
