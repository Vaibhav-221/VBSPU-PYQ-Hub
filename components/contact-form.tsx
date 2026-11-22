"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactResponse = {
  error?: string;
};

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      const result = (await response.json()) as ContactResponse;
      if (!response.ok) {
        throw new Error(result.error || "We couldn’t send your message. Please try again.");
      }

      form.reset();
      setStatus("Message sent. Thanks for getting in touch!");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus(
        error instanceof Error
          ? error.message
          : "We couldn’t send your message. Please try again or email us directly.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-xs font-medium text-slate-300">
        Your name
        <input
          required
          name="name"
          autoComplete="name"
          maxLength={120}
          className="form-input mt-2"
          placeholder="How should we address you?"
        />
      </label>
      <label className="block text-xs font-medium text-slate-300">
        Email address
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          className="form-input mt-2"
          placeholder="you@example.com"
        />
      </label>
      <label className="block text-xs font-medium text-slate-300">
        Message
        <textarea
          required
          name="message"
          rows={5}
          maxLength={5000}
          className="form-input mt-2 resize-y"
          placeholder="Tell us how we can help…"
        />
      </label>
      <div
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Leave this field empty
          <input
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <Button type="submit" disabled={sending} className="w-full">
        {sending ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <Send size={15} />
        )}
        {sending ? "Sending…" : "Send message"}
      </Button>
      <p className="min-h-5 text-xs text-slate-400" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
