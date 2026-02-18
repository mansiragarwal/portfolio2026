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
      style={{ marginBottom: last ? 0 : "20px" }}
    >
      {children}
    </p>
  );
}

function ImageBlockPerm({ label, src, caption, margin = "48px 0" }: { label: string; src: string; caption: string; margin?: string }) {
  return (
    <div className="my-12" style={{ margin }}>
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
        <ImageLightbox src={src} alt="" className="block w-full" />
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
      className="my-9 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6"
      style={{ margin: "36px 0", gap: "24px" }}
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

export default function RulesManagerPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main
        className="mx-auto max-w-[860px] px-10 pb-[120px]"
        style={{ paddingLeft: "40px", paddingRight: "40px", paddingBottom: "120px" }}
      >
        <div style={{ padding: "28px 48px 0" }}>
          <Link href="/" className="text-[13px] text-[#C74B6F] no-underline hover:underline">
            ← Back to all work
          </Link>
        </div>

        {/* 1. Hero */}
        <section className="pb-12 pt-[72px] text-center" style={{ padding: "72px 0 48px" }}>
          <div
            className="mb-6 flex flex-wrap items-center justify-center gap-[10px]"
            style={{ marginBottom: "24px" }}
          >
            <span
              className="rounded px-2.5 py-1 text-[11px] font-medium text-[#C74B6F] bg-[#FDF0F3]"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
            >
              0→1 Product
            </span>
            <span className="text-[13px] text-[#A09893]">Haven Technology</span>
          </div>
          <h1
            className="mb-7 text-[56px] font-medium leading-[1.08] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ marginBottom: "28px" }}
          >
            From Code
            <br />
            to Configuration
          </h1>
          <p
            className="mx-auto mb-12 max-w-[640px] text-[19px] leading-[1.65] text-[#6B6360]"
            style={{ marginBottom: "48px" }}
          >
            Business users knew the underwriting rules cold but couldn&apos;t touch
            them without engineering. I audited the codebase, mapped three
            incompatible mental models, found three structural patterns hiding
            inside hundreds of rules, and designed the constrained interfaces
            that cut product launch time from a year to 90 days.
          </p>
          <div
            className="flex flex-col border-t border-b border-[#EAE4DE] py-8 md:flex-row md:justify-center"
            style={{ padding: "32px 0", borderColor: "#EAE4DE" }}
          >
            <div
              className="flex flex-1 flex-col items-center justify-center border-b border-[#EAE4DE] px-8 py-4 last:border-b-0 md:border-b-0 md:border-r md:py-0 md:last:border-r-0"
              style={{ padding: "0 32px" }}
            >
              <p className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]" style={{ marginBottom: "4px" }}>1 yr → 90 days</p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Product launch time</p>
            </div>
            <div
              className="flex flex-1 flex-col items-center justify-center border-b border-[#EAE4DE] px-8 py-4 last:border-b-0 md:border-b-0 md:border-r md:py-0"
              style={{ padding: "0 32px" }}
            >
              <p className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]" style={{ marginBottom: "4px" }}>3 patterns</p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Found inside hundreds of rules</p>
            </div>
            <div
              className="flex flex-1 flex-col items-center justify-center border-b-0 px-8 py-4 md:border-b-0 md:py-0"
              style={{ padding: "0 32px" }}
            >
              <p className="mb-1 text-[30px] font-semibold tracking-[-0.02em] text-[#C74B6F]" style={{ marginBottom: "4px" }}>Sole designer</p>
              <p className="text-[12px] leading-[1.4] text-[#A09893]">Embedded in engineering team</p>
            </div>
          </div>
        </section>

        {/* 2. Image: The business user spreadsheet */}
        <ImageBlockPerm
          label="Before: The business user rule specification"
          src={getImage("rules-before-spreadsheet", "/images/rules-before-spreadsheet.png")}
          caption="The document business users handed to engineering. Every underwriting requirement written out in plain language: conditions, responses, edge cases, notes. Accurate, detailed, and completely inaccessible to the system that needed to run it."
        />

        {/* 3. The Situation */}
        <Section label="The Situation" heading="Launching a new insurance product took a year.">
          <BodyP>
            Business users at Haven Technology were the domain experts. Product
            owners and analysts with 20+ years in the industry, they had shaped
            many products and knew the underwriting logic cold: if the applicant
            is in the armed forces, decline. If BMI is above a certain threshold,
            adjust the rate class. If they&apos;ve had a specific diagnosis within
            a lookback period, flag for review.
          </BodyP>
          <BodyP>
            But none of that knowledge could reach production without going
            through engineering. Business users wrote requirements in spreadsheets
            and documents. Engineers translated those into nested if-then trees in
            code. Every translation was an opportunity for error. In insurance, an
            underwriting error is a serious risk.
          </BodyP>
          <div className="py-10" style={{ padding: "40px 0" }}>
            <p
              className="text-[28px] font-medium italic leading-[1.35] tracking-[-0.01em] text-[#C74B6F]"
              style={{ fontSize: "28px" }}
            >
              Product launches moved at the speed of the ticket queue, not the
              speed of business decisions.
            </p>
          </div>
          <BodyP last>
            Haven Technology&apos;s leadership wanted to sell more insurance
            products faster. The knowledge existed. The bottleneck was the
            distance between knowing and shipping.
          </BodyP>
        </Section>

        {/* 4. The Diagnosis */}
        <Section label="The Diagnosis" heading="The same problem, described in three incompatible languages.">
          <BodyP>
            The obvious framing was &quot;business users can&apos;t self-serve, so
            build them a form builder.&quot; But before designing anything, I
            needed to understand how different people in the system were actually
            thinking about the problem.
          </BodyP>
          <BodyP>
            I audited three artifacts: the codebase, the business user
            spreadsheets, and the actual insurance application forms. The same
            underwriting logic appeared in all three, described completely
            differently each time. That wasn&apos;t just an access problem. It was
            a translation problem, and it was happening at every handoff.
          </BodyP>
          <ImageBlockPerm
            label="Discovery: six stakeholders, six mental models"
            src={getImage("rules-diagnosis-mental-models", "/images/rules-diagnosis-mental-models.png")}
            caption="Each person's map of how the Rules Manager should work. Adam (dev), Katherine, Thomas, Norm (PMs), Kristen and Laura (business users) — same tool, fundamentally different mental models of what it was for and how it would be used."
            margin="32px 0"
          />
          <BodyP>
            The business users were the source of truth. They had the deepest
            domain knowledge, but they were used to working without guardrails:
            docs, spreadsheets, no structure enforced. The PMs would be the first
            real users of the tool, translating between business intent and
            production. The developers were the current gatekeepers and would
            remain necessary for edge cases the tool couldn&apos;t cover.
          </BodyP>
          <ReframeInline
            beforeLabel="Before"
            beforeText="Why can't business users just configure the rules directly?"
            afterLabel="After"
            afterText="What shared structure can three incompatible mental models all map onto?"
          />
          <BodyP>
            The workshop brought all three groups together to surface where their
            models diverged. What emerged: the codebase wasn&apos;t as custom as
            it looked. Beneath hundreds of seemingly unique rules were three
            structural patterns. That finding became the foundation of the entire
            product.
          </BodyP>
          <div
            className="my-7 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7 text-center"
            style={{ margin: "28px 0", padding: "28px" }}
          >
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09893]"
              style={{ marginBottom: "12px" }}
            >
              Core insight
            </p>
            <p className="text-[24px] font-medium text-[#1A1A1A]">
              Hundreds of rules → <span className="text-[#C74B6F]">3 patterns</span>
            </p>
          </div>
          <div
            className="my-6 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7"
            style={{ margin: "24px 0", padding: "32px 28px" }}
          >
            <p className="mb-1 text-[16px] font-semibold text-[#1A1A1A]" style={{ marginBottom: "4px" }}>Standard rules</p>
            <p className="mb-4 text-[14px] leading-[1.6] text-[#6B6360]">
              Simple condition → outcome. &quot;If armed forces = yes, decline.&quot;
            </p>
            <hr className="my-4 border-[#EAE4DE]" style={{ margin: "16px 0" }} />
            <p className="mb-1 text-[16px] font-semibold text-[#1A1A1A]" style={{ marginBottom: "4px" }}>Lookback rules</p>
            <p className="mb-4 text-[14px] leading-[1.6] text-[#6B6360]">
              Condition + time window. &quot;If diagnosed with X within the last Y years, flag.&quot;
            </p>
            <hr className="my-4 border-[#EAE4DE]" style={{ margin: "16px 0" }} />
            <p className="mb-1 text-[16px] font-semibold text-[#1A1A1A]" style={{ marginBottom: "4px" }}>Aggregation rules</p>
            <p className="text-[14px] leading-[1.6] text-[#6B6360]">
              Rules that operate on the outputs of other rules. &quot;If 3+ risk factors are flagged, escalate.&quot;
            </p>
          </div>
          <BodyP last>
            This was the structural layer all three mental models could map onto.
            The business user&apos;s plain-language checklist, the PM&apos;s
            configuration workflow, the developer&apos;s code logic (each was just
            a different representation of the same three patterns).
          </BodyP>
        </Section>

        {/* 5. The Intervention */}
        <Section label="The Intervention" heading="Build for the translator first. Abstract toward the expert.">
          <BodyP>
            Jumping straight to a business-user-facing tool wasn&apos;t the right
            move. Business users were used to working without guardrails, in docs
            and spreadsheets, with no enforced structure. Designing a tool that
            fit their existing mental model would take significant research and
            iteration (time the product didn&apos;t have).
          </BodyP>
          <BodyP>
            Instead, I designed the first version for product managers: people
            who understood both the business logic and the technical structure,
            and who would act as the translation layer. Getting the PM-facing tool
            right first meant validating the structural patterns against real
            underwriting rules before investing in the more abstracted
            business-user interface.
          </BodyP>
          <div
            className="my-6 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-7"
            style={{ margin: "24px 0", padding: "32px 28px" }}
          >
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A09893]"
              style={{ marginBottom: "16px" }}
            >
              Design philosophy
            </p>
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-5">
              <div className="flex-1 rounded-lg bg-[#F3EFEB] p-5" style={{ padding: "20px 24px", borderRadius: "8px" }}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A09893]" style={{ marginBottom: "8px" }}>The instinct</p>
                <p className="text-[14px] font-medium text-[#1A1A1A]">Build the most abstracted, business-user-friendly tool first</p>
              </div>
              <span className="hidden shrink-0 text-2xl text-[#C74B6F] md:inline" aria-hidden>→</span>
              <div className="flex w-full justify-center md:hidden">
                <span className="text-2xl text-[#C74B6F]" aria-hidden>→</span>
              </div>
              <div className="flex-1 rounded-lg bg-[#FDF0F3] p-5" style={{ padding: "20px 24px", borderRadius: "8px" }}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]" style={{ marginBottom: "8px" }}>The decision</p>
                <p className="text-[14px] font-medium text-[#1A1A1A]">Validate the structural patterns with PMs first, then abstract toward business users</p>
              </div>
            </div>
          </div>
          <BodyP>
            For each of the three patterns, I designed a constrained interface
            that matched how that type of rule actually worked. Each interface
            limited what users could input in ways that prevented the translation
            errors that had been causing underwriting mistakes.
          </BodyP>
          <TwoUpImages
            left={{
              label: "Standard rule (constrained form)",
              src: getImage("rules-after-standard", "/images/rules-after-standard.png"),
              caption:
                "A Standard rule: condition → decision → output. The form constrains inputs to valid options. A PM can configure this in minutes without filing a ticket.",
            }}
            right={{
              label: "Lookback rule (constrained form)",
              src: getImage("rules-after-lookback", "/images/rules-after-lookback.png"),
              caption:
                "A Lookback rule adds a time window and property checks. The interface enforces valid lookback periods automatically — a class of error that previously required careful manual QA.",
            }}
          />
          <BodyP>
            I also designed Freestyle mode for developers: a structured frontend
            for the 15-20% of rules too complex for the constrained interfaces.
            This wasn&apos;t a concession (it was a deliberate architectural
            decision). Keeping developers in the system for genuinely complex
            edge cases was the right call. Freestyle gave them a faster, more
            structured way to do that work without returning to raw code.
          </BodyP>
          <ImageBlockPerm
            label="Freestyle mode: for engineers, for edge cases"
            src={getImage("rules-before-freestyle", "/images/rules-before-freestyle.png")}
            caption="The developer view. Not a workaround — a deliberate part of the system. Engineers handle the 15-20% of rules too complex for the constrained interfaces, with a structured frontend rather than raw code."
            margin="36px 0"
          />
          <BodyP last>
            The design went through 5-6 major iterations, from early explorations
            of basic if-then toggles through dependency flow diagrams to the
            final constrained forms. Each iteration was tested against real
            underwriting rules from Haven Simple.
          </BodyP>
        </Section>

        {/* 6. Image: Workflow view */}
        <ImageBlockPerm
          label="Rule dependencies made visible"
          src={getImage("rules-workflow-view", "/images/rules-workflow-view.png")}
          caption="The Workflow view made rule execution order visible for the first time. Business users could see how rules connected and sequenced, rather than treating each one as isolated."
        />

        {/* 7. What Changed */}
        <Section label="What Changed" heading="The translation layer became the tool.">
          <ReframeInline
            beforeLabel="Before"
            beforeText="Write requirement → file ticket → engineer translates → QA → deploy"
            afterLabel="After"
            afterText="Configure directly in a single session, with the structure enforced by the form"
          />
          <BodyP last>
            Product managers could configure the majority of underwriting rules
            directly, without filing tickets or waiting for engineering cycles.
            Rule dependencies became visible through the workflow view, so the
            team could understand how rules interacted rather than treating each
            one as isolated. Developers remained in the loop for genuinely
            complex edge cases (by design, not by default).
          </BodyP>
        </Section>

        {/* 8. The Outcome */}
        <Section label="The Outcome" heading="Haven Simple: 90 days instead of a year.">
          <div
            className="my-8 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] py-12 px-9 text-center"
            style={{ margin: "32px 0", padding: "48px 36px", borderRadius: "10px" }}
          >
            <p className="text-[42px] font-semibold tracking-[-0.02em] text-[#C74B6F]" style={{ fontSize: "42px" }}>
              1 year → 90 days
            </p>
            <p className="mt-2 text-[16px] text-[#6B6360]" style={{ marginTop: "8px" }}>
              Product configuration time for Haven Simple
            </p>
          </div>
          <BodyP>
            Haven Simple was configured through the Rules Manager in approximately
            90 days, compared to the roughly year-long timeline previous products
            had required. Product managers adopted the tool for rule
            configuration. Engineering tickets for routine rule changes dropped
            significantly.
          </BodyP>
          <BodyP last>
            The company dissolved before the tool reached full commercial rollout.
            But the system worked: validated against a real product, used by
            actual stakeholders, and structured to progressively abstract toward
            business users as the next phase. The 90-day timeline was the proof
            of concept for that approach.
          </BodyP>
        </Section>

        {/* 9. My Role */}
        <Section label="My Role" heading="Sole designer. Codebase auditor. Sequencing strategist.">
          <BodyP>
            I was the sole designer embedded in an engineering team. I personally
            audited the codebase, the business user spreadsheets, and the
            insurance application forms (the diagnostic work that revealed the
            three-mental-models problem before a single screen was designed). I
            facilitated the workshop that surfaced where those models diverged,
            designed every iteration of the rule configuration UI, and tested
            each against real underwriting rules from Haven Simple.
          </BodyP>
          <BodyP last>
            The call I owned: sequencing toward business users rather than
            jumping to them. The instinct was to build the most accessible tool
            first. I argued that validating the structural patterns with PMs first
            was lower risk and would produce a better business-user tool in the
            long run. The 90-day Haven Simple configuration validated that bet.
          </BodyP>
        </Section>

        {/* 10. The Pattern (boxed) */}
        <div
          className="my-12 rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-8"
          style={{ margin: "48px 0", padding: "36px 32px", borderRadius: "10px" }}
        >
          <p
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]"
            style={{ marginBottom: "16px" }}
          >
            The Pattern
          </p>
          <p className="text-[17px] leading-[1.65] text-[#1A1A1A]">
            When I encounter complex domain knowledge trapped in the wrong
            format, I look for the structural layer underneath before designing
            any interface. The business users had 20+ years of expertise encoded
            in spreadsheets. The developers had that same logic encoded in
            bespoke code. Neither representation was wrong (they just couldn&apos;t
            talk to each other). Finding the three patterns that both
            representations shared made it possible to design a system that
            honored all three mental models without trying to collapse them into
            one.
          </p>
        </div>

        {/* 11. Footer */}
        <div
          className="border-t border-[#EAE4DE] pt-12"
          style={{ paddingTop: "48px", marginTop: "24px", borderColor: "#EAE4DE" }}
        >
          <Link href="/" className="text-[14px] text-[#C74B6F] no-underline hover:underline">
            ← Back to all work
          </Link>
        </div>
      </main>
    </div>
  );
}
