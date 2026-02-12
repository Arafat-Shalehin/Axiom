"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type NavLink = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "All Games", href: "/all-games" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const userButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close menus on:
  // - Escape
  // - outside click
  // - browser navigation (back/forward) and hash changes
  // This avoids "setState directly inside useEffect body" lint warnings.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
      userButtonRef.current?.focus();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;

      // Close user dropdown if click outside it and outside the button
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        userButtonRef.current &&
        target &&
        !userMenuRef.current.contains(target) &&
        !userButtonRef.current.contains(target)
      ) {
        setIsUserMenuOpen(false);
      }

      // Close mobile menu if click happens outside the whole nav
      if (
        isMobileMenuOpen &&
        navRef.current &&
        target &&
        !navRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const onPopOrHash = () => {
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("popstate", onPopOrHash);
    window.addEventListener("hashchange", onPopOrHash);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("popstate", onPopOrHash);
      window.removeEventListener("hashchange", onPopOrHash);
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  return (
    <header className="m-3">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="relative border border-[var(--border-color)] rounded-md md:rounded-2xl p-3 flex items-center justify-between"
      >
        {/* Left: Brand + Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </button>

          <Link href="/" className="font-semibold tracking-tight">
            Axiom
          </Link>
        </div>

        {/* Middle: Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === pathname ||
              (link.href !== "/" &&
                link.href.startsWith("/") &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "inline-flex items-center gap-2 text-sm font-medium transition-opacity duration-200",
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
                {link.icon ? <span aria-hidden="true">{link.icon}</span> : null}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: User dropdown */}
        <div className="relative">
          <button
            ref={userButtonRef}
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium opacity-90 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => setIsUserMenuOpen((v) => !v)}
          >
            {/* Placeholder avatar */}
            <span
              className="h-7 w-7 rounded-full border border-[var(--border-color)] grid place-items-center text-xs"
              aria-hidden="true"
            >
              U
            </span>
            <span className="text-[var(--accent-primary)]">User</span>
            <svg
              className={cx(
                "h-4 w-4 transition-transform duration-200",
                isUserMenuOpen && "rotate-180",
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown panel (smooth transition) */}
          <div
            ref={userMenuRef}
            role="menu"
            aria-label="User menu"
            className={cx(
              "absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-[var(--border-color)] bg-[var(--background)] p-1 shadow-sm",
              "transition ease-out duration-200",
              isUserMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "pointer-events-none opacity-0 scale-[0.98] -translate-y-1",
            )}
          >
            <Link
              role="menuitem"
              href="/profile"
              className="block rounded px-3 py-2 text-sm hover:bg-black/5"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              role="menuitem"
              href="/settings"
              className="block rounded px-3 py-2 text-sm hover:bg-black/5"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Settings
            </Link>

            <div className="my-1 h-px bg-[var(--border-color)] opacity-60" />

            <button
              role="menuitem"
              type="button"
              className="w-full text-left rounded px-3 py-2 text-sm hover:bg-black/5"
              onClick={() => {
                setIsUserMenuOpen(false);
                // TODO: integrate your auth signOut() here
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu (smooth transition) */}
      <div
        id="mobile-menu"
        className={cx(
          "md:hidden mt-2 grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isMobileMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none",
        )}
      >
        <div className="overflow-hidden border border-[var(--border-color)] rounded-md p-3">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
