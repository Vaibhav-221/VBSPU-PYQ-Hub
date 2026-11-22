import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpenText } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { semesterSubjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse subjects",
  description: "Browse VBSPU subjects and find previous year papers for your semester.",
};

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ semester?: string }>;
}) {
  const { semester: rawSemester } = await searchParams;
  const semester = Number(rawSemester);
  const subjects = semesterSubjects[semester];
  if (!subjects) notFound();

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <Link href="/semesters" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white">
        <ArrowLeft size={15} /> All semesters
      </Link>
      <SectionHeading
        eyebrow={`Semester ${semester} · ${subjects.length} subjects`}
        title="Choose a subject"
        description="Select a subject to view its previous year question papers."
      />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => {
          const legacySlug = subject.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link
              key={subject}
              href={`/papers?semester=${semester}&subject=${encodeURIComponent(legacySlug)}`}
              className="group min-h-[220px] bg-[#080808] p-6 transition duration-300 hover:bg-[#0d0d0d]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                  <BookOpenText size={18} />
                </div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-slate-600">SUBJECT / {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-6 min-h-12 text-base font-semibold leading-6 text-white">{subject}</h2>
              <p className="mt-1 text-xs text-slate-500">Semester {semester}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-xs font-semibold text-zinc-300">
                View available papers <ArrowUpRight size={15} className="text-zinc-600 transition group-hover:text-white" />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10"><Button href="/semesters" variant="ghost"><ArrowLeft size={15} /> Choose another semester</Button></div>
    </div>
  );
}
