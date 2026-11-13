import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Headphones, Video } from "lucide-react";
import { getTeaching, teachings } from "@/lib/teachings";
import { MaskedText, Reveal } from "@/components/Reveal";
import { Eyebrow, PendingNote } from "@/components/ui";
import { Blueprint } from "@/components/sketches";
import { Button } from "@/components/Button";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return teachings.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTeaching(slug);
  if (!t) return {};
  return { title: t.title, description: t.summary, robots: t.sample ? { index: false } : undefined };
}

export default async function TeachingPage({ params }: Props) {
  const { slug } = await params;
  const t = getTeaching(slug);
  if (!t) notFound();
  const others = teachings.filter((o) => o.slug !== t.slug && o.category === t.category).slice(0, 2);

  return (
    <article className="relative pb-28 pt-32 md:pt-44">
      <Blueprint className="pointer-events-none absolute -right-24 top-24 w-[520px] text-navy/15" label={t.category} />
      <div className="container-x relative">
        <Link href="/teachings/" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-2 hover:text-navy">
          <ArrowLeft className="size-4" aria-hidden="true" /> All teachings
        </Link>
        <div className="mt-10 max-w-4xl">
          <Eyebrow>{`${t.category} · ${t.format}`}</Eyebrow>
          <MaskedText as="h1" trigger="mount" className="display-lg mt-6 text-navy">
            {t.title}
          </MaskedText>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-display text-sm text-ink-2">
            {t.speaker && (<div><dt className="sr-only">Speaker</dt><dd>{t.speaker}</dd></div>)}
            {t.date && (<div><dt className="sr-only">Date</dt><dd>{new Date(t.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</dd></div>)}
            {t.scripture && (<div><dt className="sr-only">Scripture</dt><dd>{t.scripture}</dd></div>)}
          </dl>
          {t.sample && <div className="mt-6"><PendingNote>Sample entry. Replace with a real teaching.</PendingNote></div>}
        </div>

        {/* Media */}
        <Reveal className="mt-14 max-w-4xl">
          {t.videoUrl ? (
            <div className="aspect-video overflow-hidden rounded-[1.75rem] bg-navy">
              <iframe src={t.videoUrl} title={t.title} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : t.audioUrl ? (
            <audio controls src={t.audioUrl} className="w-full" />
          ) : (
            <div className="flex aspect-[16/7] flex-col items-center justify-center gap-4 rounded-[1.75rem] bg-pale/80 text-center ring-1 ring-navy/5">
              <div className="flex gap-3 text-navy/50">
                <Video className="size-6" aria-hidden="true" />
                <Headphones className="size-6" aria-hidden="true" />
              </div>
              <p className="font-display text-sm text-ink-2">Video or audio for this teaching will appear here.</p>
            </div>
          )}
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="font-serif text-2xl leading-snug text-navy">{t.summary}</p>
            <div className="editorial mt-8 space-y-6 text-ink-2">
              {t.body?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {t.downloadUrl && (
              <div className="mt-10">
                <Button href={t.downloadUrl} variant="dark" icon={<Download className="size-4" />}>Download resource</Button>
              </div>
            )}
          </Reveal>
          <aside className="lg:col-span-4">
            <div className="rounded-[1.75rem] bg-navy p-8 text-white">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Questions about this teaching?</p>
              <p className="mt-3 text-sm text-white/70">Send us a message. We&apos;d love to hear what you&apos;re thinking about.</p>
              <div className="mt-6">
                <Button href={whatsappLink(`Hello Photizo Global, I have a question about "${t.title}".`)} variant="primary">Message us</Button>
              </div>
            </div>
            {others.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow text-ink-2">More in {t.category}</p>
                <ul className="mt-4 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}><Link href={`/teachings/${o.slug}/`} className="font-display font-semibold text-navy hover:text-ink-2">{o.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
