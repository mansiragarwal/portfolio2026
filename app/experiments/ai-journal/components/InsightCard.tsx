"use client";

interface InsightCardProps {
  text: string;
  index: number;
}

const ICONS = [
  <svg key="trend" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 14l5-5 3 3 6-8" stroke="#C74B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="bulb" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5a5 5 0 013 9v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a5 5 0 013-9zM7 16h4" stroke="#C74B6F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="fire" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5s3 4.5 3 7.5a3 3 0 01-6 0c0-3 3-7.5 3-7.5z" stroke="#C74B6F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="heart" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 15s-6-4.35-6-8.25A3.25 3.25 0 019 4.5a3.25 3.25 0 016 2.25C15 10.65 9 15 9 15z" stroke="#C74B6F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
];

export function InsightCard({ text, index }: InsightCardProps) {
  return (
    <div className="rounded-xl border border-[#EAE4DE] bg-white p-5">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#C74B6F]/10">
        {ICONS[index % ICONS.length]}
      </div>
      <p className="text-[14px] leading-relaxed text-[#6B6360]">{text}</p>
    </div>
  );
}
