import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Button } from "@/components/Button";
import { teachings } from "@/lib/teachings";
import { asset, preaching, srcSetFor } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teachings",
  description: "Photizo Global teachings are shared on Telegram at @photizoonline. Read The Essence of Devotion, an ILLUMINATE teaching by Ezra Anya.",
};

/**
 * The full teaching library is paused until recordings and notes are ready to upload.
 * Teachings live on Telegram for now. To bring the searchable library back, render
 * <TeachingLibrary /> from components/TeachingLibrary.tsx here once lib/teachings.ts has entries.
 */
export default function TeachingsPage() {
  const live = teachings.filter((t) => !t.sample);
  return (
    <>
      <PageHero
        eyebrow="Teachings"
        title="Our teachings live on Telegram."
        art={
          <div className="ml-auto mt-24 hidden w-[min(34vw,420px)] overflow-hidden rounded-[2rem] lg:block">
            <img src={asset(preaching.two.src)} srcSet={srcSetFor(preaching.two)} sizes="420px" alt={preaching.two.alt} className="aspect-[3/4] w-full object-cover" />
          </div>
        }
        intro={
          <p>
            Recordings, notes and daily meditations from ILLUMINATE, INTENSIFY and our other gatherings are shared on our Telegram channel, {site.telegramHandle}. Join to listen, read along and catch every new teaching as it goes up.
          </p>
        }
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.telegram} variant="primary" size="lg" icon={<Send className="size-4" />}>Open Telegram</Button>
          <Button href={site.whatsappChannel} variant="outline" size="lg">Follow the WhatsApp channel</Button>
        </div>
      </PageHero>

      {live.length > 0 && (
        <section aria-labelledby="featured-heading" className="relative pb-20 md:pb-28">
          <div className="container-x">
            <Eyebrow>Read Here</Eyebrow>
            <h2 id="featured-heading" className="display-sm mt-5 text-navy">From ILLUMINATE</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {live.map((t) => (
                <Reveal as="li" key={t.slug}>
                  <Link href={`/teachings/${t.slug}/`} className="group grid overflow-hidden rounded-[2rem] bg-navy text-white ring-1 ring-navy sm:grid-cols-[42%_1fr]">
                    {t.image && (
                      <div className="relative aspect-square overflow-hidden sm:aspect-auto">
                        <img src={asset(t.image.src)} alt={t.image.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="flex flex-col p-8">
                      <p className="eyebrow text-cyan">{t.category}</p>
                      <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.03em]">{t.title}</h3>
                      {t.speaker && <p className="mt-2 font-serif italic text-white/70">with {t.speaker}</p>}
                      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-white/75">{t.summary}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-orange">
                        Read the key thoughts <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
