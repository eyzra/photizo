import type { Metadata } from "next";
import { HandHeart, Landmark, Repeat } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Radiance, Ripple } from "@/components/sketches";
import { Button } from "@/components/Button";
import { BankCard } from "@/components/BankCard";

export const metadata: Metadata = {
  title: "Give",
  description: "Partner with Photizo Global to help more people see Jesus through teaching meetings, biblical resources and discipleship.",
};

const uses = [
  "Organising teaching meetings and camp meetings",
  "Creating biblical resources",
  "Supporting discipleship initiatives",
  "Taking the message of Jesus to more people",
];

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title="Together, more people see Jesus."
        art={<Ripple className="w-full text-navy/25" />}
        intro={
          <>
            <p>
              Your generosity helps us organise teaching meetings, create biblical resources, support discipleship initiatives and take the message of Jesus to more people.
            </p>
            <p className="mt-4">Every gift helps us continue the work entrusted to us. Thank you for believing in the vision and choosing to be part of it.</p>
          </>
        }
      />

      <section id="bank" aria-labelledby="ways-heading" className="relative scroll-mt-24 pb-16 md:pb-24">
        <div className="container-x grid gap-5 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white md:p-12 lg:col-span-7">
            <div className="grain pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.35),transparent)]" />
            <div className="relative flex items-center gap-3">
              <Landmark className="size-7 text-orange" strokeWidth={1.4} aria-hidden="true" />
              <h2 id="ways-heading" className="font-display text-2xl font-bold tracking-[-0.02em]">Give by bank transfer</h2>
            </div>
            <div className="relative mt-6">
              <BankCard />
            </div>
            <p className="relative mt-6 text-sm leading-relaxed text-white/65">
              Add a note such as &ldquo;IMMERSION&rdquo; or &ldquo;Partnership&rdquo; to your transfer if your gift is for something specific.
            </p>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            <Reveal delay={0.08} className="flex flex-col rounded-[2rem] bg-white/90 p-8 ring-1 ring-navy/10 md:p-10">
              <HandHeart className="size-9 text-orange" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.035em] text-navy">Give Once</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-2">Support a meeting, outreach or ministry project with a one-time gift to the account shown.</p>
            </Reveal>
            <Reveal delay={0.16} className="flex flex-col rounded-[2rem] bg-pale/80 p-8 ring-1 ring-navy/5 md:p-10">
              <Repeat className="size-9 text-navy" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.035em] text-navy">Become a Partner</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-2">
                Support the ministry consistently and help us plan for future gatherings, resources and outreach. Let us know you&apos;re partnering so we can pray with you and keep you updated.
              </p>
              <div className="mt-6">
                <Button href="/contact/?topic=Partnership%20and%20giving" variant="dark">Tell us you&apos;re partnering</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-heading" className="relative overflow-hidden py-16 md:py-24">
        <Radiance className="pointer-events-none absolute -right-40 top-1/2 w-[46rem] -translate-y-1/2 text-navy/10" />
        <div className="container-x relative grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Where Your Gift Goes</Eyebrow>
            <MaskedText as="h2" id="impact-heading" className="display-md mt-6 text-navy">
              Every gift serves the mandate.
            </MaskedText>
          </div>
          <ul className="md:col-span-6 md:col-start-7">
            {uses.map((u, i) => (
              <Reveal as="li" key={u} delay={i * 0.05} className="flex items-baseline gap-5 border-b border-navy/10 py-6 first:border-t">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-2">0{i + 1}</span>
                <span className="font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold tracking-[-0.02em] text-navy">{u}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
