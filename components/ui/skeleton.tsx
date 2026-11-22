import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={`animate-pulse rounded-md bg-white/[0.08] ${className}`}
      {...props}
    />
  );
}
