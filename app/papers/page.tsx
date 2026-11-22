import type { Metadata } from "next";
import { Suspense } from "react";
import { PaperBrowser } from "@/components/paper-browser";

export const metadata: Metadata = {
  title: "Previous year papers",
  description: "Find and download previous year question papers for your VBSPU subject.",
};

export default async function PapersPage({
  searchParams,
}: {
  searchParams: Promise<{ semester?: string; subject?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1440px] px-5 py-24 text-center text-sm text-zinc-500 md:px-10">Loading paper archive…</div>}>
      <PaperBrowser semester={params.semester ?? ""} subjectSlug={params.subject ?? ""} />
    </Suspense>
  );
}
