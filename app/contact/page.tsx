import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact the VBSPU PYQ Hub team with questions, corrections, or resource suggestions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <div className="reveal max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Contact</p>
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.065em] text-white">Let’s make studying easier.</h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">Found an issue, missing paper, or have an idea for the hub? Send a note and we’ll get back to you.</p>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] lg:grid-cols-[.8fr_1.2fr]">
        <aside className="interactive-card bg-[#080808] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">Contact information</p>
          <div className="mt-7 space-y-5">
            <a href="mailto:vaibhavsingh56326@gmail.com" className="flex items-start gap-3 text-sm text-zinc-200 transition hover:text-white">
              <Mail className="mt-0.5 text-zinc-400" size={17} />
              <span><span className="block font-medium">Email us</span><span className="mt-1 block text-xs text-slate-500">vaibhavsingh56326@gmail.com</span></span>
            </a>
            <a href="https://www.vbspu.ac.in/en" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-zinc-200 transition hover:text-white">
              <MapPin className="mt-0.5 text-zinc-400" size={17} />
              <span><span className="block font-medium">Veer Bahadur Singh Purvanchal University</span><span className="mt-1 block text-xs text-slate-500">Jaunpur, Uttar Pradesh</span></span>
            </a>
            <div className="flex items-start gap-3 text-sm text-zinc-200">
              <MessageCircle className="mt-0.5 text-zinc-400" size={17} />
              <span><span className="block font-medium">Corrections welcome</span><span className="mt-1 block text-xs leading-5 text-slate-500">Tell us if a paper or subject needs an update.</span></span>
            </div>
          </div>
          <a href="https://github.com/Vaibhav-221/VBSPU-PYQ-Hub/issues" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white">Report an issue on GitHub <ArrowUpRight size={14} /></a>
        </aside>
        <section className="interactive-card bg-[#080808] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Send a message</h2>
          <p className="mt-2 mb-6 text-sm text-slate-400">We typically respond as soon as we can.</p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
