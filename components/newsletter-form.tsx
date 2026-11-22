"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export function NewsletterForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("Newsletter signup isn’t configured yet. Please contact us by email.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const formData = new FormData(form);
      formData.set("access_key", accessKey);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Newsletter signup failed.");
      }
      form.reset();
      setStatus("You’re subscribed. Thanks!");
    } catch (error) {
      console.error("Newsletter signup failed:", error);
      setStatus(error instanceof Error ? error.message : "Could not subscribe. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6">
      <form className="flex gap-2" onSubmit={submit}>
        <input className="form-input min-w-0" type="email" name="email" required placeholder="Email address" aria-label="Email address" />
        <button className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white text-black transition hover:bg-zinc-200 disabled:opacity-50" disabled={busy} aria-label="Subscribe">
          {busy ? <LoaderCircle className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>
      <p className="mt-2 min-h-4 text-[11px] text-slate-500" aria-live="polite">{status || "Get a note when new papers are added."}</p>
    </div>
  );
}
