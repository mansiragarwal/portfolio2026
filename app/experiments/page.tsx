import Link from "next/link";
import { Nav } from "../components/Nav";

const experiments = [
  {
    title: "Outfit Builder",
    tag: "Next.js · AI · Computer Vision",
    description:
      "Upload a Pinterest outfit and AI extracts clothing items, color palette, and silhouette. Get shopping alternatives and match pieces from your own wardrobe.",
    href: "/experiments/outfit-builder",
  },
  {
    title: "Site Blocker",
    tag: "Chrome Extension · Productivity",
    description:
      "A browser extension that intercepts distracting sites and makes you complete a quick task first. Configurable schedule, task queue, skip penalties, and streaks.",
    href: "/experiments/site-blocker",
  },
  {
    title: "AI Journaling App",
    tag: "Next.js · AI Prototype",
    description:
      "Mental health guided journaling with personalized prompts, mood tracking, AI reflections, distress detection, and insight dashboards. All data stays on-device.",
    href: "/experiments/ai-journal",
  },
  {
    title: "Employee Reimbursement App",
    tag: "Next.js · Full-stack prototype",
    description:
      "Expense report lifecycle: create reports, add line items, submit for approval. Demo runs in the browser with no setup — try the flow from employee to manager.",
    href: "/experiments/employee-reimbursement",
  },
];

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[720px] px-6 pb-20 pt-[72px]">
        <p
          className="pb-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
          style={{ paddingBottom: "24px" }}
        >
          Experiments
        </p>
        <p className="mb-10 max-w-[540px] text-[15px] leading-[1.7] text-[#6B6360]">
          Side projects and prototypes: games, tools, and small apps built to explore a stack or idea.
        </p>

        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          style={{ gap: "20px" }}
        >
          {experiments.map((exp) => (
            <Link
              key={exp.title}
              href={exp.href}
              className="group flex min-h-[260px] flex-col justify-between rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#C74B6F] hover:bg-[#FFFDFB] hover:shadow-[0_12px_40px_rgba(199,75,111,0.07)]"
              style={{ padding: "32px 28px", minHeight: "260px" }}
            >
              <div>
                <span className="mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-medium text-[#6B6360] bg-[#F3EFEB] group-hover:bg-[#FDF0F3] group-hover:text-[#C74B6F] transition-colors duration-300">
                  {exp.tag}
                </span>
                <h2 className="mb-3 text-[22px] font-medium tracking-[-0.02em] text-[#1A1A1A]" style={{ marginBottom: "12px" }}>
                  {exp.title}
                </h2>
                <p className="text-[14px] leading-[1.65] text-[#6B6360]">
                  {exp.description}
                </p>
              </div>
              <div
                className="mt-5 flex items-center border-t border-[#EAE4DE] pt-4"
                style={{ borderTop: "1px solid #EAE4DE", paddingTop: "16px", marginTop: "20px" }}
              >
                <span className="text-[13px] font-semibold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#C74B6F]">
                  View experiment
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-2 text-[#1A1A1A] opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#C74B6F]"
                  aria-hidden
                >
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
