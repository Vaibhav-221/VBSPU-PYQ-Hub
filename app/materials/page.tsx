import type { Metadata } from "next";
import { ArrowRight, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Study materials",
  description: "This page is under maintenance. Study materials will be added soon.",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-5 py-16 md:px-10 lg:py-24">
      <section
        aria-labelledby="maintenance-title"
        className="reveal w-full max-w-2xl rounded-2xl border border-white/[0.09] bg-[#080808] px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300">
          <Construction size={24} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Study materials
        </p>
        <h1
          id="maintenance-title"
          className="mt-3 text-3xl font-medium tracking-[-0.055em] text-white sm:text-4xl"
        >
          This page is under maintenance.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
          We&apos;ll add this feature after some time.
        </p>
        <Button href="/semesters" className="mt-7 rounded-full px-6">
          Explore PYQs <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </section>
    </div>
  );
}
