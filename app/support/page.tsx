import type { Metadata } from "next";
import { BookOpenText, Heart, LockKeyhole, ShieldCheck } from "lucide-react";
import { SupportCheckout } from "@/components/support-checkout";
import { TypewriterWord } from "@/components/typewriter-word";

const supportWords = ["open", "free", "alive"];

export const metadata: Metadata = {
  title: "Support the hub",
  description: "Voluntarily support the VBSPU PYQ Hub so it can remain free for students.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Support the project</p>
          <div className="mt-5 inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-zinc-300">
            <ShieldCheck size={14} /> 100% free for students
          </div>
          <h1
            aria-label="Keep the archive open to all."
            className="mt-6 max-w-2xl text-[clamp(3rem,6vw,5.75rem)] font-medium leading-[0.92] tracking-[-0.065em] text-white"
          >
            Keep the archive{" "}
            <span className="text-zinc-400">
              <TypewriterWord words={supportWords} />
              <span aria-hidden="true"> to all.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
            Every paper stays free. If the hub has helped with your preparation,
            a voluntary contribution can help cover hosting and maintenance.
          </p>
          <div className="reveal reveal-delay-2 mt-9 grid max-w-2xl gap-px overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2">
            <div className="interactive-card border border-transparent bg-[#080808] p-5">
              <Heart className="text-zinc-300" size={18} />
              <p className="mt-4 text-sm font-medium text-white">Always optional</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">No content is locked behind a payment.</p>
            </div>
            <div className="interactive-card border border-transparent bg-[#080808] p-5">
              <LockKeyhole className="text-zinc-300" size={18} />
              <p className="mt-4 text-sm font-medium text-white">Secure checkout</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">Payments are handled by Razorpay.</p>
            </div>
          </div>
        </div>
        <section className="reveal reveal-delay-3 border border-white/[0.09] bg-[#080808] p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.04] text-zinc-300"><BookOpenText size={20} /></div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Support VBSPU PYQ Hub</p>
          <h2 className="mt-3 text-5xl font-medium tracking-[-0.06em] text-white">₹19</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">A small voluntary contribution to help keep the project maintained and available.</p>
          <SupportCheckout />
          <p className="mt-4 text-center text-[11px] leading-5 text-zinc-600">Secure payment via Razorpay · No sign-up needed · Contributions are voluntary</p>
        </section>
      </div>
    </div>
  );
}
