import type { Metadata } from "next";
import { HandHeart, Landmark, Repeat } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow, PendingNote } from "@/components/ui";
import { Radiance, Ripple } from "@/components/sketches";
import { Button } from "@/components/Button";
import { site, whatsappLink } from "@/lib/site";

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

      <section aria-labelledby="ways-heading" className="relative pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="ways-heading" className="sr-only">Ways to give</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal className="flex flex-col rounded-[2rem] bg-white/85 p-8 ring-1 ring-navy/10 backdrop-blur md:p-10">
              <HandHeart className="size-9 text-orange" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-8 font-display text-3xl font-bold tracking-[-0.035em] text-navy">Give Once</h3>
              <p className="mt-4 flex-1 leading-relaxed text-ink-2">Support a meeting, outreach or ministry project with a one-time gift.</p>
              <div className="mt-8">
                <Button href={whatsappLink("Hello Photizo Global, I'd like to give a one-time gift. Please share how.")} variant="dark">Give Now</Button>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="relative flex flex-col overflow-hidden rounded-[2rem] bg-navy p-8 text-white md:p-10">
              <div className="grain pointer-events-none absolute inset-0 opacity-25" />
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-cyan/25 blur-3xl" />
              <Repeat className="relative size-9 text-orange" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="relative mt-8 font-display text-3xl font-bold tracking-[-0.035em]">Become a Partner</h3>
              <p className="relative mt-4 flex-1 leading-relaxed text-white/75">
                Support the ministry consistently and help us plan for future gatherings, resources and outreach.
              </p>
              <div className="relative mt-8">
                <Button href={whatsappLink("Hello Photizo Global, I'd like to become a ministry partner.")} variant="primary">Become a Partner</Button>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="flex flex-col rounded-[2rem] bg-pale/80 p-8 ring-1 ring-navy/5 md:p-10">
              <Landmark className="size-9 text-navy" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-8 font-display text-3xl font-bold tracking-[-0.035em] text-navy">Bank Transfer</h3>
              <p className="mt-4 leading-relaxed text-ink-2">Verified ministry account details will be published here.</p>
              <div className="mt-6 space-y-3 rounded-2xl border border-dashed border-navy/25 p-5 font-display text-sm">
                {["Account name", "Bank", "Account number"].map((l) => (
                  <div key={l} className="flex justify-between gap-4">
                    <span className="text-ink-2">{l}</span>
                    <span className="font-semibold text-navy/40">To be added</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-2">
                Until then, please confirm account details directly with us on {site.phoneDisplay} before sending any transfer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-heading" className="relative overflow-hidden py-24 md:py-36">
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
            <div className="mt-10">
              <PendingNote>Online giving links will be added once they are set up.</PendingNote>
            </div>
          </ul>
        </div>
      </section>
    </>
  );
}
