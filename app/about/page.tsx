import type { Metadata } from "next";
import { ArrowUpRight, BookOpenText, Heart, Lightbulb, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why VBSPU PYQ Hub was built, what it offers, and who maintains and supports it.",
};

const aboutSections = [
  {
    icon: Lightbulb,
    title: "Why we built it",
    description:
      "Finding previous year question papers can take time when resources are scattered. We built this hub to bring VBSPU papers together in one clear, easy-to-browse place.",
  },
  {
    icon: BookOpenText,
    title: "What it’s for",
    description:
      "Students can browse papers by semester and subject, review past questions, and use them to guide revision and exam practice.",
  },
  {
    icon: Heart,
    title: "Our intention",
    description:
      "We want to make exam preparation more organized and accessible with a free resource that helps students spend less time searching and more time studying.",
  },
];

const linkedinProfiles = [
  {
    name: "Vaibhav Singh",
    role: "Built and maintains VBSPU PYQ Hub",
    href: "https://www.linkedin.com/in/vaibhav-singh-a9200a2b9",
  },
  {
    name: "Vansh Gupta",
    role: "Supported the platform",
    href: "https://www.linkedin.com/in/vansh-gupta-09ba57382",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <header className="reveal max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          About the hub
        </p>
        <h1 className="mt-4 text-[clamp(2.75rem,5.5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.06em] text-white">
          A clearer way to find VBSPU question papers.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          VBSPU PYQ Hub is a free, student-focused archive of previous year
          question papers, organized to make revision easier to navigate.
        </p>
      </header>

      <section
        aria-label="About the platform"
        className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] md:grid-cols-3"
      >
        {aboutSections.map(({ icon: Icon, title, description }) => (
          <article key={title} className="bg-[#080808] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
              <Icon size={19} aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-lg font-medium text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section
        aria-labelledby="team-heading"
        className="mt-16 border-t border-white/[0.08] pt-10 sm:mt-20 sm:pt-12"
      >
        <div className="flex items-center gap-3 text-zinc-300">
          <UsersRound size={18} aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            People behind the hub
          </p>
        </div>
        <h2
          id="team-heading"
          className="mt-4 text-2xl font-medium tracking-tight text-white sm:text-3xl"
        >
          Maintained with students in mind.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          Vaibhav Singh maintains the platform, with support from Vansh Gupta.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {linkedinProfiles.map(({ name, role, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-20 items-center justify-between gap-4 rounded-xl border border-white/[0.1] bg-[#080808] px-5 py-4 transition hover:border-white/25 hover:bg-[#0d0d0d]"
              >
                <span>
                  <span className="block text-sm font-medium text-white">
                    {name}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {role}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
