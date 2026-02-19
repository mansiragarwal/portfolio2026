"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/files/Mansi%20Agarwal%20Resume%202026.pdf", label: "Resume", external: true },
  { href: "https://www.linkedin.com/in/mansi-r-agarwal/", label: "LinkedIn", external: true },
  { href: "/about", label: "About Me", external: false },
  { href: "/experiments", label: "Experiments", external: false },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-[#EAE4DE] bg-[#FAF7F4] px-6 py-6 md:px-12 md:py-8">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link
          href="/"
          className="whitespace-nowrap text-[18px] text-[#1A1A1A] md:text-[24px]"
          style={{ fontFamily: "var(--font-logo)" }}
          onClick={() => setMenuOpen(false)}
        >
          Mansi Agarwal
        </Link>

        {/* Desktop: horizontal links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile: menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12h18M3 6h18M3 18h18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile: dropdown menu */}
      {menuOpen && (
        <div className="border-t border-[#EAE4DE] pt-4 md:hidden" style={{ borderTop: "1px solid #EAE4DE", paddingTop: "16px" }}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
