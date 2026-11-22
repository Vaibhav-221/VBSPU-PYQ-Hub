import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
