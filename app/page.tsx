import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchivePreviewWindow } from "@/components/archive-preview-window";
import { TypewriterWord } from "@/components/typewriter-word";
import { semesters, semesterSubjects } from "@/lib/data";

const subjectCount = Object.values(semesterSubjects).reduce(
  (sum, subjects) => sum + subjects.length,
  0,
);

const highlightItems = [
  `${semesters.length} semesters`,
  `${subjectCount} subjects`,
  "10K+ file downloads",
  "Direct PDF access",
  "Always free",
  "VBSPU Jaunpur",
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-10 px-5 py-16 md:px-10 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="max-w-3xl">
            <Link
              href="/semesters"
              className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
              Complete PYQ library
              <ArrowUpRight size={13} className="text-zinc-500" />
            </Link>

            <h1 className="reveal reveal-delay-1 mt-8 text-[clamp(3rem,6.2vw,5.6rem)] font-medium leading-[0.94] tracking-[-0.075em] text-white">
              Previous papers.
              <br />
              <span className="text-zinc-400">
                Clearer <TypewriterWord />
                <span aria-hidden="true">.</span>
                <span className="sr-only">preparation.</span>
              </span>
            </h1>

            <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-7 text-zinc-400">
              The focused VBSPU question-paper library for students who want to
              revise less randomly and prepare more deliberately.
            </p>

            <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/semesters" className="min-h-12 rounded-full px-6">
                Explore question papers <ArrowRight size={17} />
              </Button>
              <Button href="/materials" variant="secondary" className="min-h-12 rounded-full px-6">
                Study materials <BookOpenText size={17} />
              </Button>
            </div>
          </div>

          <ArchivePreviewWindow />
        </div>
      </section>

      <section aria-label="Site highlights" className="overflow-hidden border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1440px] border-x border-white/[0.07]">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className={`marquee-copy flex shrink-0 items-center ${copy === 1 ? "marquee-copy--duplicate" : ""}`}
              >
                {highlightItems.map((item) => (
                  <div key={item} className="flex h-16 min-w-[190px] items-center justify-center border-r border-white/[0.07] px-5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:min-w-[230px] sm:px-8 sm:text-xs sm:tracking-[0.16em]">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Choose a starting point
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.055em] text-white sm:text-4xl">
              Every semester, in one place.
            </h2>
          </div>
          <Button href="/semesters" variant="ghost" className="rounded-full">
            View all semesters <ArrowUpRight size={15} />
          </Button>
        </div>

        <div
          aria-label="Browse all eight semesters"
          className="semester-grid mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          role="region"
          tabIndex={0}
        >
          {semesters.map(({ number, year }) => (
            <Link
              key={number}
              href={`/subjects?semester=${number}`}
              className="group flex min-h-[144px] flex-col bg-[#080808] p-4 transition duration-300 hover:bg-[#0d0d0d] sm:min-h-[190px] sm:p-5 lg:min-h-[210px] lg:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-600">
                  {String(number).padStart(2, "0")} / 08
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-700 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />
              </div>
              <h3 className="mt-auto pt-6 text-xl font-medium tracking-tight text-zinc-100 sm:pt-8 lg:pt-12">
                Semester {number}
              </h3>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-600">
                <span>{year}</span>
                <span>{semesterSubjects[number].length} subjects</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 flex items-center justify-end gap-2 text-[11px] font-medium text-zinc-500 sm:hidden">
          Scroll to browse all 8 semesters
          <ArrowDown size={14} aria-hidden="true" />
        </p>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.018]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-20">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Built for revision
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl">
                Find the paper.
                <br />
                Start understanding.
              </h2>
            </div>
            <Button href="/semesters" className="min-h-12 rounded-full px-6">
              Browse the archive <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
