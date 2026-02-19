"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllReports } from "./lib/store";
import { StatusBadge } from "./components/StatusBadge";

export default function EmployeeReimbursementDashboard() {
  const router = useRouter();
  const reports = getAllReports();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[22px] font-medium tracking-[-0.02em] text-[#1A1A1A]">
          My expense reports
        </h1>
        <Link
          href="/experiments/employee-reimbursement/reports/new"
          className="rounded bg-[#C74B6F] px-4 py-2 text-[13px] font-medium text-white no-underline hover:bg-[#b03d5d]"
        >
          New report
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-10 text-center">
          <p className="mb-4 text-[15px] text-[#6B6360]">
            No expense reports yet. Create one to try the demo.
          </p>
          <button
            type="button"
            onClick={() => router.push("/experiments/employee-reimbursement/reports/new")}
            className="rounded bg-[#C74B6F] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#b03d5d]"
          >
            Create your first report
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.id}>
              <Link
                href={`/experiments/employee-reimbursement/reports/${r.id}`}
                className="flex items-center justify-between rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-4 transition-colors hover:border-[#C74B6F] hover:bg-[#FFFDFB]"
              >
                <div>
                  <p className="font-medium text-[#1A1A1A]">{r.title}</p>
                  <p className="mt-0.5 text-[13px] text-[#6B6360]">
                    ${r.totalAmount.toFixed(2)} · {r.lineItems.length} item{r.lineItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-[12px] text-[#A09893]">
        Demo data is stored in your browser (localStorage). No server or sign-in required.
      </p>
    </main>
  );
}
