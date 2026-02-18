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
            them without engineering. I audited the codebase, found three
            structural patterns hiding inside hundreds of rules, and designed the
            constrained interfaces that cut product launch time from a year to 90
            days.
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

        {/* 2. Image: Freestyle (before) */}
        <ImageBlockPerm
          label="Before: Engineering's rule configuration"
          src={getImage("rules-freestyle-before", "/images/rules-freestyle-before.png")}
          caption="This is what configuring a rule looked like for engineers. Every rule was a custom implementation with bespoke logic. Business users couldn't touch this without filing a ticket."
        />

        {/* 3. The Situation */}
        <Section label="The Situation" heading="Launching a new insurance product took a year.">
          <BodyP>
            Business users (product owners and analysts) at Haven Technology
            maintained detailed checklists of every underwriting requirement: if
            the applicant is in the armed forces, decline. If BMI is above a
            certain threshold, adjust the rate class. If they&apos;ve had a
            specific diagnosis within a lookback period, flag for review. They
            knew the logic cold.
          </BodyP>
          <BodyP>
            But every change required a Jira ticket to engineering. Engineers
            translated those requirements into nested if-then trees in code. The
            more complicated a rule, the longer it took to code correctly with all
            the edge cases. Miscommunication between a business requirement and
            its code implementation meant potential underwriting errors, which in
            insurance is a serious risk.
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
            products faster. The existing workflow was the bottleneck.
          </BodyP>
        </Section>

        {/* 4. The Diagnosis */}
        <Section label="The Diagnosis" heading="Hundreds of unique rules. Three structural patterns.">
          <BodyP>
            The obvious framing was &quot;business users can&apos;t self-serve, so
            build them a form builder.&quot; But the problem was deeper than
            access.
          </BodyP>
          <BodyP>
            I audited the existing codebase. What I found: engineers were
            building each rule as a custom implementation, with bespoke logic for
            every condition. Hundreds of rules, each coded as if it were unique.
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
            This was the key diagnostic insight: the business didn&apos;t need a
            general-purpose rule builder. They needed constrained interfaces
            designed around these three structural patterns. Constrained was the
            point. A form that knows it&apos;s building a Lookback rule can guide
            the user, validate inputs, and prevent errors in ways a generic
            builder can&apos;t.
          </BodyP>
        </Section>

        {/* 5. The Intervention */}
        <Section label="The Intervention" heading="Constraint over flexibility.">
          <BodyP>
            Instead of building a flexible form builder that could model
            &quot;anything,&quot; I designed three specific rule-creation
            interfaces, each tailored to one structural pattern. Each interface
            constrained what users could input in ways that matched how the
            underlying logic actually worked.
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
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A09893]" style={{ marginBottom: "8px" }}>Before</p>
                <p className="text-[14px] font-medium text-[#1A1A1A]">A general-purpose rule builder that can model anything</p>
              </div>
              <span className="hidden shrink-0 text-2xl text-[#C74B6F] md:inline" aria-hidden>→</span>
              <div className="flex w-full justify-center md:hidden">
                <span className="text-2xl text-[#C74B6F]" aria-hidden>→</span>
              </div>
              <div className="flex-1 rounded-lg bg-[#FDF0F3] p-5" style={{ padding: "20px 24px", borderRadius: "8px" }}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C74B6F]" style={{ marginBottom: "8px" }}>After</p>
                <p className="text-[14px] font-medium text-[#1A1A1A]">Three constrained interfaces, each designed for one structural pattern</p>
              </div>
            </div>
          </div>
          <BodyP>
            For Standard rules: simple condition/outcome pairs with dropdowns for
            data types and operators. For Lookback rules: the same, plus a time
            window selector that enforced valid lookback periods. For Aggregation
            rules: a different interface entirely that let users select which
            existing rules to aggregate and define thresholds.
          </BodyP>
          <TwoUpImages
            left={{
              label: "After: Standard rule (constrained form)",
              src: getImage("rules-standard-after", "/images/rules-standard-after.png"),
              caption:
                "A Standard rule: condition → decision → output. The form constrains inputs to valid options. A business user can configure this in minutes.",
            }}
            right={{
              label: "After: Lookback rule (constrained form)",
              src: getImage("rules-lookback-after", "/images/rules-lookback-after.png"),
              caption:
                "A Lookback rule adds a time window and property checks. The interface enforces valid lookback periods automatically.",
            }}
          />
          <BodyP>
            I also designed Freestyle mode: a structured view of the raw rule
            logic for engineers who needed to handle edge cases the constrained
            interfaces couldn&apos;t cover. This was a deliberate scoping
            decision. Rather than trying to make the business-facing UI handle
            100% of cases, I covered ~80% with the constrained interfaces and gave
            engineers a faster frontend for the rest.
          </BodyP>
          <BodyP last>
            The design went through 5-6 major iterations, from early explorations
            of basic if-then toggles, through dependency flow diagrams, to the
            final constrained forms. Each iteration was tested against real
            underwriting rules from Haven Simple, their main new product.
          </BodyP>
        </Section>

        {/* 6. Image: Workflow view */}
        <ImageBlockPerm
          label="Rule dependencies made visible"
          src={getImage("rules-workflow", "/images/rules-workflow.png")}
          caption="The Workflow view made rule dependencies visible for the first time. Business users could see how rules connected and executed in sequence, rather than treating each one as isolated."
        />

        {/* 7. What Changed */}
        <Section label="What Changed" heading="Business users could configure rules directly.">
          <ReframeInline
            beforeLabel="Before"
            beforeText="Write requirement → file ticket → engineer codes it → QA → deploy"
            afterLabel="After"
            afterText="Configure directly in the tool in a single session"
          />
          <BodyP last>
            Business users could configure the majority of underwriting rules
            directly, without filing tickets or waiting for engineering cycles.
            The dependency between rules became visible through the workflow view,
            so users could understand how rules interacted rather than treating
            each one as isolated.
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
            had required. Business users adopted the tool for rule configuration.
            Engineering tickets for routine rule changes dropped significantly.
          </BodyP>
          <BodyP last>
            The company dissolved before the tool reached full commercial rollout
            across multiple products. But the system worked: it was validated
            against a real product (Haven Simple), used by actual business
            stakeholders, and demonstrated that the structural-pattern approach
            could handle real-world underwriting complexity.
          </BodyP>
        </Section>

        {/* 9. My Role */}
        <Section label="My Role" heading="Sole designer. Codebase auditor. System architect.">
          <BodyP>
            I was the sole designer embedded in an engineering team. I personally
            audited the codebase to identify the three rule patterns, which was
            the diagnostic move that shaped the entire product direction. I
            designed every iteration of the rule configuration UI, tested against
            real underwriting rules, and made the scoping decision to split
            between constrained business interfaces and Freestyle engineering
            mode.
          </BodyP>
          <BodyP last>
            The call I owned: choosing constraint over flexibility. The
            engineering team&apos;s instinct was to build a general-purpose rule
            builder. I argued that understanding the domain well enough to
            constrain the tool was the higher-leverage move, and the 90-day
            Haven Simple configuration validated that bet.
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
            When I looked at hundreds of seemingly unique rules, I found three
            patterns. This is a move I make consistently: instead of designing
            for the surface-level variety of a problem, I look for the
            structural patterns underneath and design constrained systems around
            those patterns. Constrained is the key word. The instinct in tool
            design is to build for maximum flexibility. But flexibility without
            structure just moves the complexity from one place to another.
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
