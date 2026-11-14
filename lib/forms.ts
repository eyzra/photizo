"use client";

import { useState } from "react";
import { site } from "./site";

export type FormName = "contact" | "immersion" | "question";
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Sends a form to the Google Apps Script web app, which writes it to the Google Sheet.
 * The body is sent as text/plain so the browser makes a simple request that Apps Script accepts.
 * If no endpoint is set yet, the message opens in the visitor's email app instead, so nothing is lost.
 */
export function useFormSubmit(form: FormName, fallbackSubject: (d: Record<string, string>) => string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(el: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(el).entries()) as Record<string, string>;
    setError("");

    if (!site.formsEndpoint) {
      const body = Object.entries(data)
        .filter(([k, v]) => v && k !== "website")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `${site.emailHref}?subject=${encodeURIComponent(fallbackSubject(data))}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ form, ...data, page: window.location.href }),
      });
      const out = await res.json().catch(() => ({ ok: res.ok }));
      if (!out.ok) throw new Error(out.error || "Something went wrong");
      setStatus("sent");
      el.reset();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return { status, error, submit, reset: () => setStatus("idle") };
}
