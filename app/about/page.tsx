import type { Metadata } from "next";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Circled, Halo, Mountains, SunBurst, Underline } from "@/components/sketches";
import { Button, TextLink } from "@/components/Button";
import { Invitation } from "@/components/Invitation";
import { dna, pillars } from "@/lib/content";
import { joinCommunityHref } from "@/lib/site";
import { Photo } from "@/components/Photo";
import { BrandLogo } from "@/components/Logo";
import { founderPortrait, gatherings, headshot } from "@/lib/media";
import { essenceOfDevotion } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Photizo Global is a Christian teaching and discipleship ministry founded by Ezra Anya, and home of The Illumination Church. Our mandate: Till All Men See Jesus.",
};

const matters = [
  "We want Jesus to remain at the centre of everything we teach and do.",
  "We want our members to develop a personal understanding of the Scriptures, grow in their devotion to God and learn to love people well.",
  "We also believe that spiritual growth takes time. That's why we value patient teaching, meaningful relationships, accountability and opportunities to serve.",
  "Our hope is that everyone who becomes part of this family will continue to grow in the knowledge of Jesus and help others discover Him too.",
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]" />
        <SunBurst className="pointer-events-none absolute -right-40 top-10 w-[46rem] text-navy/10" />
        <div className="container-x relative grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Who We Are</Eyebrow>
            <MaskedText as="h1" id="about-title" trigger="mount" delay={0.15} className="display-xl mt-8 max-w-[14ch] text-navy">
              Knowing Jesus. Making Him known.
            </MaskedText>
            <Reveal delay={0.5}>
              <p className="editorial mt-10 max-w-2xl text-ink-2">
                Photizo Global is a Christian teaching and discipleship ministry founded by Ezra Anya. The Illumination Church is our church expression, a family gathered around the Word, prayer and the person of Jesus.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.35} className="relative lg:col-span-4 lg:col-start-9">
            <Photo photo={headshot} className="aspect-[992/1072] max-w-[440px]" priority caption="Ezra Anya, Founder" />
            <BrandLogo variant="badge" decorative className="absolute -bottom-10 -left-10 hidden w-32 animate-spin-slower text-orange lg:block" />
          </Reveal>
        </div>
      </section>

      {/* The name */}
      <section aria-labelledby="name-heading" className="relative py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>The Name</Eyebrow>
            <h2 id="name-heading" className="mt-8 font-display text-[clamp(3.5rem,9vw,8rem)] font-bold leading-[0.85] tracking-[-0.06em] text-navy">
              <Circled seed={31}>φωτίζω</Circled>
            </h2>
            <p className="mt-6 font-display text-sm uppercase tracking-[0.22em] text-ink-2">photizo · to illuminate, to give light</p>
            <Reveal delay={0.2}>
              <BrandLogo variant="badge" label="Photizo Global badge, established 2025" className="mt-14 w-36 text-navy md:w-44" />
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="editorial text-navy">
                The name <em>Photizo</em> comes from a Greek word meaning to illuminate or give light. It captures our desire to see the light of God&apos;s Word reach people&apos;s hearts and bring them into a clearer understanding of Jesus.
              </p>
              <p className="editorial mt-6 text-ink-2">
                We are inspired by Acts 26:18 and the prayer of Paul in Ephesians 1:17–18, that the eyes of our understanding would be enlightened.
              </p>
              <p className="editorial mt-6 text-ink-2">
                We believe that the Scriptures reveal the person, character and work of Christ. As people encounter Him through His Word and the ministry of the Holy Spirit, they are transformed and equipped to live for His glory.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mandate */}
      <section aria-labelledby="mandate-heading" className="relative overflow-hidden bg-navy py-28 text-white md:py-40">
        <div className="grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-cyan/20 blur-3xl" />
        <Halo className="pointer-events-none absolute -right-24 top-1/2 w-[46rem] -translate-y-1/2 text-white/20" accent="orange" />
        <div className="container-x relative">
          <Eyebrow tone="light">Our Mandate</Eyebrow>
          <MaskedText as="h2" id="mandate-heading" className="mt-8 font-display text-[clamp(3.2rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.06em]">
            Till all men see <span className="text-orange">Jesus.</span>
          </MaskedText>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="font-serif text-xl leading-relaxed text-white/85">
                Our vision is simple: to see people everywhere come to know Jesus, understand who He is and experience the transforming power of His Word. When people see Jesus clearly, it changes how they understand God, how they see themselves and how they live.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-white/70">We want to take this message to hearts, homes, campuses, communities and nations.</p>
              <p className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
                In every heart and every home, Jesus revealed and Jesus glorified.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Illumination Church + what matters */}
      <section aria-labelledby="church-heading" className="relative py-28 md:py-40">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Eyebrow>The Illumination Church</Eyebrow>
              <MaskedText as="h2" id="church-heading" className="display-md mt-6 text-navy">
                A family that takes the Word seriously and loves people well.
              </MaskedText>
              <Reveal>
                <p className="editorial mt-6 text-ink-2">
                  Our approach to ministry places strong emphasis on biblical teaching, intentional discipleship, prayer, fellowship and the demonstration of God&apos;s power. We want to raise believers who are spiritually mature, grounded in truth and equipped to serve God faithfully in every area of life.
                </p>
              </Reveal>
              <Photo photo={gatherings.hall} className="mt-10 aspect-[4/3]" />
            </div>
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {matters.map((m, i) => (
              <Reveal as="li" key={i} className="border-b border-navy/10 py-8 first:border-t">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-2">0{i + 1}</span>
                <p className="mt-3 font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold leading-snug tracking-[-0.02em] text-navy">{m}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars and values summary */}
      <section aria-labelledby="commit-heading" className="relative py-24 md:py-32">
        <div className="container-x">
          <Eyebrow>How We Pursue the Mandate</Eyebrow>
          <MaskedText as="h2" id="commit-heading" className="display-md mt-6 max-w-3xl text-navy">
            Four commitments and the values that carry them.
          </MaskedText>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.06} className="bg-white/85 p-8 backdrop-blur">
                <span className="font-display text-5xl font-bold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.2px_rgb(7_29_73/0.35)]">{p.no}</span>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-[-0.02em] text-navy">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{p.line}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {dna.map((d, i) => (
              <Reveal key={d.word} delay={i * 0.06} className="rounded-[2rem] bg-pale/80 p-8 ring-1 ring-navy/5">
                <p className="font-display text-3xl font-bold tracking-[-0.04em] text-navy">
                  {d.word}<span className="text-orange">.</span>
                </p>
                <p className="mt-3 leading-relaxed text-ink-2">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section aria-labelledby="founder-heading" className="relative py-28 md:py-40">
        <div className="container-x grid items-center gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Photo photo={founderPortrait} className="aspect-[4/5]" priority />
          </Reveal>
          <div className="relative md:col-span-6 md:col-start-7">
            <Eyebrow>Meet the Founder</Eyebrow>
            <MaskedText as="h2" id="founder-heading" className="display-lg mt-6 text-navy">
              Ezra{" "}
              <span className="relative inline-block">
                Anya
                <Underline className="absolute -bottom-[0.1em] left-0 h-[0.2em] w-full" />
              </span>
            </MaskedText>
            <p className="mt-3 font-display text-sm uppercase tracking-[0.2em] text-ink-2">Founder, Photizo Global</p>
            <Reveal>
              <div className="editorial mt-8 space-y-5 text-ink-2">
                <p className="text-navy">
                  Ezra Anya is a Christian teacher with a passion for helping people understand the Scriptures and grow in their knowledge of Jesus.
                </p>
                <p>
                  He is particularly interested in biblical interpretation, Christian discipleship and helping believers understand how the truth of God&apos;s Word applies to their everyday lives.
                </p>
                <p>
                  Through Photizo Global, he hopes to raise a generation of believers who know Jesus deeply, live faithfully and are equipped to make Him known. His desire is to see people grow in spiritual maturity and discover the joy of knowing God through His Word.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="relative mt-10 border-l-2 border-orange pl-6 font-serif text-xl italic leading-snug text-navy">
                &ldquo;{essenceOfDevotion.quotes[3]}&rdquo;
                <footer className="mt-3 font-display text-xs font-semibold not-italic uppercase tracking-[0.2em] text-ink-2">From The Essence of Devotion</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey so far */}
      <section aria-labelledby="journey-heading" className="relative py-20">
        <div className="container-x flex flex-col justify-between gap-8 rounded-[2rem] bg-navy p-10 text-white md:flex-row md:items-center md:p-14">
          <div>
            <Eyebrow tone="light">Our Journey So Far</Eyebrow>
            <h2 id="journey-heading" className="display-sm mt-4 max-w-xl">
              Three IMMERSION camp meetings across Minna and Abuja since 2024. Faith Fundamentals comes to Minna this December.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/immersion/" variant="primary">Explore IMMERSION</Button>
            <Button href={joinCommunityHref} variant="ghost-light">Join the Community</Button>
          </div>
        </div>
        <div className="container-x mt-10">
          <TextLink href="/beliefs/">Read what we believe</TextLink>
        </div>
      </section>

      <Invitation />
    </>
  );
}
