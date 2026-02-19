"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getReportById,
  approveReport,
  rejectReport,
  type ExpenseReport,
} from "../../lib/store";
import { StatusBadge } from "../../components/StatusBadge";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [report, setReport] = useState<ExpenseReport | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    setReport(getReportById(id) ?? null);
  }, [id]);

  if (report === null) {
    return (
      <main className="mx-auto max-w-[720px] px-6 py-10">
        <Link
          href="/experiments/employee-reimbursement"
          className="text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          ← Back to reports
        </Link>
        <p className="mt-6 text-[15px] text-[#6B6360]">
          Report not found. It may have been deleted or the link is invalid.
        </p>
      </main>
    );
  }

  const canApproveOrReject =
    report.status === "PENDING_MANAGER" || report.status === "SUBMITTED";

  const handleApprove = () => {
    const updated = approveReport(report.id);
    if (updated) setReport(updated);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    const updated = rejectReport(report.id);
    if (updated) {
      setReport(updated);
      setShowReject(false);
      setRejectReason("");
    }
  };

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/experiments/employee-reimbursement"
          className="text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          ← Back to reports
        </Link>
        <StatusBadge status={report.status} />
      </div>

      <div className="rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-6">
        <h1 className="text-[20px] font-medium text-[#1A1A1A]">{report.title}</h1>
        {report.businessPurpose && (
          <p className="mt-2 text-[14px] text-[#6B6360]">{report.businessPurpose}</p>
        )}
        <p className="mt-2 text-[12px] text-[#A09893]">
          Created {new Date(report.createdAt).toLocaleDateString()}
          {report.submittedAt &&
            ` · Submitted ${new Date(report.submittedAt).toLocaleDateString()}`}
        </p>

        <div className="mt-6 border-t border-[#EAE4DE] pt-4">
          <h2 className="mb-3 text-[13px] font-medium text-[#6B6360]">Line items</h2>
          <ul className="space-y-2">
            {report.lineItems.map((li) => (
              <li
                key={li.id}
                className="flex justify-between rounded border border-[#EAE4DE] bg-[#FAF7F4] px-3 py-2 text-[14px]"
              >
                <span className="text-[#1A1A1A]">
                  {li.category} — {li.description}
                </span>
                <span className="font-medium text-[#1A1A1A]">
                  ${(parseFloat(li.amount) || 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-right text-[15px] font-semibold text-[#1A1A1A]">
            Total: ${report.totalAmount.toFixed(2)}
          </p>
        </div>

        {canApproveOrReject && (
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#EAE4DE] pt-4">
            <span className="text-[13px] text-[#6B6360]">Demo: act as manager</span>
            <button
              type="button"
              onClick={handleApprove}
              className="rounded bg-[#2E7D32] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#1B5E20]"
            >
              Approve
            </button>
            {!showReject ? (
              <button
                type="button"
                onClick={() => setShowReject(true)}
                className="rounded border border-[#C62828] bg-white px-4 py-2 text-[13px] font-medium text-[#C62828] hover:bg-[#FFEBEE]"
              >
                Reject
              </button>
            ) : (
              <div className="flex flex-wrap items-end gap-2">
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Rejection reason"
                  className="rounded border border-[#EAE4DE] bg-[#FAF7F4] px-3 py-2 text-[13px] outline-none focus:border-[#C74B6F]"
                />
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className="rounded bg-[#C62828] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#B71C1C] disabled:opacity-50"
                >
                  Confirm reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowReject(false)}
                  className="rounded border border-[#EAE4DE] px-4 py-2 text-[13px] text-[#6B6360] hover:bg-[#F3EFEB]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
