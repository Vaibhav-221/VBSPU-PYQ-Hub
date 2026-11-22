"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileWarning,
  Heart,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { semesterSubjects } from "@/lib/data";
import { getPapers, isFirebaseConfigured, type Paper } from "@/lib/papers";

const MUTE_KEY = "pyq_popup_mute_until";
const COUNT_KEY = "pyq_download_count";
const now = () => Date.now();

function getSubjectTitle(semester: number, slug: string) {
  const found = semesterSubjects[semester]?.find(
    (subject) => subject.toLowerCase().replace(/\s+/g, "-") === slug,
  );
  return found ?? slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function PaperBrowser({
  semester,
  subjectSlug,
}: {
  semester: string;
  subjectSlug: string;
}) {
  const [result, setResult] = useState<{
    key: string;
    papers?: Paper[];
    error?: string;
  }>();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const semesterNumber = Number(semester);
  const validSelection =
    Number.isInteger(semesterNumber) &&
    Boolean(semesterSubjects[semesterNumber]) &&
    Boolean(subjectSlug);
  const selectionKey = `${semester}:${subjectSlug}`;
  const subject = useMemo(
    () => getSubjectTitle(semesterNumber, subjectSlug),
    [semesterNumber, subjectSlug],
  );

  useEffect(() => {
    let active = true;
    if (!validSelection) {
      return () => { active = false; };
    }

    getPapers(semester, subjectSlug)
      .then((results) => {
        if (active) setResult({ key: selectionKey, papers: results });
      })
      .catch((cause: unknown) => {
        if (!active) return;
        setResult({
          key: selectionKey,
          error: cause instanceof Error ? cause.message : "Could not load the paper archive.",
        });
      });

    return () => { active = false; };
  }, [semester, subjectSlug, validSelection, selectionKey]);

  const loading = validSelection && result?.key !== selectionKey;
  const error = !validSelection
    ? "Choose a semester and subject to browse papers."
    : result?.key === selectionKey
      ? result.error
      : "";
  const currentPapers =
    result?.key === selectionKey ? result.papers ?? [] : [];

  function handleDownload(event: React.MouseEvent<HTMLAnchorElement>, url: string) {
    if (now() < Number(localStorage.getItem(MUTE_KEY) || 0)) return;
    const nextCount = Number(localStorage.getItem(COUNT_KEY) || 0) + 1;
    if (nextCount < 3) {
      localStorage.setItem(COUNT_KEY, String(nextCount));
      return;
    }
    event.preventDefault();
    localStorage.setItem(COUNT_KEY, "0");
    setPendingUrl(url);
    setModalOpen(true);
  }

  function maybeLater() {
    localStorage.setItem(MUTE_KEY, String(now() + 7 * 24 * 60 * 60 * 1000));
    setModalOpen(false);
    if (pendingUrl) window.open(pendingUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <Link
        href={validSelection ? `/subjects?semester=${semester}` : "/semesters"}
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
      >
        <ArrowLeft size={15} /> {validSelection ? `Semester ${semester} subjects` : "All semesters"}
      </Link>
      <div className="mb-9">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Verified exam archive · Semester {semester || "—"}
        </p>
        <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.055em] text-white sm:text-6xl">{subject}</h1>
        <p className="mt-4 text-sm text-zinc-400 sm:text-base">Previous year question papers available for this subject.</p>
      </div>

      {loading ? (
        <div aria-label={`Syncing ${subject} papers`}>
          <div className="mb-6 border border-white/[0.09] bg-[#080808] px-5 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-lg" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200" role="status" aria-live="polite">
                  Syncing {subject} papers
                </p>
                <Skeleton className="mt-2 h-3 w-48 max-w-full" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="min-h-56 border border-white/[0.09] bg-[#080808] p-6">
                <Skeleton className="h-11 w-11 rounded-lg" />
                <Skeleton className="mt-6 h-4 w-3/4 rounded-sm" />
                <Skeleton className="mt-3 h-3 w-1/3 rounded-sm bg-white/[0.06]" />
                <div className="mt-8 border-t border-white/[0.08] pt-4">
                  <Skeleton className="h-10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="border border-white/[0.09] bg-[#080808] p-6 sm:p-8">
          <FileWarning className="text-zinc-300" size={22} />
          <h2 className="mt-4 text-base font-semibold text-white">
            {isFirebaseConfigured() ? "Couldn’t load papers" : "Paper archive needs configuration"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{error}</p>
          {!isFirebaseConfigured() ? (
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Configure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID after adding the valid Firebase web-app settings.
            </p>
          ) : null}
          <Button href="/semesters" variant="secondary" className="mt-5">Browse another semester <ArrowUpRight size={14} /></Button>
        </div>
      ) : currentPapers.length === 0 ? (
        <div className="border border-white/[0.09] bg-[#080808] px-5 py-14 text-center">
          <ShieldAlert className="mx-auto text-slate-500" size={23} />
          <h2 className="mt-4 text-base font-semibold text-white">No papers listed yet</h2>
          <p className="mt-2 text-sm text-slate-400">There are currently no papers for this subject. Check back later or explore another subject.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPapers.map((paper) => (
            <article key={paper.id} className="interactive-card flex min-h-56 flex-col rounded-xl border border-white/[0.09] bg-[#080808] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                <Download size={18} />
              </div>
              <h2 className="mt-5 text-base font-semibold text-white">{paper.title || "Previous year question paper"}</h2>
              <p className="mt-2 text-xs text-slate-500">{paper.year ? `${paper.year} · ` : ""}Semester {semester}</p>
              {paper.url ? (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => handleDownload(event, paper.url!)}
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white text-xs font-semibold text-black transition hover:bg-zinc-200"
                >
                  Download PDF <Download size={14} />
                </a>
              ) : (
                <p className="mt-auto pt-5 text-xs text-slate-500">PDF link unavailable.</p>
              )}
            </article>
          ))}
        </div>
      )}

      {modalOpen ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="support-dialog-title">
          <div className="w-full max-w-md border border-white/10 bg-[#080808] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300"><Heart size={19} /></div>
            <h2 id="support-dialog-title" className="mt-5 text-lg font-semibold text-white">Finding these papers helpful?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">The archive is free for every student. If it has helped with your preparation, consider supporting the project.</p>
            <div className="mt-6 grid gap-2">
              <Button href="/support" onClick={() => setModalOpen(false)}>Support the hub <Heart size={15} /></Button>
              <Button variant="secondary" onClick={maybeLater}>Maybe later — continue download</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
