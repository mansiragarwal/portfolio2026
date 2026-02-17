import Link from "next/link";
import { Nav } from "./components/Nav";

const caseStudies = [
  {
    company: "WCG",
    tag: "Systems Design",
    title: "Permissions Redesign",
    description:
      "The team spent months mapping every role to every permission. One workshop reframed the problem and produced the system that shipped.",
    metric: "Eliminated #1 client complaint",
    href: "/work/permissions",
  },
  {
    company: "Haven Technology",
    tag: "0→1 Product",
    title: "Rules Manager",
    description:
      "Collapsed hundreds of ad-hoc underwriting rules into three structural patterns, cutting insurance product launch time from over a year to 90 days.",
    metric: "Launch time: 1 year → 90 days",
    href: "/work/rules-manager",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[720px] px-12">
        {/* Hero */}
        <section
          className="pb-5 pt-[72px]"
          style={{ paddingTop: "72px", paddingBottom: "20px" }}
        >
          <p
            className="mb-5 text-[13px] font-medium uppercase tracking-[0.1em] text-[#C74B6F]"
            style={{ marginBottom: "20px" }}
          >
            Senior Product Designer
          </p>
          <h1
            className="max-w-[680px] text-[28px] font-medium leading-[1.3] tracking-[-0.03em] text-[#1A1A1A] md:text-[38px]"
            style={{ lineHeight: 1.3 }}
          >
            I design for systems that can&apos;t afford to be wrong.
          </h1>
          <p
            className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#6B6360]"
            style={{ lineHeight: 1.7 }}
          >
            Carnegie Mellon CS + HCI · New York City ·
            <br className="md:hidden" />
            4 years in complex B2B systems.
          </p>
        </section>

        {/* Selected Work label */}
        <p
          className="pb-6 pt-14 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
          style={{ paddingTop: "56px", paddingBottom: "24px" }}
        >
          Selected Work
        </p>

        {/* Case study cards */}
        <div
          className="grid grid-cols-1 gap-5 pb-20 md:grid-cols-2"
          style={{ gap: "20px" }}
        >
          {caseStudies.map((study) => (
            <Link
              key={study.title}
              href={study.href}
              className="group flex min-h-[300px] flex-col justify-between rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#C74B6F] hover:bg-[#FFFDFB] hover:shadow-[0_12px_40px_rgba(199,75,111,0.07)]"
              style={{
                padding: "32px 28px",
                minHeight: "300px",
              }}
            >
              <div>
                <div
                  className="mb-5 flex items-center justify-between"
                  style={{ marginBottom: "20px" }}
                >
                  <span className="text-[12px] font-medium text-[#A09893]">
                    {study.company}
                  </span>
                  <span className="rounded px-2.5 py-1 text-[11px] font-medium text-[#6B6360] bg-[#F3EFEB] group-hover:bg-[#FDF0F3] group-hover:text-[#C74B6F] transition-colors duration-300">
                    {study.tag}
                  </span>
                </div>
                <h2
                  className="mb-3 text-[22px] font-medium tracking-[-0.02em] text-[#1A1A1A]"
                  style={{ marginBottom: "12px" }}
                >
                  {study.title}
                </h2>
                <p className="text-[14px] leading-[1.65] text-[#6B6360]">
                  {study.description}
                </p>
              </div>
              <div
                className="mt-5 flex items-center justify-between border-t border-[#EAE4DE] pt-4"
                style={{
                  borderTop: "1px solid #EAE4DE",
                  paddingTop: "16px",
                  marginTop: "20px",
                }}
              >
                <span className="text-[13px] font-semibold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#C74B6F]">
                  {study.metric}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#1A1A1A] opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#C74B6F]"
                  aria-hidden
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
