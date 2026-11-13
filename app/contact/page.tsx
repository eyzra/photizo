import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { Constellation } from "@/components/sketches";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { joinCommunityHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Prayer requests, ministry invitations, questions about our meetings or general enquiries. Call or WhatsApp ${site.phoneDisplay} or email ${site.email}.`,
};

const channels = [
  { label: "Phone", value: site.phoneDisplay, href: site.phoneHref, Icon: Phone },
  { label: "WhatsApp", value: site.phoneDisplay, href: site.whatsapp, Icon: MessageCircle },
  { label: "Email", value: site.email, href: site.emailHref, Icon: Mail },
  { label: "Telegram", value: site.telegramHandle, href: site.telegram, Icon: Send },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you."
        art={<Constellation className="w-full text-navy/40" />}
        intro={<p>For prayer requests, ministry invitations, questions about our meetings or general enquiries, reach out through any of the channels below.</p>}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.whatsapp} variant="primary" size="lg" icon={<MessageCircle className="size-4" />}>Chat With Us on WhatsApp</Button>
          <Button href={site.emailHref} variant="outline" size="lg" icon={<Mail className="size-4" />}>Send Us an Email</Button>
        </div>
      </PageHero>

      <section aria-label="Contact channels and form" className="relative pb-28 md:pb-40">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {channels.map(({ label, value, href, Icon }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 rounded-[1.75rem] bg-white/85 p-6 ring-1 ring-navy/10 backdrop-blur transition-all duration-500 hover:bg-navy hover:ring-navy"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-pale text-navy transition-colors duration-500 group-hover:bg-orange">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-ink-2 transition-colors group-hover:text-cyan">{label}</span>
                    <span className="mt-1 block font-display text-lg font-semibold text-navy transition-colors [overflow-wrap:anywhere] group-hover:text-white md:text-xl">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white">
                <div className="grain pointer-events-none absolute inset-0 opacity-25" />
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-cyan/25 blur-3xl" />
                <p className="relative eyebrow text-cyan">Stay Connected</p>
                <p className="relative mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
                  Teachings, updates, announcements and opportunities to grow together.
                </p>
                <div className="relative mt-6">
                  <Button href={joinCommunityHref} variant="primary">Join the Community</Button>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Send a Message</Eyebrow>
            <h2 className="display-sm mt-5 text-navy">Tell us how we can help or pray with you.</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
