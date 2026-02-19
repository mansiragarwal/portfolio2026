"use client";

export type ReportStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "PENDING_MANAGER"
  | "MANAGER_APPROVED"
  | "REJECTED";

export interface LineItem {
  id: string;
  category: string;
  description: string;
  amount: string;
  expenseDate: string;
}

export interface ExpenseReport {
  id: string;
  title: string;
  businessPurpose: string;
  lineItems: LineItem[];
  totalAmount: number;
  status: ReportStatus;
  submittedAt: string | null;
  createdAt: string;
}

const STORAGE_KEY = "expense-reports-demo";

function loadReports(): ExpenseReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReports(reports: ExpenseReport[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function getAllReports(): ExpenseReport[] {
  return loadReports();
}

export function getReportById(id: string): ExpenseReport | undefined {
  return loadReports().find((r) => r.id === id);
}

export function createReport(
  title: string,
  businessPurpose: string
): ExpenseReport {
  const reports = loadReports();
  const report: ExpenseReport = {
    id: crypto.randomUUID(),
    title,
    businessPurpose,
    lineItems: [],
    totalAmount: 0,
    status: "DRAFT",
    submittedAt: null,
    createdAt: new Date().toISOString(),
  };
  reports.unshift(report);
  saveReports(reports);
  return report;
}

export function updateReport(
  id: string,
  updates: Partial<Pick<ExpenseReport, "title" | "businessPurpose" | "lineItems" | "totalAmount" | "status" | "submittedAt">>
): ExpenseReport | null {
  const reports = loadReports();
  const i = reports.findIndex((r) => r.id === id);
  if (i === -1) return null;
  reports[i] = { ...reports[i], ...updates };
  saveReports(reports);
  return reports[i];
}

export function deleteReport(id: string): boolean {
  const reports = loadReports().filter((r) => r.id !== id);
  if (reports.length === loadReports().length) return false;
  saveReports(reports);
  return true;
}

export function submitReport(id: string): ExpenseReport | null {
  const report = getReportById(id);
  if (!report || report.status !== "DRAFT") return null;
  const total = report.lineItems.reduce(
    (sum, li) => sum + (parseFloat(li.amount) || 0),
    0
  );
  return updateReport(id, {
    status: total < 100 ? "MANAGER_APPROVED" : "PENDING_MANAGER",
    submittedAt: new Date().toISOString(),
    totalAmount: total,
  });
}

export function approveReport(id: string): ExpenseReport | null {
  return updateReport(id, { status: "MANAGER_APPROVED" });
}

export function rejectReport(id: string): ExpenseReport | null {
  return updateReport(id, { status: "REJECTED" });
}
