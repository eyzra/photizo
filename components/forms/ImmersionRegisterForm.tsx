"use client";

import type { FormEvent } from "react";
import { useFormSubmit } from "@/lib/forms";
import { Honeypot, Input, Select, Sent, SubmitRow } from "./Fields";

const heardOptions = [
  "WhatsApp",
  "Telegram",
  "A friend or family member",
  "My church or fellowship",
  "A flyer or poster",
  "Instagram, Facebook or X",
  "I've attended IMMERSION before",
  "Other",
] as const;

/** Registration for the next IMMERSION. Entries go to the "IMMERSION Registration" tab. */
export function ImmersionRegisterForm({ edition }: { edition: string }) {
  const { status, error, submit, reset } = useFormSubmit("immersion", (d) => `IMMERSION registration: ${d.name || ""}`);

  if (status === "sent") {
    return (
      <Sent
        tone="dark"
        title="You're registered."
        body={`Thank you for registering for ${edition}. Check your email for a confirmation. We look forward to seeing you.`}
        onAgain={reset}
        againLabel="Register someone else"
      />
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <input type="hidden" name="edition" value={edition} />
      <Input tone="dark" label="Full name" name="name" required autoComplete="name" placeholder="Your name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input tone="dark" label="Phone number" name="phone" type="tel" required autoComplete="tel" placeholder="+234" />
        <Input tone="dark" label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>
      <Select tone="dark" label="How did you hear about IMMERSION?" name="heard" options={heardOptions} />
      <SubmitRow tone="dark" label="Register" status={status} error={error} note="You'll get a confirmation email." />
    </form>
  );
}
