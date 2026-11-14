import { Button } from "./Button";
import { MaskedText, Reveal } from "./Reveal";
import { Radiance } from "./sketches";
import { joinCommunityHref } from "@/lib/site";

export function Invitation({
  heading = "There's a place for you here.",
  body = "Whether you want to deepen your understanding of Scripture, grow in faith, find answers to difficult questions or connect with other believers, we'd love to have you.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="invite-heading" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(82_215_237/0.35),rgb(232_247_250/0.5)_50%,transparent)]" />
      <Radiance className="pointer-events-none absolute left-1/2 top-1/2 w-[min(110vw,1000px)] -translate-x-1/2 -translate-y-1/2 text-navy/20" />
      <div className="container-x relative text-center">
        <MaskedText as="h2" id="invite-heading" className="display-lg mx-auto max-w-5xl text-navy">
          {heading}
        </MaskedText>
        <Reveal delay={0.2}>
          <p className="editorial mx-auto mt-8 max-w-2xl text-ink-2">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={joinCommunityHref} variant="primary" size="lg">Join Our Community</Button>
            <Button href="/contact/" variant="outline" size="lg">Get in Touch</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
