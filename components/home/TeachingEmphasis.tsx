import { teachingEmphasis } from "@/lib/content";
import { Arrow, Blueprint, Circled, Mountains, OpenBook, Underline } from "@/components/sketches";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { TextLink } from "@/components/Button";

export function TeachingEmphasis({ withLink = true }: { withLink?: boolean }) {
  const [biblical, faith, apologetics, discipleship] = teachingEmphasis.areas;
  return (
    <section aria-labelledby="teaching-heading" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow>{teachingEmphasis.eyebrow}</Eyebrow>
            <MaskedText as="h2" id="teaching-heading" className="display-lg mt-6 text-navy">
              Growing in the knowledge of Jesus.{" "}
              <span className="text-ink-2">Grounded in the truth of His{" "}</span>
              <span className="relative inline-block text-ink-2">
                Word.
                <Underline className="absolute -bottom-[0.1em] left-0 h-[0.2em] w-full" delay={0.8} />
              </span>
            </MaskedText>
          </div>
          <div className="md:col-span-4 md:pt-16">
            <Reveal>
              <p className="editorial text-ink-2">{teachingEmphasis.intro}</p>
              <p className="mt-5 font-display text-lg font-semibold text-navy">{teachingEmphasis.lead}</p>
            </Reveal>
          </div>
        </div>

        {/* 01 and 02 */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-navy/10 ring-1 ring-navy/10 md:grid-cols-2">
          {[biblical, faith].map((area, i) => (
            <Reveal key={area.key} delay={i * 0.1} className="group relative bg-white/85 p-8 backdrop-blur md:p-12">
              <div className="flex items-start justify-between gap-6">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-2">0{i + 1}</span>
                {i === 0 ? <OpenBook className="w-36 text-navy/60" /> : <FaithMark />}
              </div>
              <h3 className="mt-8 display-sm text-navy">{area.title}</h3>
              {area.paragraphs.map((para, j) => (
                <p key={j} className={`mt-4 leading-relaxed ${j === area.paragraphs.length - 1 && area.paragraphs.length > 1 ? "font-serif text-lg italic text-navy" : "text-ink-2"}`}>
                  {para}
                </p>
              ))}
            </Reveal>
          ))}
        </div>

        {/* 03 Apologetics, given prominence */}
        <Reveal className="relative mt-6 overflow-hidden rounded-[2rem] bg-navy text-white">
          <div className="grain pointer-events-none absolute inset-0 opacity-25" />
          <div className="dot-field-light pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute -left-24 bottom-[-30%] size-[32rem] rounded-full bg-cyan/20 blur-3xl" />
          <Blueprint className="pointer-events-none absolute -right-20 -top-20 w-[420px] text-white/25" label="fig. 03 reason" />
          <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-6">
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-cyan">03</span>
              <h3 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.92] tracking-[-0.045em]">
                Christian <span className="text-orange">Apologetics</span>
              </h3>
              {apologetics.paragraphs.map((para, j) => (
                <p key={j} className={`mt-5 max-w-xl leading-relaxed ${j === 0 ? "font-serif text-xl italic text-white" : "text-white/75"}`}>
                  {para}
                </p>
              ))}
            </div>
            <div className="relative lg:col-span-6 lg:pl-6">
              <p className="eyebrow text-cyan">Questions we welcome</p>
              <ul className="mt-6 space-y-1">
                {"questions" in apologetics &&
                  apologetics.questions.map((q, i) => (
                    <li key={q} className="group border-b border-white/10 py-3.5 font-display text-[clamp(1.25rem,2.2vw,1.8rem)] font-semibold tracking-[-0.02em] text-white/85 transition-colors hover:text-white">
                      <span className="mr-4 font-display text-xs font-medium tracking-[0.2em] text-white/40">Q{i + 1}</span>
                      {i === 2 ? <Circled accent="orange" seed={21} delay={0.6}>{q}</Circled> : q}
                    </li>
                  ))}
              </ul>
              <div className="mt-8 flex items-end gap-3">
                <Arrow variant="curve" className="w-24 -scale-x-100 text-orange" delay={0.8} />
                <p className="pb-2 font-serif text-lg italic text-white/85">Bring your honest questions. We&apos;d love the conversation.</p>
              </div>
              <div className="mt-6">
                <TextLink href="/articles/" tone="white">Read the Dear Atheist letters</TextLink>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 04 */}
        <Reveal className="relative mt-6 grid items-end gap-10 overflow-hidden rounded-[2rem] bg-pale/80 p-8 ring-1 ring-navy/5 md:grid-cols-12 md:p-12">
          <div className="md:col-span-6">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-2">04</span>
            <h3 className="mt-8 display-sm text-navy">{discipleship.title}</h3>
            {discipleship.paragraphs.map((para, j) => (
              <p key={j} className="mt-4 max-w-xl leading-relaxed text-ink-2">{para}</p>
            ))}
            {withLink && (
              <div className="mt-8">
                <TextLink href="/teachings/">Find our teachings on Telegram</TextLink>
              </div>
            )}
          </div>
          <div className="md:col-span-6">
            <Mountains className="w-full text-navy/60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaithMark() {
  return (
    <svg viewBox="0 0 120 80" className="w-32 text-navy/60" aria-hidden="true">
      <path d="M8 70 C30 66 46 52 60 30 C74 52 90 66 112 70" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M60 30 L60 6" fill="none" stroke="var(--color-orange)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M52 14 L60 5 L68 14" fill="none" stroke="var(--color-orange)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 76 L100 76" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" />
    </svg>
  );
}
