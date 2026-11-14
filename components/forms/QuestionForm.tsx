"use client";

import type { FormEvent } from "react";
import { useFormSubmit } from "@/lib/forms";
import { Honeypot, Input, Sent, SubmitRow, TextArea } from "./Fields";

/** Dear Atheist question box. Entries go to the "Dear Atheist Questions" tab. */
export function QuestionForm() {
  const { status, error, submit, reset } = useFormSubmit("question", () => "A question for Dear Atheist");

  if (status === "sent") {
    return <Sent tone="dark" title="Thank you for asking." body="Your question is in. It may shape a future letter." onAgain={reset} againLabel="Ask another question" />;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <TextArea tone="dark" label="Your question" name="question" required rows={4} placeholder="The question that keeps you from believing, or the one you get asked most" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input tone="dark" label="Name" name="name" autoComplete="name" placeholder="Leave blank to stay anonymous" />
        <Input tone="dark" label="Email" name="email" type="email" autoComplete="email" placeholder="For a thank-you note" />
      </div>
      <SubmitRow tone="dark" label="Send question" status={status} error={error} />
    </form>
  );
}
