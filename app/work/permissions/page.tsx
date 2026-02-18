import Link from "next/link";
import { getImage } from "../../../lib/images";
import { Nav } from "../../components/Nav";
import { ImageLightbox } from "../../components/ImageLightbox";

function Section({
  label,
  heading,
  children,
  noBorder,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <section
      className="border-b border-[#EAE4DE] py-[72px]"
      style={noBorder ? { borderBottom: "none" } : undefined}
    >
      <p
        className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]"
        style={{ marginBottom: "12px" }}
      >
        {label}
      </p>
      <h2
        className="mb-7 text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
        style={{ marginBottom: "28px" }}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

function BodyP({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <p
      className="text-[17px] leading-[1.75] text-[#6B6360]"
      style={{ marginBottom: last ? 0 : "12px" }}
    >
      {children}
    </p>
  );
}

function ImageBlockPerm({ label, src, caption }: { label: string; src: string; caption: string }) {
  return (
    <div className="my-12" style={{ margin: "48px 0" }}>
      <p
        className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
        style={{ marginBottom: "14px" }}
      >
        {label}
      </p>
      <div
        className="w-full overflow-hidden rounded-[10px]"
        style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)" }}
      >
        <ImageLightbox
          src={src}
          alt=""
          className="block w-full"
        />
      </div>
      <p
        className="mt-3.5 max-w-[600px] text-[13px] leading-[1.55] text-[#A09893]"
        style={{ marginTop: "14px" }}
      >
        {caption}
      </p>
    </div>
  );
}

function ReframeInline({
  beforeLabel,
  beforeText,
  afterLabel,
  afterText,
}: {
  beforeLabel: string;
  beforeText: string;
  afterLabel: string;
  afterText: string;
}) {
  return (
    <div
      className="my-2 flex flex-col items-stretch gap-5 border-y border-[#EAE4DE] py-9 md:flex-row md:items-start md:gap-5"
      style={{ padding: "36px 0", borderColor: "#EAE4DE" }}
    >
      <div className="flex-1">
        <p
          className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
          style={{ marginBottom: "10px" }}
        >
          {beforeLabel}
        </p>
        <p className="text-[18px] font-medium leading-[1.35] text-[#1A1A1A]">{beforeText}</p>
      </div>
      <span className="hidden shrink-0 text-2xl text-[#C74B6F] md:inline" style={{ paddingTop: "28px" }} aria-hidden>→</span>
      <div className="flex w-full justify-center py-2 md:hidden">
        <span className="text-2xl text-[#C74B6F]" aria-hidden>→</span>
      </div>
      <div className="flex-1">
        <p
          className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C74B6F]"
          style={{ marginBottom: "10px" }}
        >
          {afterLabel}
        </p>
        <p className="text-[18px] font-medium leading-[1.35] text-[#1A1A1A]">{afterText}</p>
      </div>
    </div>
  );
}

