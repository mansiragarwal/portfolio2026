import { getImage } from "../../../lib/images";
import {
  BackLink,
  ComposabilityDemoGrid,
  EmphasisLine,
  EvidenceNudge,
  ImageBlock,
  PatternBox,
  ReframeCard,
  SectionHeading,
  SectionLabel,
  StatsRow,
  UnifiedInsightCard,
} from "../components";
import { Nav } from "../../components/Nav";

function BodyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-[1.75] text-[#6B6360]" style={{ marginBottom: "16px" }}>
      {children}
    </p>
  );
}

export default function PermissionsPage() {
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
              Systems Design
            </span>
            <span className="text-[13px] text-[#A09893]">
              WCG · eReview Manager
            </span>
          </div>
          <h1
            className="mb-4 text-[42px] font-medium leading-[1.2] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ marginBottom: "16px" }}
          >
            From Spreadsheet to System
          </h1>
          <p
            className="mb-8 text-[18px] leading-[1.6] text-[#6B6360]"
            style={{ marginBottom: "32px" }}
          >
            Clients couldn&apos;t access their own submissions. Months of
            meetings hadn&apos;t fixed it. I reframed the permissions model from
            a static spreadsheet to a composable system, eliminating the #1
            client complaint and unblocking the next phase of the platform.
          </p>

          <StatsRow
            stats={[
              { number: "#1", label: "Client complaint resolved" },
              { number: "1 sprint", label: "From workshop to first iterations" },
              { number: "Still scaling", label: "Team extended system post-handoff" },
            ]}
          />
        </section>

        {/* 2. Image: Permissions Spreadsheet */}
        <ImageBlock
          label="Before: The permissions spreadsheet"
          src={getImage("permissions-spreadsheet", "/images/permissions-spreadsheet.png")}
          caption="The team's attempt to enumerate every role-permission combination. Each new user type added another column. Each new feature added another row. The matrix grew faster than the team could maintain it."
        />

        {/* 3. The Situation */}
        <SectionLabel first>The Situation</SectionLabel>
        <SectionHeading>The team couldn&apos;t agree on who should see what. MVP 2 was blocked.</SectionHeading>
        <BodyP>
          WCG was consolidating three legacy IRB review systems (Connexus, IRIS,
          and IBC) into one platform, eReview Manager. That meant reconciling
          three different permission models, each with its own logic for who
          could see what, when.
        </BodyP>
        <BodyP>
          The business responded by building a massive spreadsheet: 10+ distinct
          roles for external users alone, each with a unique permission set
          mapped to job titles. Nobody could confidently grant access to external
          users because the model was too complex to reason about. The team
          defaulted to being overly restrictive.
        </BodyP>
        <BodyP>
          External users (investigators, sponsors, site coordinators) were
          regularly locked out of submission documents they needed to track their
          own work. In user research, the number one complaint from clients was
          that they couldn&apos;t access their submissions after submitting and
          had no visibility into approval timelines.
        </BodyP>
        <BodyP>
          Multiple meetings produced no forward movement. The permissioning work
          was blocking MVP 2 development, and the team couldn&apos;t even agree
          on scope.
        </BodyP>

        {/* 4. The Diagnosis */}
        <SectionLabel>The Diagnosis</SectionLabel>
        <SectionHeading>Everyone was solving the wrong problem.</SectionHeading>
        <EvidenceNudge
          quote="We are not clear on the problem to solve."
          source="Team sticky note from planning session"
        />
        <BodyP>
          The team assumed the problem was figuring out the right permissions for
          each role. Multiple meetings, a massive spreadsheet, and still no
          forward movement.
        </BodyP>
        <EmphasisLine>
          But the real issue wasn&apos;t the answers. It was the question.
        </EmphasisLine>
        <BodyP>
          They were trying to enumerate a combinatorial space that was growing
          faster than they could map it. Every new user type added a column.
          Every new feature added a row. Even if they finished the matrix today,
          it would be outdated tomorrow.
        </BodyP>
        <UnifiedInsightCard
          label="The Reframe"
          beforeLabel="Before"
          beforeText="What can each role do?"
          afterLabel="After"
          afterText="What building blocks let us compose any role we need?"
          coreInsightLabel="Core insight"
          coreInsightText={
            <>
              Static enumeration →{" "}
              <span className="text-[#C74B6F]">dynamic composition</span>
            </>
          }
        />
        <BodyP>
          They didn&apos;t need a better list of permissions per role. They
          needed a system that could compose any permission set from a small
          number of building blocks.
        </BodyP>
        <ComposabilityDemoGrid
          label="The building blocks"
          rows={[
            { label: "Study details", read: true, write: false, del: false },
            { label: "Site details", read: true, write: true, del: false },
            { label: "Submissions", read: true, write: true, del: true },
            { label: "User management", read: false, write: false, del: false },
          ]}
          caption="A finite set of capabilities crossed with a finite set of actions. Any role — current or future — is just a specific combination of checked boxes. No new spreadsheet columns needed."
        />

        {/* 5. The Intervention */}
        <SectionLabel>The Intervention</SectionLabel>
        <SectionHeading>One workshop that reframed the entire approach.</SectionHeading>
        <BodyP>
          I facilitated a workshop where I explicitly reframed the goal.
          Instead of asking &quot;what permissions does a Site Coordinator
          need?&quot; I asked &quot;what are the atomic capabilities in this
          system, and how do they combine?&quot;
        </BodyP>
        <BodyP>
          This shifted the team from static enumeration to dynamic composition.
          The workshop produced a shared understanding that the old approach was
          structurally broken, not just incomplete.
        </BodyP>
        <BodyP>
          From there, I designed the permissions architecture: a matrix of
          capabilities × actions. The design went through multiple
          iterations, from simple checkmarks to colored dots to radio buttons,
          ultimately landing on a compact matrix view that stakeholders
          validated through direct testing.
        </BodyP>
        <ImageBlock
          label="The reframe in action"
          src={getImage("workshop-goal-reframe", "/images/workshop-goal-reframe.png")}
          caption="The original workshop goal (crossed out) vs. the reframed goal. One word changed the question from 'enumerate the answers' to 'design the system.' This single shift unblocked months of paralysis."
        />
        <ImageBlock
          label="Workshop: mapping the real system"
          src={getImage("figjam-workshop", "/images/figjam-workshop.png")}
          caption="The workshop produced a shared map of how roles, permissions, and access levels actually related to each other. Real-time decisions captured in stickies: 'Internal user = universal role,' 'NEVER differed by study to study,' 'less about limiting access, more about not overwhelming users.'"
        />
        <BodyP>
          A key decision: I deliberately scoped the first version to cover the
          core capability set rather than trying to model every edge case. This
          meant the system shipped faster and the team could extend it later.
        </BodyP>

        {/* 6. What Changed */}
        <SectionLabel>What Changed</SectionLabel>
        <SectionHeading>The spreadsheet became a system.</SectionHeading>
        <ReframeCard
          label="Role creation"
          beforeLabel="Before"
          beforeText="Convene a meeting, update the spreadsheet, file tickets for engineering"
          afterLabel="After"
          afterText="Check the boxes in the admin panel"
        />
        <BodyP>
          The sprawling spreadsheet was replaced by an admin interface where
          roles are composed from capabilities. The system could accommodate new
          user types without redesigning the permission model. The business
          manages roles through the admin UI rather than routing every change
          through design and development.
        </BodyP>
        <ImageBlock
          label="After: The composable permissions system"
          src={getImage("user-roles-matrix", "/images/user-roles-matrix.png")}
          caption="The shipped admin interface. Roles are composed by checking capability-action combinations. The '+ Add User Role' button means new roles don't require design or engineering. Tabs (Study Roles, Site Roles, Internal Roles) show the system scales across all user types."
        />

        {/* 7. The Outcome */}
        <SectionLabel>The Outcome</SectionLabel>
        <SectionHeading>It shipped. Then the team extended it without me.</SectionHeading>
        <BodyP>
          The permissions redesign unblocked MVP 2 development. The team moved
          into first iterations within one sprint of the workshop.
        </BodyP>
        <BodyP>
          After I stepped back, the team added more granular permissions (like
          config editing) within the architecture I designed. That extensibility
          was the point: if the team can evolve the system without its original
          designer, the architecture is doing its job.
        </BodyP>

        {/* 8. My Role */}
        <SectionLabel>My Role</SectionLabel>
        <SectionHeading>Workshop facilitator. Systems thinker. Scope-setter.</SectionHeading>
        <BodyP>
          I personally facilitated the workshop that reframed the team&apos;s
          approach. I designed every iteration of the permissions matrix UI and
          made the scoping call to ship a focused first version rather than
          trying to model every edge case upfront.
        </BodyP>
        <BodyP>
          The dynamic I navigated: the team had spent months in meetings trying
          to enumerate permissions without making progress. I redirected that
          energy by changing the question, which made forward movement possible
          in a single session.
        </BodyP>

        {/* 9. The Pattern */}
        <PatternBox label="The Pattern">
          The instinct is to enumerate: map every role to every permission.
          This works until it doesn&apos;t. The intervention here wasn&apos;t a
          better spreadsheet. It was recognizing that the team needed to move
          from static enumeration to dynamic composition, from pre-computing
          every answer to building a system that could generate the right
          answer for any new context.
        </PatternBox>

        <BackLink />
      </main>
    </div>
  );
}
