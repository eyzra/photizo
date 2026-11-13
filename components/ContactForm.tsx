"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { site } from "@/lib/site";

const topics = ["General enquiry", "Prayer request", "Ministry invitation", "Our meetings", "IMMERSION", "Partnership and giving"];

/**
 * Static-site friendly form. It composes the message and opens it in the
 * visitor's email app or in WhatsApp, so nothing depends on a server.
 * To collect submissions directly later, point the form at a service such as Formspree.
 */
export function ContactForm() {
  const [via, setVia] = useState<"email" | "whatsapp">("whatsapp");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const topic = String(fd.get("topic") || "");
    const message = String(fd.get("message") || "").trim();
    const text = `${topic}\n\n${message}\n\nFrom: ${name}${email ? ` (${email})` : ""}`;
    const url =
      via === "email"
        ? `${site.emailHref}?subject=${encodeURIComponent(`${topic}: ${name}`)}&body=${encodeURIComponent(text)}`
        : `${site.whatsapp}?text=${encodeURIComponent(`Hello Photizo Global.\n\n${text}`)}`;
    window.open(url, via === "email" ? "_self" : "_blank", "noopener");
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-2xl border border-navy/15 bg-white/80 px-5 py-4 font-display text-navy outline-none backdrop-blur transition-colors placeholder:text-ink-2/50 focus:border-navy";

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="form-note">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-display text-sm font-semibold text-navy">Full name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="font-display text-sm font-semibold text-navy">Email address <span className="font-normal text-ink-2">(optional)</span></span>
          <input name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="block">
        <span className="font-display text-sm font-semibold text-navy">What is this about?</span>
        <select name="topic" className={`${field} appearance-none`} defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="font-display text-sm font-semibold text-navy">Your message</span>
        <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="How can we help or pray with you?" />
      </label>

      <fieldset>
        <legend className="font-display text-sm font-semibold text-navy">Send with</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { v: "whatsapp" as const, label: "WhatsApp", Icon: MessageCircle },
            { v: "email" as const, label: "Email", Icon: Mail },
          ].map(({ v, label, Icon }) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="via" value={v} checked={via === v} onChange={() => setVia(v)} className="peer sr-only" />
              <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 font-display text-sm font-medium text-navy transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange">
                <Icon className="size-4" aria-hidden="true" /> {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="inline-flex items-center gap-2.5 rounded-full bg-orange px-7 py-4 font-display font-semibold text-navy transition-colors hover:bg-[#ff9338]">
          Send Message <Send className="size-4" aria-hidden="true" />
        </button>
        <p id="form-note" className="max-w-xs text-sm text-ink-2" aria-live="polite">
          {sent ? "Your message is ready in " + (via === "email" ? "your email app." : "WhatsApp.") + " Just press send there." : "Your message opens in WhatsApp or your email app, ready to send."}
        </p>
      </div>
    </form>
  );
}