function TwoUpImages({
  left,
  right,
}: {
  left: { label: string; src: string; caption: string };
  right: { label: string; src: string; caption: string };
}) {
  return (
    <div
      className="my-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6"
      style={{ margin: "48px 0", gap: "24px" }}
    >
      <div>
        <p
          className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
          style={{ marginBottom: "14px" }}
        >
          {left.label}
        </p>
        <div
          className="w-full overflow-hidden rounded-[10px]"
          style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)" }}
        >
          <ImageLightbox src={left.src} alt="" className="block w-full" />
        </div>
        <p
          className="mt-3.5 max-w-[600px] text-[13px] leading-[1.55] text-[#A09893]"
          style={{ marginTop: "14px" }}
        >
          {left.caption}
        </p>
      </div>
      <div>
        <p
          className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
          style={{ marginBottom: "14px" }}
        >
          {right.label}
        </p>
        <div
          className="w-full overflow-hidden rounded-[10px]"
          style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)" }}
        >
          <ImageLightbox src={right.src} alt="" className="block w-full" />
        </div>
        <p
          className="mt-3.5 max-w-[600px] text-[13px] leading-[1.55] text-[#A09893]"
          style={{ marginTop: "14px" }}
        >
          {right.caption}
        </p>
      </div>
    </div>
  );
}

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main
        className="mx-auto max-w-[860px] px-10 pb-[120px]"
        style={{ paddingLeft: "40px", paddingRight: "40px", paddingBottom: "120px" }}
      >
        {/* Back link above content */}
        <div style={{ padding: "28px 48px 0" }}>
          <Link
            href="/"
            className="text-[13px] text-[#C74B6F] no-underline hover:underline"
          >
            ← Back to all work
          </Link>
        </div>

        {/* 1. Hero */}
        <section
          className="pb-12 pt-[72px] text-center"
          style={{ padding: "72px 0 48px" }}
        >
          <div
            className="mb-6 flex flex-wrap items-center justify-center gap-[10px]"
            style={{ marginBottom: "24px" }}
          >
            <span
              className="rounded px-2.5 py-1 text-[11px] font-medium text-[#C74B6F] bg-[#FDF0F3]"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
            >
              Systems Design
            </span>
            <span className="text-[13px] text-[#A09893]">WCG · eReview Manager</span>
          </div>
          <h1
            className="mb-7 text-[56px] font-medium leading-[1.08] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ marginBottom: "28px" }}
          >
            From Spreadsheet
            <br />
            to System
          </h1>
          <p
            className="mx-auto mb-12 max-w-[640px] text-[19px] leading-[1.65] text-[#6B6360]"
            style={{ marginBottom: "48px" }}
          >
            Clients couldn&apos;t access their own submissions. Months of meetings
            hadn&apos;t fixed it. I interrogated the assumptions underneath the
            permissions model, found they didn&apos;t hold, and designed a
            two-part system that resolved the #1 client complaint.
          </p>
          {/* Stats row */}
          <div
            className="flex flex-col border-t border-b border-[#EAE4DE] py-8 md:flex-row md:justify-center"
            style={{ padding: "32px 0", borderColor: "#EAE4DE" }}
          >
            <div className="flex flex-1 flex-col items-center justify-center border-b border-[#EAE4DE] px-8 py-4 last:border-b-0 md:border-b-0 md:border-r md:py-0 md:last:border-r-0" style={{ padding: "0 32px" }}>
              <p
                className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]"
                style={{ marginBottom: "4px" }}
              >
                #1
              </p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Client complaint resolved</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center border-b border-[#EAE4DE] px-8 py-4 last:border-b-0 md:border-b-0 md:border-r md:py-0" style={{ padding: "0 32px" }}>
              <p
                className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]"
                style={{ marginBottom: "4px" }}
              >
                1 sprint
              </p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Workshop to first iterations</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center border-b-0 px-8 py-4 md:border-b-0 md:py-0" style={{ padding: "0 32px" }}>
              <p
                className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]"
                style={{ marginBottom: "4px" }}
              >
                Still scaling
              </p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Team extended post-handoff</p>
            </div>
          </div>
        </section>

        {/* 2. Image: Permissions Spreadsheet */}
        <ImageBlockPerm
          label="Before: The permissions spreadsheet"
          src={getImage("permissions-spreadsheet", "/images/permissions-spreadsheet.png")}
          caption="The team's attempt to enumerate every role-permission combination. Each new user type added another column. Each new feature added another row. The matrix grew faster than the team could maintain it."
        />

        {/* 3. The Situation */}
        <Section
          label="The Situation"
          heading="The team couldn't agree on who should see what. MVP 2 was blocked."
        >
          <BodyP>
            WCG was consolidating three legacy IRB review systems into one
            platform. The business responded by building a massive spreadsheet:
            10+ distinct roles for external users alone, each mapped to job
            titles. Nobody could confidently grant access. The team defaulted to
            being overly restrictive.
          </BodyP>
          <div className="py-10" style={{ padding: "40px 0" }}>
            <p
              className="text-[28px] font-medium italic leading-[1.35] tracking-[-0.01em] text-[#C74B6F]"
              style={{ fontSize: "28px" }}
            >
              We are not clear on the problem to solve.
            </p>
            <cite className="mt-3 block text-[12px] font-normal not-italic text-[#A09893]" style={{ marginTop: "12px" }}>
              Team sticky note from planning session
            </cite>
          </div>
          <BodyP>
            External users were regularly locked out of submissions they needed.
            In user research, the number one complaint from clients: no
            visibility into their own work after submitting. Multiple meetings.
            No forward movement. The permissioning work was blocking MVP 2.
          </BodyP>
        </Section>

        {/* 4. The Diagnosis */}
        <Section
          label="The Diagnosis"
          heading="The spreadsheet wasn't the problem. The assumption behind it was."
        >
          <BodyP>
            The PM had built the spreadsheet in good faith. The data is
            sensitive: clinical trial submissions, investigator records,
            regulatory documents. The instinct was to lock it down by role.
            Nobody had asked the harder question: what actually needs
            protecting, from whom, and why?
          </BodyP>
          <BodyP>
            When I asked it, the complexity started collapsing. Internal users
            were already compliance-trained. The system didn&apos;t need to
            restrict their access, it needed to trust it. External users
            didn&apos;t need a role matrix. They needed scoped access at the
            moment of invitation.
          </BodyP>
          <ReframeInline
            beforeLabel="Before"
            beforeText="What role does each job title map to?"
            afterLabel="After"
            afterText="What actually needs protecting, from whom, and why?"
          />
          <BodyP last>
            The spreadsheet was trying to pre-solve both problems with one
            mechanism. That&apos;s why it kept growing. The problem wasn&apos;t
            the answers. It was the question.
          </BodyP>
        </Section>

        {/* 5. The Intervention */}
        <Section
          label="The Intervention"
          heading="One pre-work audit. One workshop. Two systems."
        >
          <BodyP>
            Before the workshop, I audited the spreadsheet not to clean it up
            but to interrogate it, asking what each role was actually
            protecting against, and whether that threat was real. That pre-work
            let me walk in already knowing the structure needed to change, not
            just be simplified.
          </BodyP>
          <BodyP>
            The workshop shifted the team from enumerating answers to designing
            the system that could generate them. Alignment in a single session,
            not because the answer was obvious, but because the right question
            made it visible.
          </BodyP>
          <ImageBlockPerm
            label="Workshop: mapping the real system"
            src={getImage("figjam-workshop", "/images/figjam-workshop.png")}
            caption="Real-time decisions from the session. The crossed-out sticky is the original question, replaced mid-workshop once the team saw the underlying structure."
          />
          <BodyP>
            From there I designed two complementary systems, because internal
            and external users had fundamentally different access needs.
          </BodyP>
          <div
            className="mt-4 grid grid-cols-1 gap-12 border-t border-[#EAE4DE] py-10 md:grid-cols-2"
            style={{ padding: "40px 0", gap: "48px", marginTop: "16px" }}
          >
            <div>
              <p
                className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C74B6F]"
                style={{ marginBottom: "10px" }}
              >
                For internal users
              </p>
              <p
                className="mb-2.5 text-[18px] font-medium leading-[1.25] text-[#1A1A1A]"
                style={{ marginBottom: "10px" }}
              >
                Capability matrix in the admin panel
              </p>
              <p className="text-[15px] leading-[1.65] text-[#6B6360]">
                Roles are composed by combining a finite set of capabilities
                with access levels. Any role, current or future, is just a
                specific combination. New role types don&apos;t require new
                spreadsheet columns.
              </p>
            </div>
            <div>
              <p
                className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C74B6F]"
                style={{ marginBottom: "10px" }}
              >
                For external users
              </p>
              <p
                className="mb-2.5 text-[18px] font-medium leading-[1.25] text-[#1A1A1A]"
                style={{ marginBottom: "10px" }}
              >
                Contextual invite flow
              </p>
              <p className="text-[15px] leading-[1.65] text-[#6B6360]">
                Access is scoped to a specific study or site at the moment of
                invitation, by the person who knows what that collaborator
                needs. No blanket access. No role matrix to maintain.
              </p>
            </div>
          </div>
        </Section>

        {/* 6. What Changed */}
        <Section
          label="What Changed"
          heading="The spreadsheet became two systems."
        >
          <ReframeInline
            beforeLabel="Before"
            beforeText="Convene a meeting, update the spreadsheet, file tickets for engineering"
            afterLabel="After"
            afterText="Check the boxes in the admin panel, or assign at the moment of invitation"
          />
          <TwoUpImages
            left={{
              label: "After: Edit User Role (internal)",
              src: getImage("permissions-internal-role", "/images/permissions-internal-role.png"),
              caption:
                "User roles composed from capability-access combinations. New roles need no new architecture.",
            }}
            right={{
              label: "After: Invite Team Member to Site",
              src: getImage("permissions-invite-site", "/images/permissions-invite-site.png"),
              caption:
                "Access assigned at the moment of invitation. No admin ticket. No pre-defined role matrix.",
            }}
          />
        </Section>

        {/* 7. The Outcome */}
        <Section
          label="The Outcome"
          heading="It shipped. Then the team extended it without me."
        >
          <BodyP>
            The permissions redesign unblocked MVP 2 development. First
            iterations within one sprint of the workshop. After I stepped back,
            the team added more granular permissions within the architecture I
            designed. The fact that it held up to extension without structural
            changes is the strongest evidence the underlying model was sound.
          </BodyP>
          <BodyP last>
            The #1 client complaint was resolved. External users could be
            invited into specific studies and sites with scoped access. Users
            who needed access to existing studies had a clear pathway to request
            it rather than hitting a dead end.
          </BodyP>
        </Section>

        {/* 8. My Role */}
        <Section
          label="My Role"
          heading="End-to-end: from interrogating the premise to shipping the system."
        >
          <BodyP>
            I led this end-to-end: auditing the spreadsheet to identify the
            false assumption, facilitating the workshop that reframed the
            team&apos;s approach, and designing both the admin interface and
            the external invite flow through multiple iterations. I worked
            closely with Arijit (design vision) and Jimin (UI and design
            systems).
          </BodyP>
          <BodyP last>
            The call I personally made: refusing to optimize the existing
            spreadsheet and instead pushing the team to interrogate what it was
            protecting against. That meant the workshop couldn&apos;t be a
            cleanup session. It had to start with whether the threat model was
            real.
          </BodyP>
        </Section>

        {/* 9. The Pattern */}
        <Section
          label="The Pattern"
          heading="Two focused systems beat one flexible system that handles nothing well."
          noBorder
        >
          <BodyP last>
            Enterprise platforms inevitably reach a permissions inflection point
            as they grow. The instinct is to enumerate: map every role to every
            permission, add columns for every new user type. The intervention
            here wasn&apos;t a better spreadsheet. It was interrogating whether
            the threat model behind the spreadsheet was real. Once the
            assumption collapsed, the architecture simplified. Not all
            permissions problems look the same: internal and external access are
            different problems that need different mechanisms.
          </BodyP>
        </Section>

        {/* 10. Footer */}
        <div
          className="border-t border-[#EAE4DE] pt-12"
          style={{ paddingTop: "48px", marginTop: "24px", borderColor: "#EAE4DE" }}
        >
          <Link
            href="/"
            className="text-[14px] text-[#C74B6F] no-underline hover:underline"
          >
            ← Back to all work
          </Link>
        </div>
      </main>
    </div>
  );
}
