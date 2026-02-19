"use client";

import type { ReportStatus } from "../lib/store";

const styles: Record<ReportStatus, string> = {
  DRAFT: "bg-[#F3EFEB] text-[#6B6360]",
  SUBMITTED: "bg-[#FDF0F3] text-[#C74B6F]",
  PENDING_MANAGER: "bg-[#FDF0F3] text-[#C74B6F]",
  MANAGER_APPROVED: "bg-[#E8F5E9] text-[#2E7D32]",
  REJECTED: "bg-[#FFEBEE] text-[#C62828]",
};

export function StatusBadge({ status }: { status: ReportStatus }) {
  const label =
    status === "MANAGER_APPROVED"
      ? "Approved"
      : status === "PENDING_MANAGER"
        ? "Pending approval"
        : status === "REJECTED"
          ? "Rejected"
          : status;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium ${styles[status] ?? "bg-[#F3EFEB] text-[#6B6360]"}`}
    >
      {label}
    </span>
  );
}
