"use client";

interface CrisisResourcesProps {
  onAcknowledge: () => void;
}

const RESOURCES = [
  {
    name: "988 Suicide & Crisis Lifeline",
    action: "Call or text 988",
    description: "Free, confidential support 24/7",
    url: "https://988lifeline.org",
  },
  {
    name: "Crisis Text Line",
    action: "Text HOME to 741741",
    description: "Free crisis counseling via text",
    url: "https://www.crisistextline.org",
  },
  {
    name: "SAMHSA National Helpline",
    action: "1-800-662-4357",
    description: "Treatment referrals and information",
    url: "https://www.samhsa.gov/find-help/national-helpline",
  },
];

export function CrisisResources({ onAcknowledge }: CrisisResourcesProps) {
  return (
    <div className="w-full">
      <div className="mb-6 rounded-xl border border-[#E8B4B8] bg-[#FDF0F3] p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C74B6F]/15">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 6v4M10 14h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#C74B6F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">
              We noticed you may be going through a difficult time
            </h3>
          </div>
        </div>
        <p className="mb-4 text-[14px] leading-relaxed text-[#6B6360]">
          Your feelings are valid and you don&apos;t have to face this alone.
          Here are some resources that may help. Please reach out if you need
          support.
        </p>
      </div>

      <div className="mb-6 space-y-3">
        {RESOURCES.map((resource) => (
          <a
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-[#EAE4DE] bg-white p-5 transition-all hover:border-[#C74B6F] hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {resource.name}
                </p>
                <p className="mt-1 text-[14px] font-medium text-[#C74B6F]">
                  {resource.action}
                </p>
                <p className="mt-0.5 text-[13px] text-[#A09893]">
                  {resource.description}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-[#C0B9B4]"
                aria-hidden="true"
              >
                <path
                  d="M5 3h8v8M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={onAcknowledge}
        className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
      >
        I&apos;ve reviewed these resources — Continue
      </button>
    </div>
  );
}
