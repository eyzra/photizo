import Link from "next/link";
import { BrandLogo, Logo } from "./Logo";
import { footerNav, joinCommunityHref, site } from "@/lib/site";
import { pledge } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="dot-field-light pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
      <div className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full bg-cyan/15 blur-3xl" />
      <BrandLogo variant="badge" decorative className="pointer-events-none absolute -right-16 -top-20 w-[18rem] animate-spin-slower text-white/[0.08] md:-right-10 md:-top-16 md:w-[26rem]" />

      <div className="container-x relative pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cyan">Our Pledge</p>
            <blockquote className="mt-6 space-y-3 font-serif text-[1.35rem] italic leading-snug text-white/90 md:text-[1.75rem]">
              {pledge.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </blockquote>
          </div>
          <div className="grid gap-10 sm:grid-cols-[1fr_1.5fr] lg:col-span-5 lg:pl-6">
            <div>
              <p className="eyebrow text-white/50">Explore</p>
              <ul className="mt-5 space-y-2.5 font-display text-[0.95rem]">
                {footerNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/75 transition-colors hover:text-orange">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/50">Reach us</p>
              <ul className="mt-5 space-y-2.5 font-display text-[0.95rem] text-white/75">
                <li><a href={site.phoneHref} className="hover:text-orange">{site.phoneDisplay}</a></li>
                <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-orange">WhatsApp</a></li>
                <li><a href={site.emailHref} className="hover:text-orange [overflow-wrap:anywhere]">{site.email}</a></li>
                <li><a href={joinCommunityHref} target="_blank" rel="noopener noreferrer" className="hover:text-orange">Join the Community</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden="true" className="mt-24 select-none font-display text-[clamp(2.6rem,10.4vw,10rem)] font-bold leading-[0.85] tracking-[-0.055em] text-white">
          TILL ALL MEN
          <br />
          SEE <span className="text-orange">JESUS.</span>
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group w-fit" aria-label={`${site.name} home`}>
            <Logo tone="white" />
          </Link>
          <p className="font-display text-sm text-white/55">
            Photizo Global and The Illumination Church. Helping people know Jesus, understand His Word and become more like Him.
          </p>
          <p className="font-display text-sm text-white/55">© {new Date().getFullYear()} Photizo Global</p>
        </div>
      </div>
    </footer>
  );
}
