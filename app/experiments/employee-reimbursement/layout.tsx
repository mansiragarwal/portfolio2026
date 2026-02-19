import Link from "next/link";
import { Nav } from "../../components/Nav";

export default function EmployeeReimbursementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />
      <div className="border-b border-[#EAE4DE] bg-[#FFFFFF] px-6 py-3">
        <div className="mx-auto flex max-w-[900px] items-center justify-between">
          <Link
            href="/experiments"
            className="text-[13px] text-[#C74B6F] no-underline hover:underline"
          >
            ← Experiments
          </Link>
          <span className="text-[13px] font-medium text-[#A09893]">
            Employee Reimbursement · Demo
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
