import React from "react";
import Link from "next/link";
import { ImageLightbox } from "../components/ImageLightbox";

export function SectionLabel({
  children,
  first,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893] ${first ? "" : "mt-14"}`}
      style={{
        marginBottom: "12px",
        ...(first ? {} : { marginTop: "56px" }),
      }}
    >
      {children}
    </p>
  );
}

export function ImageBlock({
  label,
  src,
  caption,
}: {
  label: string;
  src: string;
  caption: string;
}) {
  return (
    <div
      className="my-10 rounded-[10px] border border-[#EAE4DE] bg-[#F3EFEB] p-7"
      style={{ padding: "32px 28px", margin: "40px 0" }}
    >
      <p
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
        style={{ marginBottom: "16px" }}
      >
        {label}
      </p>
      <ImageLightbox
        src={src}
        alt=""
        className="w-full rounded-lg border border-[#EAE4DE]"
        style={{ borderRadius: "8px" }}
      />
      <p
        className="mt-3 text-[13px] leading-[1.5] text-[#6B6360]"
        style={{ marginTop: "12px" }}
      >
        {caption}
      </p>
    </div>
  );
}

export function ReframeCard({
  label,
  beforeLabel,
  beforeText,
  afterLabel,
  afterText,
}: {
  label: string;
  beforeLabel: string;
  beforeText: string;
  afterLabel: string;
  afterText: string;
}) {
  return (
    <div
      className="my-6 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7"
      style={{ margin: "24px 0", padding: "32px 28px" }}
    >
      <p
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
        style={{ marginBottom: "16px" }}
      >
        {label}
      </p>
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-4">
        <div
          className="flex-1 rounded-lg bg-[#F3EFEB] p-5"
          style={{ padding: "20px 24px", borderRadius: "8px" }}
        >
          <p
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
            style={{ marginBottom: "8px" }}
          >
            {beforeLabel}
          </p>
          <p className="text-[15px] font-medium text-[#1A1A1A]">{beforeText}</p>
        </div>
        <span className="hidden shrink-0 text-2xl text-[#C74B6F] md:inline" aria-hidden>→</span>
        <span className="shrink-0 text-2xl text-[#C74B6F] md:hidden" aria-hidden>↓</span>
        <div
          className="flex-1 rounded-lg bg-[#FDF0F3] p-5"
          style={{ padding: "20px 24px", borderRadius: "8px" }}
        >
          <p
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]"
            style={{ marginBottom: "8px" }}
          >
            {afterLabel}
          </p>
          <p className="text-[15px] font-medium text-[#1A1A1A]">{afterText}</p>
        </div>
      </div>
    </div>
  );
}

export function PullQuote({
  quote,
  source,
}: {
  quote: string;
  source?: string;
}) {
  return (
    <div
      className="my-10 border-l-[3px] border-[#C74B6F] py-6 pl-7"
      style={{ margin: "40px 0", padding: "24px 0 24px 28px" }}
    >
      <p
        className="text-[22px] font-medium italic leading-[1.4] text-[#1A1A1A]"
        style={{ fontSize: "22px" }}
      >
        {quote}
      </p>
      {source && (
        <p className="mt-2 text-[13px] text-[#A09893]" style={{ marginTop: "8px" }}>
          {source}
        </p>
      )}
    </div>
  );
}

export function CoreInsightCallout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="my-8 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7 text-center"
      style={{ margin: "32px 0", padding: "28px" }}
    >
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
        style={{ marginBottom: "12px" }}
      >
        {label}
      </p>
      <p className="text-[24px] font-medium text-[#1A1A1A]">{children}</p>
    </div>
  );
}

export function StatsRow({
  stats,
}: {
  stats: { number: string; label: string }[];
}) {
  return (
    <div
      className="mb-4 flex flex-col gap-4 md:flex-row md:gap-4"
      style={{ gap: "16px", marginBottom: "16px" }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] py-10 px-9 text-center"
          style={{ padding: "40px 36px", borderRadius: "10px" }}
        >
          <p
            className="text-[36px] font-semibold tracking-[-0.03em] text-[#C74B6F]"
            style={{ fontSize: "36px" }}
          >
            {stat.number}
          </p>
          <p className="mt-1.5 text-[14px] text-[#6B6360]" style={{ marginTop: "6px" }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PatternBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="my-12 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-8"
      style={{ margin: "48px 0", padding: "36px 32px", borderRadius: "10px" }}
    >
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
        style={{ marginBottom: "12px" }}
      >
        {label}
      </p>
      <p
        className="text-[17px] leading-[1.65] text-[#1A1A1A]"
        style={{ fontSize: "17px" }}
      >
        {children}
      </p>
    </div>
  );
}

export function BackLink() {
  return (
    <div
      className="mt-10 border-t border-[#EAE4DE] pt-10 pb-20"
      style={{
        padding: "40px 0 80px",
        borderTop: "1px solid #EAE4DE",
        marginTop: "40px",
      }}
    >
      <Link
        href="/"
        className="text-[14px] text-[#C74B6F] hover:underline"
      >
        ← Back to all work
      </Link>
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-medium text-[#1A1A1A]"
      style={{
        fontSize: "32px",
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
        marginTop: 0,
        marginBottom: "32px",
      }}
    >
      {children}
    </h2>
  );
}

export function EmphasisLine({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-medium text-[#1A1A1A]"
      style={{ fontSize: "16px", lineHeight: 1.6, marginBottom: "20px" }}
    >
      {children}
    </p>
  );
}

export function EvidenceNudge({
  quote,
  source,
}: {
  quote: string;
  source?: string;
}) {
  return (
    <div
      className="border-l-[3px] border-[#C74B6F] py-5 pl-6"
      style={{ padding: "20px 0 20px 24px", margin: "36px 0" }}
    >
      <p
        className="italic text-[#6B6360]"
        style={{ fontSize: "15px", lineHeight: 1.7 }}
      >
        {quote}
      </p>
      {source && (
        <p
          className="mt-2 text-[#A09893]"
          style={{ fontSize: "13px", marginTop: "8px", fontStyle: "normal" }}
        >
          {source}
        </p>
      )}
    </div>
  );
}

export function UnifiedInsightCard({
  label,
  beforeLabel,
  beforeText,
  afterLabel,
  afterText,
  coreInsightLabel,
  coreInsightText,
  coreInsightAccent,
}: {
  label: string;
  beforeLabel: string;
  beforeText: string;
  afterLabel: string;
  afterText: string;
  coreInsightLabel: string;
  coreInsightText: React.ReactNode;
}) {
  return (
    <div
      className="my-10 rounded-[12px] border border-[#EAE4DE] bg-[#FFFFFF] p-9"
      style={{ margin: "40px 0", padding: "36px 32px", borderRadius: "12px" }}
    >
      <p
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
        style={{ marginBottom: "16px" }}
      >
        {label}
      </p>
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-4">
        <div
          className="flex-1 rounded-lg bg-[#F3EFEB] p-5"
          style={{ padding: "20px 24px", borderRadius: "8px" }}
        >
          <p
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
            style={{ marginBottom: "8px" }}
          >
            {beforeLabel}
          </p>
          <p className="text-[15px] font-medium text-[#1A1A1A]">{beforeText}</p>
        </div>
        <span className="hidden shrink-0 text-2xl text-[#C74B6F] md:inline" aria-hidden>→</span>
        <span className="shrink-0 text-2xl text-[#C74B6F] md:hidden" aria-hidden>↓</span>
        <div
          className="flex-1 rounded-lg bg-[#FDF0F3] p-5"
          style={{ padding: "20px 24px", borderRadius: "8px" }}
        >
          <p
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]"
            style={{ marginBottom: "8px" }}
          >
            {afterLabel}
          </p>
          <p className="text-[15px] font-medium text-[#1A1A1A]">{afterText}</p>
        </div>
      </div>
      <div
        className="mt-6 border-t border-[#EAE4DE] pt-6"
        style={{ borderTop: "1px solid #EAE4DE", marginTop: "24px", paddingTop: "24px" }}
      >
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
          style={{ marginBottom: "8px" }}
        >
          {coreInsightLabel}
        </p>
        <p className="text-[24px] font-medium text-[#1A1A1A]">{coreInsightText}</p>
      </div>
    </div>
  );
}

type ComposabilityDemoRow = {
  label: string;
  read: boolean;
  write: boolean;
  del: boolean;
};

export function ComposabilityDemoGrid({
  label,
  rows,
  caption,
}: {
  label: string;
  rows: ComposabilityDemoRow[];
  caption: string;
}) {
  return (
    <div
      className="my-9 overflow-x-auto rounded-[12px] border border-[#EAE4DE] bg-[#FFFFFF] p-7"
      style={{ margin: "36px 0", padding: "32px 28px", borderRadius: "12px" }}
    >
      <p
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
        style={{ marginBottom: "16px" }}
      >
        {label}
      </p>
      <div
        className="grid text-[13px]"
        style={{ gridTemplateColumns: "180px repeat(3, 1fr)" }}
      >
        <div
          className="border-b border-[#EAE4DE] bg-[#F3EFEB] px-3 py-2.5 font-semibold text-[#1A1A1A]"
          style={{ padding: "10px 12px" }}
        >
          Capability
        </div>
        <div
          className="border-b border-[#EAE4DE] bg-[#F3EFEB] px-3 py-2.5 text-center font-semibold text-[#1A1A1A]"
          style={{ padding: "10px 12px" }}
        >
          Read
        </div>
        <div
          className="border-b border-[#EAE4DE] bg-[#F3EFEB] px-3 py-2.5 text-center font-semibold text-[#1A1A1A]"
          style={{ padding: "10px 12px" }}
        >
          Write
        </div>
        <div
          className="border-b border-[#EAE4DE] bg-[#F3EFEB] px-3 py-2.5 text-center font-semibold text-[#1A1A1A]"
          style={{ padding: "10px 12px" }}
        >
          Delete
        </div>
        {rows.map((row) => (
          <React.Fragment key={row.label}>
            <div
              className="border-b border-[#F3EFEB] bg-[#FAFAFA] px-3 py-2.5 font-medium text-[#6B6360]"
              style={{ padding: "10px 12px", borderBottomColor: "#F3EFEB" }}
            >
              {row.label}
            </div>
            <div
              className="border-b border-[#F3EFEB] px-3 py-2.5 text-center"
              style={{
                padding: "10px 12px",
                borderBottomColor: "#F3EFEB",
                fontSize: "16px",
                color: row.read ? "#C74B6F" : "#A09893",
              }}
            >
              {row.read ? "●" : "○"}
            </div>
            <div
              className="border-b border-[#F3EFEB] px-3 py-2.5 text-center"
              style={{
                padding: "10px 12px",
                borderBottomColor: "#F3EFEB",
                fontSize: "16px",
                color: row.write ? "#C74B6F" : "#A09893",
              }}
            >
              {row.write ? "●" : "○"}
            </div>
            <div
              className="border-b border-[#F3EFEB] px-3 py-2.5 text-center"
              style={{
                padding: "10px 12px",
                borderBottomColor: "#F3EFEB",
                fontSize: "16px",
                color: row.del ? "#C74B6F" : "#A09893",
              }}
            >
              {row.del ? "●" : "○"}
            </div>
          </React.Fragment>
        ))}
      </div>
      <p
        className="mt-4 text-[13px] leading-[1.6] text-[#6B6360]"
        style={{ marginTop: "16px" }}
      >
        {caption}
      </p>
    </div>
  );
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-[1.75] text-[#6B6360]" style={{ marginBottom: "16px" }}>
      {children}
    </p>
  );
}

export function BigStatCallout({ number, label }: { number: string; label: string }) {
  return (
    <div
      className="my-8 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] py-12 px-9 text-center"
      style={{ margin: "32px 0", padding: "48px 36px", borderRadius: "10px" }}
    >
      <p
        className="text-[42px] font-semibold text-[#C74B6F]"
        style={{ fontSize: "42px" }}
      >
        {number}
      </p>
      <p className="mt-2 text-[16px] text-[#6B6360]" style={{ marginTop: "8px" }}>
        {label}
      </p>
    </div>
  );
}

export function ThreePatternsCard({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div
      className="my-6 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7"
      style={{ margin: "24px 0", padding: "32px 28px" }}
    >
      {items.map((item, i) => (
        <div key={item.title}>
          {i > 0 && (
            <hr className="my-4 border-[#EAE4DE]" style={{ margin: "16px 0", borderColor: "#EAE4DE" }} />
          )}
          <p
            className="mb-1 text-[16px] font-semibold text-[#1A1A1A]"
            style={{ marginBottom: "4px" }}
          >
            {item.title}
          </p>
          <p className="text-[14px] leading-[1.6] text-[#6B6360]">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function TwoImageRow({
  left,
  right,
}: {
  left: { label: string; src: string; caption: string };
  right: { label: string; src: string; caption: string };
}) {
  return (
    <div
      className="my-10 flex flex-col gap-4 md:flex-row md:gap-4"
      style={{ gap: "16px" }}
    >
      <div className="flex-1">
        <div
          className="rounded-[10px] border border-[#EAE4DE] bg-[#F3EFEB] p-7"
          style={{ padding: "32px 28px" }}
        >
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
            style={{ marginBottom: "16px" }}
          >
            {left.label}
          </p>
          <ImageLightbox
            src={left.src}
            alt=""
            className="w-full rounded-lg border border-[#EAE4DE]"
            style={{ borderRadius: "8px" }}
          />
          <p
            className="mt-3 text-[13px] leading-[1.5] text-[#6B6360]"
            style={{ marginTop: "12px" }}
          >
            {left.caption}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div
          className="rounded-[10px] border border-[#EAE4DE] bg-[#F3EFEB] p-7"
          style={{ padding: "32px 28px" }}
        >
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
            style={{ marginBottom: "16px" }}
          >
            {right.label}
          </p>
          <ImageLightbox
            src={right.src}
            alt=""
            className="w-full rounded-lg border border-[#EAE4DE]"
            style={{ borderRadius: "8px" }}
          />
          <p
            className="mt-3 text-[13px] leading-[1.5] text-[#6B6360]"
            style={{ marginTop: "12px" }}
          >
            {right.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
