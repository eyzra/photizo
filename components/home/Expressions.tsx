import { ExpressionsGrid } from "@/components/ExpressionsGrid";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { TextLink } from "@/components/Button";

export function Expressions() {
  return (
    <section aria-labelledby="expressions-heading" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Our Expressions</Eyebrow>
            <MaskedText as="h2" id="expressions-heading" className="display-lg mt-6 text-navy">
              Different gatherings. <span className="text-ink-2">One mandate.</span>
            </MaskedText>
          </div>
          <Reveal className="md:col-span-5">
            <p className="editorial text-ink-2">
              We create opportunities for people to learn, pray, worship, ask questions and grow together. Each expression serves a particular purpose in helping us fulfil the mandate.
            </p>
            <div className="mt-6">
              <TextLink href="/expressions/">See all expressions</TextLink>
            </div>
          </Reveal>
        </div>
        <ExpressionsGrid />
      </div>
    </section>
  );
}
