"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useFormSubmit } from "@/lib/forms";
import { Honeypot, Input, Select, Sent, SubmitRow, TextArea } from "./forms/Fields";

export const contactTopics = [
  "General enquiry",
  "Prayer request",
  "Ministry invitation",
  "Our meetings",
  "IMMERSION",
  "Partnership and giving",
  "Question about a teaching",
] as const;

/** Contact and prayer form. Entries go to the "Contact & Prayer" tab of the Google Sheet. */
export function ContactForm() {
  const { status, error, submit, reset } = useFormSubmit("contact", (d) => `${d.topic || "Message"}: ${d.name || ""}`);
  const [topic, setTopic] = useState<string>(contactTopics[0]);

  // Pages can link here with ?topic=… to preselect the topic
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && (contactTopics as readonly string[]).includes(t)) setTopic(t);
  }, []);

  if (status === "sent") {
    return <Sent title="Thank you. Your message is in." body="We've received it and someone from the team will get back to you soon. Check your email for a confirmation." onAgain={reset} />;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Full name" name="name" required autoComplete="name" placeholder="Your name" />
        <Input label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+234" />
        <Select key={topic} label="What is this about?" name="topic" options={contactTopics} defaultValue={topic} required />
      </div>
      <TextArea label="Your message" name="message" required rows={6} placeholder="How can we help or pray with you?" />
      <SubmitRow label="Send Message" status={status} error={error} note="We'll reply by email. Prayer requests are kept with the team." />
    </form>
  );
}
