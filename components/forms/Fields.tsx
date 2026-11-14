"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { ReactNode } from "react";

export type Tone = "light" | "dark";

const fieldCls = (tone: Tone) =>
  `mt-2 w-full rounded-2xl border px-5 py-4 font-display outline-none transition-colors ${
    tone === "dark"
      ? "border-white/20 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-orange"
      : "border-navy/15 bg-white text-navy placeholder:text-ink-2/50 focus:border-navy"
  }`;

function Label({ label, optional, tone, children }: { label: string; optional?: boolean; tone: Tone; children: ReactNode }) {
  return (
    <label className="block">
      <span className={`font-display text-sm font-semibold ${tone === "dark" ? "text-white" : "text-navy"}`}>
        {label} {optional && <span className={`font-normal ${tone === "dark" ? "text-white/50" : "text-ink-2"}`}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

export function Input({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  tone = "light",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  tone?: Tone;
}) {
  return (
    <Label label={label} optional={!required} tone={tone}>
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className={fieldCls(tone)} />
    </Label>
  );
}

export function Select({
  label,
  name,
  options,
  defaultValue,
  required,
  tone = "light",
}: {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
  tone?: Tone;
}) {
  return (
    <Label label={label} optional={!required} tone={tone}>
      <select name={name} required={required} defaultValue={defaultValue ?? ""} className={`${fieldCls(tone)} appearance-none bg-[length:12px] bg-[right_1.25rem_center] bg-no-repeat`}>
        {!defaultValue && (
          <option value="" disabled>
            Choose one
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="text-navy">
            {o}
          </option>
        ))}
      </select>
    </Label>
  );
}

export function TextArea({ label, name, required, placeholder, rows = 5, tone = "light" }: { label: string; name: string; required?: boolean; placeholder?: string; rows?: number; tone?: Tone }) {
  return (
    <Label label={label} optional={!required} tone={tone}>
      <textarea name={name} required={required} rows={rows} placeholder={placeholder} className={`${fieldCls(tone)} resize-y`} />
    </Label>
  );
}

/** Hidden from people, tempting to bots. Entries that fill it are dropped by the script. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitRow({ label, status, error, tone = "light", note }: { label: string; status: string; error: string; tone?: Tone; note?: string }) {
  const sending = status === "sending";
  return (
    <div className="flex flex-wrap items-center gap-5">
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2.5 rounded-full bg-orange px-7 py-4 font-display font-semibold text-navy transition-colors hover:bg-[#ff9338] disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {sending ? "Sending" : label}
      </button>
      <p className={`max-w-xs text-sm ${tone === "dark" ? "text-white/60" : "text-ink-2"}`} aria-live="polite" role={status === "error" ? "alert" : undefined}>
        {status === "error" ? (
          <span className="text-orange">That didn&apos;t go through ({error}). Please try again in a moment.</span>
        ) : (
          note
        )}
      </p>
    </div>
  );
}

export function Sent({ title, body, onAgain, tone = "light", againLabel = "Send another" }: { title: string; body: string; onAgain: () => void; tone?: Tone; againLabel?: string }) {
  const dark = tone === "dark";
  return (
    <div role="status" className={`rounded-[1.75rem] p-8 md:p-10 ${dark ? "bg-white/[0.06] ring-1 ring-white/15" : "bg-pale ring-1 ring-navy/5"}`}>
      <CheckCircle2 className="size-10 text-orange" strokeWidth={1.5} aria-hidden="true" />
      <p className={`mt-5 font-display text-2xl font-bold tracking-[-0.02em] ${dark ? "text-white" : "text-navy"}`}>{title}</p>
      <p className={`mt-3 leading-relaxed ${dark ? "text-white/75" : "text-ink-2"}`}>{body}</p>
      <button type="button" onClick={onAgain} className={`mt-6 font-display text-sm font-semibold underline underline-offset-4 ${dark ? "text-white" : "text-navy"}`}>
        {againLabel}
      </button>
    </div>
  );
}
