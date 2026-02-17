import { getImage } from "../../../lib/images";
import {
  BackLink,
  BigStatCallout,
  CoreInsightCallout,
  ImageBlock,
  PatternBox,
  PullQuote,
  ReframeCard,
  SectionHeading,
  SectionLabel,
  StatsRow,
  ThreePatternsCard,
  TwoImageRow,
} from "../components";
import { Nav } from "../../components/Nav";

function BodyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-[1.75] text-[#6B6360]" style={{ marginBottom: "16px" }}>
      {children}
    </p>
  );
}

export default function RulesManagerPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[720px] px-6" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
        {/* 1. Hero */}
        <section className="pt-[72px]">
          <div
            className="mb-5 flex flex-wrap items-center gap-2"
            style={{ gap: "8px", marginBottom: "20px" }}
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
            className="mb-4 text-[42px] font-medium leading-[1.2] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ marginBottom: "16px" }}
          >
            From Code to Configuration
          </h1>
          <p
            className="mb-8 text-[18px] leading-[1.6] text-[#6B6360]"
            style={{ marginBottom: "32px" }}
          >
            Business users knew the underwriting rules cold but couldn&apos;t
            touch them without engineering. I audited the codebase, found three
            structural patterns hiding inside hundreds of rules, and designed
            the constrained interfaces that cut product launch time from two
            years to 90 days.
          </p>
          <StatsRow
            stats={[
              { number: "2 yrs → 90 days", label: "Product launch time" },
              { number: "3 patterns", label: "Found inside hundreds of rules" },
              { number: "Sole designer", label: "Embedded in engineering team" },
            ]}
          />
        </section>

        {/* 2. The Situation */}
        <SectionLabel first>The Situation</SectionLabel>
        <SectionHeading>Launching a new insurance product took two years.</SectionHeading>
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
          more complicated a rule, the longer it took to code correctly with
          all the edge cases. Miscommunication between a business requirement
          and its code implementation meant potential underwriting errors,
          which in insurance is a serious risk.
        </BodyP>
        <PullQuote quote="Product launches moved at the speed of the ticket queue, not the speed of business decisions." />
        <BodyP>
          Haven Technology&apos;s leadership wanted to sell more insurance
          products faster. The existing workflow was the bottleneck.
        </BodyP>

        {/* 3. The Diagnosis */}
        <SectionLabel>The Diagnosis</SectionLabel>
        <SectionHeading>Hundreds of unique rules. Three structural patterns.</SectionHeading>
        <BodyP>
          The obvious framing was &quot;business users can&apos;t self-serve, so
          build them a form builder.&quot; But the problem was deeper than
          access.
        </BodyP>
        <BodyP>
          I started by mapping the full underwriting org to understand who knew
          what and who was blocked from acting on what they knew. Then I
          audited the existing codebase and the business users&apos; own
          artifacts: their annotated application questions, their spreadsheets
          mapping rules to conditions, and the handwritten notes they used to
          track underwriting logic. Engineers were building each rule as a
          custom implementation with bespoke logic. Hundreds of rules, each
          coded as if it were unique.
        </BodyP>
        <ImageBlock
          label="Before: How business users tracked underwriting rules"
          src={getImage("rules-before-artifacts", "/images/rules-before-artifacts.png")}
          caption="Business users maintained detailed spreadsheets mapping application questions to underwriting logic. They annotated conditions, lookback periods, and edge cases by hand. They knew the rules cold but had no way to implement them without filing tickets to engineering."
        />
        <BodyP>
          But they weren&apos;t unique. When I looked at the underlying
          structure rather than the surface-level variety, nearly every rule
          was a variation on one of three patterns:
        </BodyP>
        <CoreInsightCallout label="Core insight">
          Hundreds of rules → <span className="text-[#C74B6F]">3 patterns</span>
        </CoreInsightCallout>
        <ThreePatternsCard
          items={[
            {
              title: "Standard rules",
              description:
                "Simple condition → outcome. \"If armed forces = yes, decline.\"",
            },
            {
              title: "Lookback rules",
              description:
                "Condition + time window. \"If diagnosed with X within the last Y years, flag.\"",
            },
            {
              title: "Aggregation rules",
              description:
                "Rules that operate on the outputs of other rules. \"If 3+ risk factors are flagged, escalate.\"",
            },
          ]}
        />
        <BodyP>
          This was the key diagnostic insight: the business didn&apos;t need a
          general-purpose rule builder. They needed constrained interfaces
          designed around these three structural patterns. Constrained was the
          point. A form that knows it&apos;s building a Lookback rule can guide
          the user, validate inputs, and prevent errors in ways a generic
          builder can&apos;t.
        </BodyP>

        {/* 4. The Intervention */}
        <SectionLabel>The Intervention</SectionLabel>
        <SectionHeading>Constraint over flexibility.</SectionHeading>
        <BodyP>
          The engineering team&apos;s instinct was to build a general-purpose
          rule builder that could model anything. I argued for the opposite:
          three specific rule-creation interfaces, each tailored to one
          structural pattern.
        </BodyP>
        <ReframeCard
          label="Design philosophy"
          beforeLabel="Before"
          beforeText="A general-purpose rule builder that can model anything"
          afterLabel="After"
          afterText="Three constrained interfaces, each designed for one structural pattern"
        />
        <BodyP>
          Each interface constrained what users could input in ways that matched
          how the underlying logic actually worked. A Standard rule form
          offered condition/outcome pairs with dropdowns for valid data types
          and operators. A Lookback rule form added a time window selector
          that enforced valid lookback periods. Aggregation rules got a
          different interface entirely, letting users select which existing
          rules to aggregate and define thresholds.
        </BodyP>
        <TwoImageRow
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
          This covered roughly 80% of underwriting rules. For the remaining
          edge cases with logic too complex for the constrained forms, I
          designed Freestyle mode: a structured frontend that let engineers
          configure rules faster without dropping back into raw code. This was
          a deliberate scoping decision. Rather than trying to make the
          business-facing UI handle every possible case, I drew a clear line:
          constrained interfaces for the patterns that repeated, and a faster
          engineering tool for the exceptions.
        </BodyP>
        <ImageBlock
          label="Freestyle mode: engineering's fast path for edge cases"
          src={getImage("rules-freestyle-before", "/images/rules-freestyle-before.png")}
          caption="For the ~15-20% of rules too complex for the constrained forms, Freestyle mode gave engineers a structured frontend. Faster than raw code, without compromising the simplicity of the business-facing interfaces."
        />
        <BodyP>
          The design went through five or six major iterations, each tested
          against real underwriting rules from Haven Simple. Early versions
          explored basic if-then toggles, which broke down as soon as rules
          got conditional on time windows or on the outputs of other rules.
          That&apos;s what forced the structural-pattern approach.
          Surface-level simplification wasn&apos;t enough. The tool needed to
          understand the types of rules it was helping users build.
        </BodyP>

        {/* 6. Image: Workflow view */}
        <ImageBlock
          label="Rule dependencies made visible"
          src={getImage("rules-workflow", "/images/rules-workflow.png")}
          caption="The Workflow view made rule dependencies visible for the first time. Business users could see how rules connected and executed in sequence, rather than treating each one as isolated."
        />

        {/* 7. What Changed */}
        <SectionLabel>What Changed</SectionLabel>
        <SectionHeading>Business users could configure rules directly.</SectionHeading>
        <ReframeCard
          label="Rule creation"
          beforeLabel="Before"
          beforeText="Write requirement → file ticket → engineer codes it → QA → deploy"
          afterLabel="After"
          afterText="Configure directly in the tool in a single session"
        />
        <BodyP>
          Business users could configure the majority of underwriting rules
          directly, without filing tickets or waiting for engineering cycles.
          Engineers kept a faster path for edge cases through Freestyle mode,
          but were no longer the bottleneck for routine rule changes. The
          dependency between rules became visible through the Workflow view,
          so users could understand how rules interacted rather than treating
          each one as isolated.
        </BodyP>

        {/* 8. The Outcome */}
        <SectionLabel>The Outcome</SectionLabel>
        <SectionHeading>Haven Simple: 90 days instead of two years.</SectionHeading>
        <BigStatCallout
          number="2 years → 90 days"
          label="Product configuration time for Haven Simple"
        />
        <BodyP>
          Haven Simple was configured through the Rules Manager in approximately
          90 days, compared to the roughly two-year timeline previous products
          had required. Business users adopted the tool for rule
          configuration, and engineering tickets for routine rule changes
          dropped significantly.
        </BodyP>
        <BodyP>
          The company dissolved before the tool reached full commercial rollout
          across multiple products. But the system worked: validated against a
          real product, used by actual business stakeholders, and demonstrated
          that the structural-pattern approach could handle real-world
          underwriting complexity.
        </BodyP>

        {/* 9. My Role */}
        <SectionLabel>My Role</SectionLabel>
        <SectionHeading>Sole designer. Codebase auditor. System architect.</SectionHeading>
        <BodyP>
          I was the sole designer embedded in an engineering team. I personally
          audited the codebase and the business users&apos; own artifacts to
          identify the three rule patterns, which was the diagnostic move that
          shaped the entire product direction. I designed every iteration of
          the rule configuration UI, tested against real underwriting rules,
          and made the scoping decision to split between constrained business
          interfaces and Freestyle engineering mode.
        </BodyP>
        <BodyP>
          The call I owned: choosing constraint over flexibility. The engineering
          team&apos;s instinct was to build a general-purpose rule builder. I
          argued that understanding the domain well enough to constrain the tool
          was the higher-leverage move, and the 90-day Haven Simple
          configuration validated that bet.
        </BodyP>

        {/* 10. The Pattern */}
        <PatternBox label="The Pattern">
          When I looked at hundreds of seemingly unique rules, I found three
          structural patterns. This is a move I make consistently: instead of
          designing for the surface-level variety of a problem, I look for the
          structural patterns underneath and design constrained systems around
          those patterns. The instinct in tool design is to build for maximum
          flexibility. But flexibility without structure just moves the
          complexity from one place to another. Domain constraint beats
          general-purpose flexibility when the problem space has hidden
          structure. The capability I bring is seeing that structure before the
          team builds the wrong abstraction.
        </PatternBox>

        <BackLink />
      </main>
    </div>
  );
}
