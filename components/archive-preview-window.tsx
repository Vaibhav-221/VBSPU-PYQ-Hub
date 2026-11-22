"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  FolderOpen,
  Maximize2,
  Minus,
  Search,
  X,
  Zap,
} from "lucide-react";

export function ArchivePreviewWindow() {
  function handleArtworkPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--art-x", `${x * 12}px`);
    event.currentTarget.style.setProperty("--art-y", `${y * 8}px`);
    event.currentTarget.style.setProperty("--art-rotate-x", `${y * -5}deg`);
    event.currentTarget.style.setProperty("--art-rotate-y", `${x * 7}deg`);
  }

  function resetArtworkPointer(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.removeProperty("--art-x");
    event.currentTarget.style.removeProperty("--art-y");
    event.currentTarget.style.removeProperty("--art-rotate-x");
    event.currentTarget.style.removeProperty("--art-rotate-y");
  }

  return (
    <section
      aria-label="VBSPU question paper archive"
      className="mx-auto w-full max-w-[610px] overflow-hidden rounded-xl border border-white/[0.12] bg-[#090909]"
    >
      <header className="flex h-11 items-center justify-between border-b border-white/[0.08] px-4">
        <div className="flex w-[58px] items-center gap-2" aria-hidden="true">
          <span className="window-control window-control--close">
            <X size={8} />
          </span>
          <span className="window-control window-control--minimize">
            <Minus size={8} />
          </span>
          <span className="window-control window-control--maximize">
            <Maximize2 size={7} />
          </span>
        </div>
        <div
          aria-label="Site address: www.vbspu-pyq-hub.online"
          className="mx-3 flex h-7 min-w-0 max-w-[280px] flex-1 items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.035] px-2 text-zinc-500"
        >
          <Search size={11} className="shrink-0" aria-hidden="true" />
          <span className="truncate text-[8px] font-medium tracking-wide sm:text-[10px]">
            www.vbspu-pyq-hub.online
          </span>
        </div>
        <span className="w-[58px]" aria-hidden="true" />
      </header>

      <Link
        href="/semesters"
        aria-label="Browse the VBSPU question paper archive"
        className="archive-artwork"
        onPointerMove={handleArtworkPointerMove}
        onPointerLeave={resetArtworkPointer}
      >
        <span className="archive-artwork-float" aria-hidden="true">
          <Image
            src="/Neon Question Paper Stack.png"
            alt=""
            width={1728}
            height={972}
            priority
            className="archive-artwork-image"
          />
        </span>
      </Link>

      <ul
        aria-label="Archive features"
        className="grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08] px-2 py-4 sm:px-4"
      >
        <li className="flex flex-col items-center gap-2 px-1 text-center text-[10px] font-medium text-zinc-300 sm:flex-row sm:justify-center sm:gap-2 sm:text-xs">
          <Zap size={15} className="text-zinc-400" aria-hidden="true" />
          Quick access
        </li>
        <li className="flex flex-col items-center gap-2 px-1 text-center text-[10px] font-medium text-zinc-300 sm:flex-row sm:justify-center sm:gap-2 sm:text-xs">
          <BadgeCheck size={15} className="text-zinc-400" aria-hidden="true" />
          Verified
        </li>
        <li className="flex flex-col items-center gap-2 px-1 text-center text-[10px] font-medium text-zinc-300 sm:flex-row sm:justify-center sm:gap-2 sm:text-xs">
          <FolderOpen size={15} className="text-zinc-400" aria-hidden="true" />
          Organized
        </li>
      </ul>
    </section>
  );
}
