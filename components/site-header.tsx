"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpenText,
  FileText,
  Heart,
  House,
  Info,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    href: "/semesters",
    label: "Question papers",
    detail: "Browse by semester and subject",
    icon: FileText,
  },
  {
    href: "/materials",
    label: "Study materials",
    detail: "Notes and revision resources",
    icon: BookOpenText,
  },
  {
    href: "/about",
    label: "About",
    detail: "Learn about the hub and its team",
    icon: Info,
  },
  {
    href: "/contact",
    label: "Contact",
    detail: "Get in touch with the hub",
    icon: Mail,
  },
];

function isNavItemActive(pathname: string, href: string) {
  if (href === "/semesters") {
    return ["/semesters", "/subjects", "/papers"].some((route) =>
      pathname.startsWith(route),
    );
  }

  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const isMenuOpen = openMenuPath === pathname;

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMenuLinkRef.current?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setOpenMenuPath(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenuPath(null);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
          "#mobile-navigation a[href], #mobile-navigation button:not(:disabled)",
        );
        const firstElement = focusable?.[0];
        const lastElement = focusable?.[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050505]"
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link
          className="flex shrink-0 items-center gap-2.5"
          href="/"
          aria-label="VBSPU PYQ Hub home"
          onClick={() => setOpenMenuPath(null)}
        >
          <Image
            src="/vbspupyqhub.png"
            alt=""
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-tight text-white min-[381px]:inline sm:text-[15px]">
            VBSPU PYQ Hub
          </span>
          <span className="text-sm font-semibold tracking-tight text-white min-[381px]:hidden">
            PYQ Hub
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-4 md:flex lg:gap-7"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`nav-link text-[13px] font-medium transition hover:text-white ${
              pathname === "/" ? "text-white" : "text-zinc-400"
            }`}
          >
            Home
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isNavItemActive(pathname, item.href) ? "page" : undefined}
              className={`nav-link text-[13px] font-medium transition hover:text-white ${
                isNavItemActive(pathname, item.href)
                  ? "text-white"
                  : "text-zinc-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/support" className="min-h-9 rounded-full px-4 py-2 text-xs">
            <Heart size={14} />
            Support Us
          </Button>
        </nav>

        <div className="relative ml-auto flex items-center gap-2 md:hidden">
          <Button
            href="/support"
            className="min-h-9 rounded-full px-3 py-2 text-[11px] sm:px-4 sm:text-xs"
            onClick={() => setOpenMenuPath(null)}
          >
            <Heart size={14} />
            Support Us
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-200 transition hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setOpenMenuPath(isMenuOpen ? null : pathname)}
          >
            <span
              aria-hidden="true"
              className={`hamburger-icon ${isMenuOpen ? "hamburger-icon--open" : ""}`}
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div
            aria-hidden="true"
            className="mobile-menu-backdrop fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm md:hidden"
            onClick={() => setOpenMenuPath(null)}
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="mobile-menu-overlay pointer-events-none fixed inset-0 z-[70] overflow-y-auto md:hidden"
          >
            <div className="pointer-events-none mx-auto flex min-h-full w-full max-w-[760px] flex-col px-5 pb-8 pt-5 sm:px-8">
              <div
                className="mobile-menu-reveal pointer-events-auto flex items-center justify-between"
                style={{ animationDelay: "80ms" }}
              >
                <Link
                  ref={firstMenuLinkRef}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white"
                  href="/"
                  onClick={() => setOpenMenuPath(null)}
                >
                  <House size={16} aria-hidden="true" />
                  Home
                </Link>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-100 transition hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={() => setOpenMenuPath(null)}
                >
                  <span
                    aria-hidden="true"
                    className="hamburger-icon hamburger-icon--open"
                  >
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
              </div>

              <div
                className="mobile-menu-reveal pointer-events-auto my-auto py-10"
                style={{ animationDelay: "150ms" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  VBSPU PYQ Hub · Navigation
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
                  What are you preparing for?
                </h2>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-8 grid gap-2 sm:grid-cols-2"
                >
                  {[
                    ...navItems,
                    {
                      href: "/support",
                      label: "Support Us",
                      detail: "Help keep the archive free",
                      icon: Heart,
                    },
                  ].map(({ href, label, detail, icon: Icon }, index) => (
                    <Link
                      key={href}
                      href={href}
                      aria-current={
                        isNavItemActive(pathname, href) ? "page" : undefined
                      }
                      className="mobile-menu-item group flex min-h-[76px] items-center gap-4 rounded-xl border border-white/[0.1] bg-[#080808]/95 px-4 py-3 text-zinc-100 transition hover:border-white/25 hover:bg-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      style={{ animationDelay: `${index * 75}ms` }}
                      onClick={() => setOpenMenuPath(null)}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-300">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {label}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-400">
                          {detail}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              <p
                className="mobile-menu-reveal pointer-events-auto text-xs text-zinc-400"
                style={{ animationDelay: "390ms" }}
              >
                Free previous papers and study resources for VBSPU students.
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
