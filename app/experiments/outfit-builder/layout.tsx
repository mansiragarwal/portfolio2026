"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/experiments/outfit-builder", label: "Analyze" },
  { href: "/experiments/outfit-builder/wardrobe", label: "My Wardrobe" },
];

export default function OutfitBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <header className="fixed top-0 z-30 w-full border-b border-[#EAE4DE] bg-[#FAF7F4]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6">
          <Link
            href="/experiments/outfit-builder"
            className="text-[15px] font-semibold tracking-tight text-[#1A1A1A]"
          >
            Outfit Builder
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/experiments/outfit-builder"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#C74B6F]/10 text-[#C74B6F]"
                      : "text-[#6B6360] hover:text-[#1A1A1A]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="pt-14">{children}</main>
    </div>
  );
}
