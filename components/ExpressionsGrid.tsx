import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { expressions } from "@/lib/content";
import { ExpressionMark } from "./sketches";
import { Reveal } from "./Reveal";

/** Editorial 2x2 grid of the four programmes. */
export function ExpressionsGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[2rem] bg-navy/10 ring-1 ring-navy/10 md:grid-cols-2">
      {expressions.map((e, i) => (
        <Reveal as="li" key={e.slug} delay={(i % 2) * 0.08}>
          <Link
            href={"href" in e ? e.href : `/expressions/#${e.slug}`}
            className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden bg-white/85 p-8 backdrop-blur transition-colors duration-700 hover:bg-navy md:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan/0 blur-3xl transition-colors duration-700 group-hover:bg-cyan/25" />
            <div className="relative flex items-start justify-between">
              <ExpressionMark kind={e.slug} className="size-20 text-navy transition-colors duration-700 group-hover:text-white" delay={i * 0.15} />
              <span className="grid size-11 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-500 group-hover:rotate-45 group-hover:border-orange group-hover:bg-orange">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </div>
            <div className="relative">
              <p className="eyebrow text-ink-2 transition-colors duration-700 group-hover:text-cyan">{e.kind}</p>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.05em] text-navy transition-colors duration-700 group-hover:text-white">
                {e.name}
              </h3>
              <p className="mt-4 max-w-sm text-ink-2 transition-colors duration-700 group-hover:text-white/75">{e.short}</p>
              <p className="mt-5 inline-flex items-center gap-2 font-display text-sm font-medium text-navy transition-colors duration-700 group-hover:text-orange">
                <Clock className="size-4" aria-hidden="true" /> {e.when}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
