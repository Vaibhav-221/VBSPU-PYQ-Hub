import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { semesters, semesterSubjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Choose a semester",
  description: "Choose your VBSPU semester and explore previous year question papers by subject.",
};

export default function SemestersPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <SectionHeading
        eyebrow="The paper archive"
        title="Choose your semester"
        description="Pick a term to browse its subjects and find the papers you need for revision."
      />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
        {semesters.map(({ number, year }) => (
          <Link
            key={number}
            href={`/subjects?semester=${number}`}
            className="group min-h-[220px] bg-[#080808] p-6 transition duration-300 hover:bg-[#0d0d0d]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-600">{String(number).padStart(2, "0")} / 08</span>
              <BookOpenText className="text-zinc-600 transition group-hover:text-white" size={18} />
            </div>
            <h2 className="mt-8 text-lg font-semibold text-white">Semester {number}</h2>
            <p className="mt-1 text-xs text-slate-500">{year}</p>
            <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-xs text-slate-400">
              <span>{semesterSubjects[number].length} subjects</span>
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-300">Explore <ArrowRight size={13} /></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/[0.09] pt-7 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-medium text-white">Looking for study materials?</h2>
          <p className="mt-1 text-sm text-zinc-500">See what is currently available for VBSPU learners.</p>
        </div>
        <Button href="/materials" variant="secondary">Explore resources <ArrowRight size={15} /></Button>
      </div>
    </div>
  );
}
