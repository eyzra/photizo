"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

function CopyRow({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the value stays visible to copy by hand */
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-5 last:border-0">
      <div className="min-w-0">
        <dt className="eyebrow text-cyan">{label}</dt>
        <dd className={`mt-1.5 font-display font-bold tracking-[-0.02em] text-white ${big ? "text-[clamp(1.9rem,4vw,2.8rem)] tabular-nums" : "text-xl"}`}>{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:border-orange hover:bg-orange hover:text-navy"
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

/** The ministry's bank account, each line copyable with one tap. */
export function BankCard() {
  const { accountNumber, bankName, accountName } = site.bank;
  return (
    <dl>
      <CopyRow label="Account number" value={accountNumber} big />
      <CopyRow label="Bank" value={bankName} />
      <CopyRow label="Account name" value={accountName} />
    </dl>
  );
}
