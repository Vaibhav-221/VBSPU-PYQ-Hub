import Image from "next/image";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[65vh] flex-col items-center justify-center gap-5 bg-[#050505] text-zinc-400"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="loading-ring absolute inset-0 rounded-full border border-white/10 border-t-zinc-300" />
        <Image
          src="/vbspupyqhub.png"
          alt=""
          width={38}
          height={38}
          className="loading-mark h-9 w-9 object-contain"
        />
      </div>
      <span className="text-xs font-medium tracking-[0.16em]">
        LOADING STUDY RESOURCES
      </span>
      <span className="sr-only">Please wait while the page loads.</span>
    </div>
  );
}
