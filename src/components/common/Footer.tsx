"use client";

import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full overflow-hidden pt-16 pb-8">
      {/* Background Accent Blur */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div
          className="absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: "var(--accent-primary)" }}
        ></div>
        <div
          className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--accent-primary)" }}
        ></div>
      </div>

      <div className="glass relative mx-auto flex lg:max-w-7xl flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:items-start md:gap-12">
        {/* Brand Section */}
        <div className="flex flex-col flex-1 text-center md:items-start">
          <a href="#" className="justify-center mb-4 flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "#000",
              }}
            >
              A
            </span>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ color: "var(--accent-primary)" }}
            >
              Axiom
            </span>
          </a>

          <p
            className="mb-6 max-w-xs text-sm md:text-left"
            style={{ color: "var(--text-muted)" }}
          >
            Your ultimate destination for premium PC games. Discover titles like
            God of War, Assassin’s Creed, Cyberpunk 2077, and more — delivered
            instantly to your library.
          </p>

          {/* Social Icons */}
          <div
            className="mt-2 flex items-center justify-center gap-3"
            style={{ color: "var(--text-muted)" }}
          >
            <a
              href="#"
              aria-label="Facebook"
              className="hover:opacity-80 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="hover:opacity-80 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Columns */}
        <nav className="w-full flex flex-col items-start text-start flex-1 md:grid md:grid-cols-3 mx-auto gap-9 md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div
              className="mb-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent-primary)" }}
            >
              Store
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">All Games</a>
              </li>
              <li>
                <a href="#">New Releases</a>
              </li>
              <li>
                <a href="#">Top Sellers</a>
              </li>
              <li>
                <a href="#">Discount Deals</a>
              </li>
            </ul>
          </div>

          <div>
            <div
              className="mb-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent-primary)" }}
            >
              Account
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">My Library</a>
              </li>
              <li>
                <a href="#">Order History</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Profile Settings</a>
              </li>
            </ul>
          </div>

          <div>
            <div
              className="mb-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent-primary)" }}
            >
              Support
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div
        className="relative z-10 mt-10 text-center text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <span>&copy; 2025 Axiom. All rights reserved.</span>
      </div>
    </footer>
  );
}
