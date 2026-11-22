"use client";

import { useEffect, useState } from "react";

const words = ["prep", "focus", "recall", "study"];

type TypewriterWordProps = {
  words?: readonly string[];
};

export function TypewriterWord({ words: activeWords = words }: TypewriterWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(activeWords[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const word = activeWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && visibleCharacters === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && visibleCharacters === 0) {
      timeout = setTimeout(() => {
        setWordIndex((current) => (current + 1) % activeWords.length);
        setIsDeleting(false);
      }, 320);
    } else {
      timeout = setTimeout(
        () => setVisibleCharacters((current) => current + (isDeleting ? -1 : 1)),
        isDeleting ? 55 : 105,
      );
    }

    return () => clearTimeout(timeout);
  }, [activeWords, isDeleting, visibleCharacters, wordIndex]);

  return (
    <span
      aria-hidden="true"
      className="typewriter-slot inline-grid align-baseline"
    >
      {activeWords.map((word) => (
        <span
          key={word}
          className="invisible col-start-1 row-start-1 whitespace-nowrap border-b border-transparent text-zinc-200"
        >
          {word}
          <span className="ml-0.5 inline-block h-[0.8em] w-[2px]" />
        </span>
      ))}
      <span className="typewriter-word col-start-1 row-start-1 whitespace-nowrap border-b border-zinc-400 text-zinc-200">
        {activeWords[wordIndex].slice(0, visibleCharacters)}
        <span className="typewriter-caret ml-0.5 inline-block h-[0.8em] w-[2px] translate-y-[0.08em] bg-zinc-200" />
      </span>
    </span>
  );
}
