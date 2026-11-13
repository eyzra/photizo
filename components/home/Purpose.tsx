import { Circled, Radiance, Scribble } from "@/components/sketches";
import { MaskedText, Parallax, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

export function Purpose() {
  return (
    <section aria-labelledby="purpose-heading" className="relative overflow-hidden py-28 md:py-40">
      <Parallax speed={0.18} className="pointer-events-none absolute -left-[18%] top-0 w-[70vw] max-w-[900px] text-navy/15 md:-left-[8%]">
        <Radiance className="w-full" />
      </Parallax>
      <div className="container-x relative grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>Welcome to Photizo</Eyebrow>
          <MaskedText as="h2" id="purpose-heading" className="display-lg mt-6 text-navy">
            There&apos;s so much more to discover in{" "}
            <Circled seed={12}>Jesus.</Circled>
          </MaskedText>
        </div>
        <div className="md:col-span-5 md:pt-24">
          <Reveal>
            <p className="editorial text-navy">
              Whether you&apos;ve followed Jesus for years or you&apos;re just beginning to ask questions about faith, we&apos;re glad you&apos;re here.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="editorial mt-6 text-ink-2">
              We believe the Christian life is a lifelong journey of knowing Jesus, understanding His Word and becoming more like Him.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="editorial mt-6 text-ink-2">
              We&apos;re building a community where people can ask honest questions, grow in faith and discover the beauty of God&apos;s Word.
            </p>
          </Reveal>
          <Scribble className="mt-10 h-10 w-full text-navy/40" accent="cyan" />
        </div>
      </div>
    </section>
  );
}
