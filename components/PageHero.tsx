import type { ReactNode } from "react";
import { MaskedText, Reveal } from "./Reveal";
import { Eyebrow } from "./ui";

/** Shared opening for inner pages: label, oversized title, intro and an illustration. */
export function PageHero({
  eyebrow,
  title,
  intro,
  art,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]" />
      {art && <div className="pointer-events-none absolute right-[-14vw] top-16 w-[70vw] max-w-[680px] md:right-[-4vw] md:top-20 md:w-[48vw]">{art}</div>}
      <div className="container-x relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <MaskedText as="h1" trigger="mount" delay={0.15} className="display-xl mt-8 max-w-[14ch] text-navy">
          {title}
        </MaskedText>
        {intro && (
          <Reveal delay={0.5}>
            <div className="editorial mt-10 max-w-2xl text-ink-2">{intro}</div>
          </Reveal>
        )}
        {children && <Reveal delay={0.65}>{children}</Reveal>}
      </div>
    </section>
  );
}
