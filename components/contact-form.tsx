"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const publicKey =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "GRT0ChZ_TnyQdtNg6";
const serviceId =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ldsch2g";
const templateId =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_2lmfazk";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    setSending(true);
    setStatus("");
    try {
      await emailjs.sendForm(serviceId, templateId, form, {
        publicKey,
      });
      form.reset();
      setStatus("Message sent. Thanks for getting in touch!");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("We couldn’t send your message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-xs font-medium text-slate-300">
        Your name
        <input required name="name" autoComplete="name" className="form-input mt-2" placeholder="How should we address you?" />
      </label>
      <label className="block text-xs font-medium text-slate-300">
        Email address
        <input required name="email" type="email" autoComplete="email" className="form-input mt-2" placeholder="you@example.com" />
      </label>
      <label className="block text-xs font-medium text-slate-300">
        Message
        <textarea required name="message" rows={5} className="form-input mt-2 resize-y" placeholder="Tell us how we can help…" />
      </label>
      <Button type="submit" disabled={sending} className="w-full">
        {sending ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={15} />}
        {sending ? "Sending…" : "Send message"}
      </Button>
      <p className="min-h-5 text-xs text-slate-400" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
