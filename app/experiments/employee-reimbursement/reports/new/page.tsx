"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createReport,
  updateReport,
  submitReport,
  type LineItem,
} from "../../lib/store";

const CATEGORIES = ["Travel", "Meals", "Supplies", "Software", "Other"];

function newLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    category: "Other",
    description: "",
    amount: "",
    expenseDate: new Date().toISOString().slice(0, 10),
  };
}

export default function NewReportPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [businessPurpose, setBusinessPurpose] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [reportId, setReportId] = useState<string | null>(null);

  const total = lineItems.reduce(
    (sum, li) => sum + (parseFloat(li.amount) || 0),
    0
  );

  const addLine = useCallback(() => {
    setLineItems((prev) => [...prev, newLineItem()]);
  }, []);

  const removeLine = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((li) => li.id !== id));
  }, []);

  const updateLine = useCallback(
    (id: string, field: keyof LineItem, value: string) => {
      setLineItems((prev) =>
        prev.map((li) => (li.id === id ? { ...li, [field]: value } : li))
      );
    },
    []
  );

  const saveDraft = useCallback(() => {
    setSaving(true);
    try {
      if (!reportId) {
        const report = createReport(title || "Untitled report", businessPurpose);
        setReportId(report.id);
        updateReport(report.id, {
          lineItems,
          totalAmount: total,
        });
      } else {
        updateReport(reportId, {
          title: title || "Untitled report",
          businessPurpose,
          lineItems,
          totalAmount: total,
        });
      }
    } finally {
      setSaving(false);
    }
  }, [reportId, title, businessPurpose, lineItems, total]);

  const handleSubmit = useCallback(() => {
    if (!title.trim()) return;
    if (lineItems.length === 0) return;
    const hasInvalid = lineItems.some(
      (li) => !li.description.trim() || !li.amount || parseFloat(li.amount) <= 0
    );
    if (hasInvalid) return;

    if (!reportId) {
      const report = createReport(title.trim(), businessPurpose);
      updateReport(report.id, { lineItems, totalAmount: total });
      const updated = submitReport(report.id);
      if (updated) router.push("/experiments/employee-reimbursement");
      return;
    }
    updateReport(reportId, { lineItems, totalAmount: total });
    const updated = submitReport(reportId);
    if (updated) router.push("/experiments/employee-reimbursement");
  }, [reportId, title, businessPurpose, lineItems, total, router]);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/experiments/employee-reimbursement"
          className="text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          ← Back
        </Link>
        <span className="text-[13px] text-[#A09893]">New expense report</span>
      </div>

      <div className="rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-6">
        <div className="mb-6">
          <label className="mb-1 block text-[12px] font-medium text-[#6B6360]">
            Report title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q1 Conference Trip"
            className="w-full rounded border border-[#EAE4DE] bg-[#FAF7F4] px-3 py-2 text-[15px] text-[#1A1A1A] outline-none focus:border-[#C74B6F]"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-[12px] font-medium text-[#6B6360]">
            Business purpose
          </label>
          <textarea
            value={businessPurpose}
            onChange={(e) => setBusinessPurpose(e.target.value)}
            placeholder="Brief reason for expenses"
            rows={2}
            className="w-full rounded border border-[#EAE4DE] bg-[#FAF7F4] px-3 py-2 text-[15px] text-[#1A1A1A] outline-none focus:border-[#C74B6F]"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-[#1A1A1A]">Line items</h2>
          <button
            type="button"
            onClick={addLine}
            className="text-[13px] font-medium text-[#C74B6F] hover:underline"
          >
            + Add line
          </button>
        </div>

        {lineItems.length === 0 ? (
          <p className="rounded border border-dashed border-[#EAE4DE] bg-[#FAF7F4] py-6 text-center text-[13px] text-[#6B6360]">
            No line items. Add at least one to submit.
          </p>
        ) : (
          <ul className="space-y-4">
            {lineItems.map((li) => (
              <li
                key={li.id}
                className="flex flex-wrap items-end gap-3 rounded border border-[#EAE4DE] bg-[#FAF7F4] p-3"
              >
                <div className="flex-1 min-w-[120px]">
                  <label className="mb-0.5 block text-[11px] text-[#6B6360]">Category</label>
                  <select
                    value={li.category}
                    onChange={(e) => updateLine(li.id, "category", e.target.value)}
                    className="w-full rounded border border-[#EAE4DE] bg-white px-2 py-1.5 text-[13px]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[2] min-w-[160px]">
                  <label className="mb-0.5 block text-[11px] text-[#6B6360]">Description</label>
                  <input
                    type="text"
                    value={li.description}
                    onChange={(e) => updateLine(li.id, "description", e.target.value)}
                    placeholder="Description"
                    className="w-full rounded border border-[#EAE4DE] bg-white px-2 py-1.5 text-[13px]"
                  />
                </div>
                <div className="w-24">
                  <label className="mb-0.5 block text-[11px] text-[#6B6360]">Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={li.amount}
                    onChange={(e) => updateLine(li.id, "amount", e.target.value)}
                    placeholder="0"
                    className="w-full rounded border border-[#EAE4DE] bg-white px-2 py-1.5 text-[13px]"
                  />
                </div>
                <div className="w-36">
                  <label className="mb-0.5 block text-[11px] text-[#6B6360]">Date</label>
                  <input
                    type="date"
                    value={li.expenseDate}
                    onChange={(e) => updateLine(li.id, "expenseDate", e.target.value)}
                    className="w-full rounded border border-[#EAE4DE] bg-white px-2 py-1.5 text-[13px]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(li.id)}
                  className="rounded p-1.5 text-[#6B6360] hover:bg-[#EAE4DE]"
                  aria-label="Remove line"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-[#EAE4DE] pt-4">
          <div>
            <span className="text-[13px] text-[#6B6360]">Total: </span>
            <span className="text-[18px] font-semibold text-[#1A1A1A]">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={saveDraft}
              disabled={saving}
              className="rounded border border-[#EAE4DE] bg-[#FAF7F4] px-4 py-2 text-[13px] font-medium text-[#6B6360] hover:bg-[#F3EFEB] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !title.trim() ||
                lineItems.length === 0 ||
                lineItems.some(
                  (li) =>
                    !li.description.trim() ||
                    !li.amount ||
                    parseFloat(li.amount) <= 0
                )
              }
              className="rounded bg-[#C74B6F] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#b03d5d] disabled:opacity-50"
            >
              Submit for approval
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-[#A09893]">
        Under $100: auto-approved. $100+: pending manager (use the report view to approve in demo).
      </p>
    </main>
  );
}
