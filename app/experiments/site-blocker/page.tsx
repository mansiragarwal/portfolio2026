import Link from "next/link";
import { Nav } from "../../components/Nav";

const features = [
  {
    title: "Instant redirect",
    description:
      "Navigate to a blocked site and the page is intercepted before it loads. You see a task instead.",
  },
  {
    title: "Configurable schedule",
    description:
      "Set your own blocked hours — default is 10 AM to 5 PM. Outside those hours, sites load normally.",
  },
  {
    title: "Your task queue",
    description:
      "Pre-loaded with quick wins (push-ups, water, stretch). Add your own tasks from the popup.",
  },
  {
    title: "Skip penalty",
    description:
      "Skip a task and the site is locked for 5 minutes. A shame counter keeps track.",
  },
  {
    title: "Temporary pass",
    description:
      "Complete the task and you get 10 minutes of access to the site before blocking kicks in again.",
  },
  {
    title: "Stats & streaks",
    description:
      "Track completed tasks, skips, and daily streaks right from the extension popup.",
  },
];

const installSteps = [
  "Download and unzip the extension file below",
  <>
    Open your browser&apos;s extensions page — <code>chrome://extensions</code>,{" "}
    <code>edge://extensions</code>, <code>brave://extensions</code>, or{" "}
    <strong>Arc &gt; Extensions</strong>
  </>,
  <>
    Enable <strong>Developer mode</strong>
  </>,
  <>
    Click <strong>Load unpacked</strong> and select the unzipped folder
  </>,
  "The extension icon appears in your toolbar — click it to configure",
];

function DownloadButton() {
  return (
    <a
      href="/site-blocker-extension.zip"
      download
      className="inline-flex items-center gap-2 rounded-xl bg-[#C74B6F] px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#b3405f] hover:shadow-md"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download Extension (.zip)
    </a>
  );
}

function InstallSteps() {
  return (
    <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-[1.7] text-[#6B6360]">
      {installSteps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}

export default function SiteBlockerPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[720px] px-6 pb-20 pt-[72px]">
        <Link
          href="/experiments"
          className="mb-8 inline-block text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          &larr; Back to experiments
        </Link>

        <span className="mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-medium text-[#6B6360] bg-[#F3EFEB]">
          Chrome Extension · Productivity
        </span>
        <h1 className="mb-4 text-[38px] font-medium tracking-[-0.03em] text-[#1A1A1A]">
          Site Blocker
        </h1>
        <p className="mb-10 text-[18px] leading-[1.6] text-[#6B6360]">
          A browser extension that intercepts distracting sites and makes you
          complete a quick task before you can scroll. Built because I kept
          opening Instagram.
        </p>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            How it works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl border border-[#EAE4DE] bg-white p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDF0F3] text-[14px] font-bold text-[#C74B6F]">
                1
              </span>
              <div>
                <p className="text-[15px] font-medium text-[#1A1A1A]">
                  You visit a blocked site
                </p>
                <p className="mt-1 text-[14px] text-[#6B6360]">
                  Instagram, Twitter, Reddit — whatever you've added to the
                  list.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-[#EAE4DE] bg-white p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDF0F3] text-[14px] font-bold text-[#C74B6F]">
                2
              </span>
              <div>
                <p className="text-[15px] font-medium text-[#1A1A1A]">
                  Page is intercepted, task appears
                </p>
                <p className="mt-1 text-[14px] text-[#6B6360]">
                  Instead of the site, you see a quick task like &ldquo;Do 10
                  push-ups&rdquo; or &ldquo;Drink a glass of water.&rdquo;
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-[#EAE4DE] bg-white p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDF0F3] text-[14px] font-bold text-[#C74B6F]">
                3
              </span>
              <div>
                <p className="text-[15px] font-medium text-[#1A1A1A]">
                  Complete it to get through
                </p>
                <p className="mt-1 text-[14px] text-[#6B6360]">
                  Finish the task and you get 10 minutes of access. Skip it and
                  the site is locked for 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-[#EAE4DE] bg-white p-5"
              >
                <h3 className="mb-2 text-[15px] font-medium text-[#1A1A1A]">
                  {f.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-[#6B6360]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Defaults */}
        <section className="mb-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            What&apos;s included
          </h2>
          <div className="rounded-xl border border-[#EAE4DE] bg-white p-6">
            <div className="mb-4">
              <p className="mb-2 text-[13px] font-semibold text-[#1A1A1A]">
                Blocked sites (default)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "instagram.com",
                  "twitter.com",
                  "x.com",
                  "reddit.com",
                  "tiktok.com",
                  "youtube.com",
                  "facebook.com",
                ].map((site) => (
                  <span
                    key={site}
                    className="rounded-full bg-[#F3EFEB] px-3 py-1 text-[12px] font-medium text-[#6B6360]"
                  >
                    {site}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[13px] font-semibold text-[#1A1A1A]">
                Sample tasks
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Do 10 push-ups",
                  "Drink water",
                  "Write 3 gratitudes",
                  "Stretch 2 min",
                  "Clean your desk",
                  "Text someone you care about",
                  "Close 3 tabs",
                  "5 deep breaths",
                ].map((task) => (
                  <span
                    key={task}
                    className="rounded-full bg-[#FDF0F3] px-3 py-1 text-[12px] font-medium text-[#C74B6F]"
                  >
                    {task}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Download */}
        <section className="mb-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            Download
          </h2>
          <div className="mb-6 rounded-xl border border-[#EAE4DE] bg-white p-6 text-center">
            <p className="mb-4 text-[15px] text-[#6B6360]">
              Works on any Chromium browser — Chrome, Edge, Brave, Arc, Opera,
              Vivaldi.
            </p>
            <DownloadButton />
          </div>
        </section>

        {/* Install instructions */}
        <section className="mb-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            Install instructions
          </h2>
          <InstallSteps />
        </section>

        {/* Tech */}
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">
            Tech
          </h2>
          <p className="text-[15px] leading-[1.75] text-[#6B6360]">
            Chrome Manifest V3, vanilla JS, chrome.storage API,
            chrome.webNavigation API. No build step, no dependencies — plain
            HTML/CSS/JS that loads directly as an unpacked extension.
          </p>
        </section>
      </main>
    </div>
  );
}
