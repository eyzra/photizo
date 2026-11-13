import { immersion } from "@/lib/content";
import { Button } from "@/components/Button";
import { MaskedText, Parallax, Reveal } from "@/components/Reveal";
import { Orbits } from "@/components/sketches";
import { RiseFramework } from "@/components/immersion/RiseFramework";
import { ImmersionTimeline } from "@/components/immersion/Timeline";
import { Eyebrow } from "@/components/ui";
import { asset, spiritInfluence } from "@/lib/media";

export function ImmersionFeature() {
  return (
    <section aria-labelledby="immersion-heading" className="relative overflow-hidden bg-navy text-white">
      <div className="grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="dot-field-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-20 size-[40rem] rounded-full bg-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[40%] size-[34rem] rounded-full bg-orange/10 blur-3xl" />

      {/* Opening */}
      <div className="relative flex min-h-[100svh] flex-col justify-center py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%]">
          <img src={asset(spiritInfluence[0].src)} alt="" loading="lazy" decoding="async" className="size-full object-cover opacity-45 mix-blend-luminosity [mask-image:linear-gradient(to_left,black_30%,transparent)] max-md:[mask-image:linear-gradient(to_top,black_10%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_40%,rgb(82_215_237/0.18),transparent)] mix-blend-screen" />
        </div>
        <Parallax speed={0.12} className="pointer-events-none absolute right-[-12%] top-[8%] w-[60vw] max-w-[760px] text-white/25">
          <Orbits className="w-full" />
        </Parallax>
        <div className="container-x relative">
          <Eyebrow tone="light">Flagship Annual Camp Meeting</Eyebrow>
          <MaskedText as="h2" id="immersion-heading" className="mt-8 font-display text-[clamp(4rem,17vw,16rem)] font-bold leading-[0.8] tracking-[-0.07em]">
            IMMERSION<span className="text-orange">.</span>
          </MaskedText>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
                Immersed <span className="text-orange">to rise.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
              <p className="font-serif text-xl leading-relaxed text-white/85">{immersion.short}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/immersion/" variant="primary" size="lg">Explore IMMERSION</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* RISE */}
      <div className="container-x relative pb-28 md:pb-36">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow tone="light">The RISE Experience</Eyebrow>
            <h3 className="mt-5 display-md">Four movements of one encounter.</h3>
          </div>
          <p className="max-w-sm text-white/65">Hover or tap a letter to open it.</p>
        </div>
        <RiseFramework />
      </div>

      {/* Journey */}
      <div className="relative border-t border-white/10 py-28 md:py-36">
        <div className="container-x mb-4">
          <Eyebrow tone="light">The IMMERSION Journey</Eyebrow>
          <h3 className="mt-5 display-md max-w-3xl">Every edition so far, and the one still to come.</h3>
        </div>
        <ImmersionTimeline tone="dark" />
      </div>
    </section>
  );
}
