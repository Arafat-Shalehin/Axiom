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
  const pathname = usePathname() ?? "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const userButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape, outside click, history navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        userButtonRef.current?.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;

      if (
        isUserMenuOpen &&
        target &&
        userMenuRef.current &&
        userButtonRef.current &&
        !userMenuRef.current.contains(target) &&
        !userButtonRef.current.contains(target)
      ) {
        setIsUserMenuOpen(false);
      }

      if (
        isMobileMenuOpen &&
        target &&
        navRef.current &&
        !navRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const closeAll = () => {
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("popstate", closeAll);
    window.addEventListener("hashchange", closeAll);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("popstate", closeAll);
      window.removeEventListener("hashchange", closeAll);
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  return (
    <header className="mt-1 md:mt-3 mx-3 border-none md:border-none">
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cx(
          "relative",
          "border border-(--border-color)",
          "rounded-md md:rounded-2xl",
          "p-3",
          "flex items-center justify-between lg:max-w-7xl mx-auto",
        )}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cx(
              "md:hidden inline-flex items-center justify-center",
              "rounded-md p-2",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                fill="none"
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
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                fill="none"
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

          <Link href="/" className="text-(--text-primary) hover:text-accent font-semibold tracking-tight">
            <h6>Axiom</h6>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "inline-flex items-center gap-2",
                  "text-sm font-medium",
                  "transition-opacity duration-200 text-(--text-muted)",
                  isActive ? "opacity-100 text-accent" : "opacity-50 hover:opacity-100",
                )}
              >
                {link.icon && <span aria-hidden>{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            ref={userButtonRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => setIsUserMenuOpen((v) => !v)}
            className={cx(
              "inline-flex items-center gap-2",
              "rounded-md px-2 py-1",
              "text-sm font-medium",
              "opacity-90 hover:opacity-100",
              "transition-opacity duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
            )}
          >
            <span
              className="h-7 w-7 rounded-full border border-(--border-color) grid place-items-center text-xs"
              aria-hidden
            >
              U
            </span>

            <span className="text-muted">User</span>

            <svg
              className={cx(
                "h-4 w-4 transition-transform duration-200",
                isUserMenuOpen && "rotate-180",
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              />
            </svg>
          </button>

          <div
            ref={userMenuRef}
            role="menu"
            aria-label="User menu"
            className={cx(
              "absolute right-0 mt-2 w-48 origin-top-right",
              "rounded-md border border-(--border-color)",
              "p-1 shadow-sm z-10",
              "transition ease-out duration-200",
              isUserMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "pointer-events-none opacity-0 scale-95 -translate-y-1",
            )}
          >
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsUserMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm hover:bg-black/5"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              role="menuitem"
              onClick={() => setIsUserMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm hover:bg-black/5"
            >
              Settings
            </Link>

            <div className="my-1 h-px bg-(--border-color) opacity-60" />

            <button
              type="button"
              role="menuitem"
              onClick={() => setIsUserMenuOpen(false)}
              className="w-full text-left rounded px-3 py-2 text-sm hover:bg-black/5"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cx(
          "md:hidden mt-2",
          "grid transition-[grid-template-rows,opacity]",
          "duration-200 ease-out",
          isMobileMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none",
        )}
      >
        <div className="overflow-hidden border border-(--border-color) rounded-md p-3">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium"
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
