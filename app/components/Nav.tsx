import Link from "next/link";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-[#EAE4DE] bg-[#FAF7F4]"
      style={{ padding: "32px 48px" }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link
          href="/"
          className="text-[24px] text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-logo)" }}
        >
          Mansi Agarwal
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/files/Mansi%20Agarwal%20Resume%202026.pdf"
            className="text-[13px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
          <Link
            href="https://www.linkedin.com/in/mansi-r-agarwal/"
            className="text-[13px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href="/about"
            className="text-[13px] text-[#A09893] transition-colors hover:text-[#1A1A1A]"
          >
            About Me
          </Link>
        </div>
      </nav>
    </header>
  );
}
