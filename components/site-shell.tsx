import Link from "next/link";
import {
  BookOpenText,
  Github,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#050505]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:px-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-white" href="/">
            <BookOpenText className="text-zinc-300" size={18} />
            VBSPU PYQ Hub
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Free, organized exam resources for VBSPU students. Find previous
            papers, prepare with confidence, and share the hub with a friend.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Explore
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link className="hover:text-white" href="/semesters">Question papers</Link>
            <Link className="hover:text-white" href="/materials">Study materials</Link>
            <Link className="hover:text-white" href="/about">About the hub</Link>
            <Link className="hover:text-white" href="/support">Support Us</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Get updates
          </h2>
          <NewsletterForm />
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            About
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link className="inline-flex items-center gap-2 hover:text-white" href="/contact">
              <Mail size={15} /> Contact us
            </Link>
            <Link className="inline-flex items-center gap-2 hover:text-white" href="/privacy">
              <ShieldCheck size={15} /> Privacy policy
            </Link>
            <a
              className="inline-flex items-center gap-2 hover:text-white"
              href="https://github.com/Vaibhav-221/VBSPU-PYQ-Hub"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-5 py-5">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs text-slate-500">
          <p className="font-medium tracking-wide text-zinc-300">
            © {new Date().getFullYear()} VBSPU PYQ Hub
          </p>
          <span className="hidden text-zinc-700 sm:inline" aria-hidden="true">
            ·
          </span>
          <p>
            Designed and developed by{" "}
            <a
              className="font-medium text-zinc-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/60"
              href="https://www.linkedin.com/in/vaibhav-singh-a9200a2b9"
              target="_blank"
              rel="noreferrer"
            >
              Vaibhav Singh
            </a>
          </p>
          <span className="hidden text-zinc-700 sm:inline" aria-hidden="true">
            ·
          </span>
          <p>
            Supported by{" "}
            <a
              className="font-medium text-zinc-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/60"
              href="https://www.linkedin.com/in/vansh-gupta-09ba57382"
              target="_blank"
              rel="noreferrer"
            >
              Vansh Gupta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
