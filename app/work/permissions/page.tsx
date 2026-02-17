import { getImage } from "../../../lib/images";
import {
  BackLink,
  CoreInsightCallout,
  ImageBlock,
  PatternBox,
  PullQuote,
  ReframeCard,
  SectionHeading,
  SectionLabel,
  StatsRow,
  TwoImageRow,
  TwoSystemCard,
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
            meetings hadn&apos;t fixed it. I interrogated the assumptions
            underneath the permissions model, found they didn&apos;t hold, and
            designed a two-part system that resolved the #1 client complaint and
            unblocked the next phase of the platform.
          </p>

          <StatsRow
            stats={[
              { number: "#1", label: "Client complaint resolved" },
              { number: "1 sprint", label: "From workshop to first iterations" },
              { number: "Still scaling", label: "Team extended system post-handoff" },
            ]}
          />
        </section>

        {/* 2. Image: The Permissions Spreadsheet */}
        <ImageBlock
          label="Before: The permissions spreadsheet"
          src={getImage("permissions-spreadsheet", "/images/permissions-spreadsheet.png")}
          caption="The team's attempt to enumerate every role-permission combination. Each new user type added another column. Each new feature added another row. The matrix grew faster than the team could maintain it."
        />

        {/* 3. The Situation */}
        <SectionLabel first>The Situation</SectionLabel>
        <SectionHeading compact>The team couldn&apos;t agree on who should see what. MVP 2 was blocked.</SectionHeading>
        <BodyP>
          WCG was consolidating three legacy IRB review systems into one
          platform, eReview Manager. That meant reconciling three different
          permission models, each with its own logic for who could see what,
          when.
        </BodyP>
        <BodyP>
          The business responded by building a massive spreadsheet: 10+ distinct
          roles for external users alone, each with a unique permission set
          mapped to job titles. Nobody could confidently grant access to
          external users because the model was too complex to reason about. The
          team defaulted to being overly restrictive.
        </BodyP>
        <PullQuote
          quote="We are not clear on the problem to solve."
          source="Team sticky note from planning session"
        />
        <BodyP>
          External users (investigators, sponsors, site coordinators) were
          regularly locked out of submission documents they needed to track
          their own work. In user research, the number one complaint from
          clients was that they couldn&apos;t access their submissions after
          submitting and had no visibility into approval timelines.
        </BodyP>
        <BodyP>
          Multiple meetings produced no forward movement. The permissioning
          work was blocking MVP 2 development, and the team couldn&apos;t even
          agree on scope.
        </BodyP>

        {/* 4. The Diagnosis */}
        <SectionLabel>The Diagnosis</SectionLabel>
        <SectionHeading compact>The spreadsheet wasn&apos;t the problem. The assumption behind it was.</SectionHeading>
        <BodyP>
          The PM had built the spreadsheet in good faith. The data is
          sensitive (clinical trial submissions, investigator records,
          regulatory documents) so the instinct was to lock it down by role.
          The team inherited that assumption and kept adding columns.
        </BodyP>
        <BodyP>
          Nobody had asked the harder question: what actually needs
          protecting, from whom, and why?
        </BodyP>
        <BodyP>
          When I asked it, the complexity started collapsing. Internal users
          were already compliance-trained. The system didn&apos;t need to
          restrict their access; it needed to trust it. Two edge cases aside
          (managers needing visibility into their team&apos;s work, admins
          needing to configure document types), all internal users could see
          everything. The entire matrix of internal roles was solving a
          problem that didn&apos;t exist.
        </BodyP>
        <BodyP>
          External users were different (but not in the way the spreadsheet
          assumed). The real constraint wasn&apos;t role type; it was scope.
          No external user should have blanket system access. But access to a
          specific study or site? That decision belongs with the person doing
          the inviting, at the moment of invitation (not pre-defined in an
          admin panel).
        </BodyP>
        <ReframeCard
          label="The reframe"
          beforeLabel="Before"
          beforeText="What role does each job title map to?"
          afterLabel="After"
          afterText="What actually needs protecting, from whom, and why?"
        />
        <CoreInsightCallout label="Core insight" textSize="20px">
          The complexity was defensive design built on an unexamined threat model.
        </CoreInsightCallout>

        {/* 5. The Intervention */}
        <SectionLabel>The Intervention</SectionLabel>
        <SectionHeading compact>One pre-work audit. One workshop. Two systems.</SectionHeading>
        <BodyP>
          Before the workshop, I audited the spreadsheet not to clean it up but
          to interrogate it (asking what each role was actually protecting
          against, and whether that threat was real). That pre-work let me walk
          into the workshop already knowing the structure needed to change, not
          just be simplified.
        </BodyP>
        <BodyP>
          The workshop reframed the question from &quot;what permissions does
          each role need?&quot; to &quot;what are the building blocks that let
          us compose any access pattern we need?&quot; That shift produced
          team alignment in a single session (not because the answer was
          obvious, but because the right question made it visible).
        </BodyP>
        <ImageBlock
          label="The reframe in action"
          src={getImage("workshop-goal-reframe", "/images/workshop-goal-reframe.png")}
          caption="The original workshop goal (crossed out) vs. the reframed goal. One question changed the conversation from enumerating answers to designing a system."
        />
        <ImageBlock
          label="Workshop: mapping the real system"
          src={getImage("figjam-workshop", "/images/figjam-workshop.png")}
          caption="Real-time decisions from the session: 'Internal user = universal role,' 'NEVER differed study to study,' 'less about limiting access, more about not overwhelming users.'"
        />
        <BodyP>
          From there I designed two complementary systems rather than one,
          because internal and external users had fundamentally different
          access needs.
        </BodyP>
        <TwoSystemCard
          items={[
            {
              title: "For internal users",
              description:
                "A capability matrix in the admin panel. Roles are composed by combining a finite set of capabilities with a finite set of access levels. Any role (current or future) is just a specific combination. New role types don't require new spreadsheet columns.",
            },
            {
              title: "For external users",
              description:
                "A contextual invite flow where access is scoped to a specific study or site at the moment of invitation, by the person who knows what that collaborator needs. No blanket access, no pre-defined role matrix to maintain.",
            },
          ]}
        />
        <BodyP>
          I also designed a Request Access pathway for users who encounter a
          study they need but weren&apos;t invited to. Rather than hitting a
          dead end, they get a direct route to request access from the study
          team (preventing unauthorized access without creating friction for
          legitimate users).
        </BodyP>
        <BodyP>
          A deliberate scoping call: I designed the first version to cover the
          core capability set rather than every edge case. The architecture
          needed to be right; exhaustiveness could come later.
        </BodyP>

        {/* 6. What Changed */}
        <SectionLabel>What Changed</SectionLabel>
        <SectionHeading compact>The spreadsheet became two systems.</SectionHeading>
        <ReframeCard
          label="Role creation"
          beforeLabel="Before"
          beforeText="Convene a meeting, update the spreadsheet, file tickets for engineering"
          afterLabel="After"
          afterText="Check the boxes in the admin panel, or assign at the moment of invitation"
        />
        <BodyP>
          The sprawling spreadsheet was replaced by two interfaces working
          together: an admin panel where internal roles are composed from
          capabilities, and an invite flow where external access is scoped
          contextually at study or site level. The business manages both
          without routing changes through design or development.
        </BodyP>
        <TwoImageRow
          left={{
            label: "After: New User Role (external, Study level)",
            src: getImage("permissions-external-role", "/images/permissions-external-role.png"),
            caption:
              "External user roles are defined with a level (Study or Site) built in. Capabilities render based on that scope.",
          }}
          right={{
            label: "After: Invite Team Member to Site",
            src: getImage("permissions-invite-site", "/images/permissions-invite-site.png"),
            caption:
              "Access is assigned at the moment of invitation. The inviter selects email and site role (no admin ticket required).",
          }}
        />
        <TwoImageRow
          left={{
            label: "After: Edit User Role (internal)",
            src: getImage("permissions-internal-role", "/images/permissions-internal-role.png"),
            caption:
              "Internal roles are composed by selecting capability-access level combinations. New roles require no new architecture.",
          }}
          right={{
            label: "After: Study Team view",
            src: getImage("permissions-study-team", "/images/permissions-study-team.png"),
            caption:
              "Every team member's access is visible, scoped, and auditable at a glance.",
          }}
        />

        {/* 7. The Outcome */}
        <SectionLabel>The Outcome</SectionLabel>
        <SectionHeading compact>It shipped. Then the team extended it without me.</SectionHeading>
        <BodyP>
          The permissions redesign unblocked MVP 2 development. The team
          moved into first iterations within one sprint of the workshop.
        </BodyP>
        <BodyP>
          After I stepped back, the team added more granular permissions (like
          config editing) within the architecture I designed. The fact that it
          held up to extension without structural changes is the strongest
          evidence that the underlying model was sound.
        </BodyP>
        <BodyP>
          The #1 client complaint (no access to their own submissions) was
          resolved. External users could now be invited into specific studies
          and sites with appropriate scoped access. Users who needed access to
          existing studies had a clear pathway to request it rather than
          hitting a dead end.
        </BodyP>

        {/* 8. My Role */}
        <SectionLabel>My Role</SectionLabel>
        <SectionHeading compact>End-to-end: from interrogating the premise to shipping the system.</SectionHeading>
        <BodyP>
          I led this initiative end-to-end: auditing the existing spreadsheet
          to identify the false assumption at its foundation, facilitating the
          workshop that reframed the team&apos;s approach, and designing both
          the admin interface and the external invite flow through multiple
          iterations. I worked closely with Arijit (design vision) and Jimin
          (UI and design systems).
        </BodyP>
        <BodyP>
          The call I personally made: refusing to optimize the existing
          spreadsheet and instead pushing the team to interrogate what it was
          protecting against. That meant the workshop couldn&apos;t be a
          &quot;let&apos;s clean up our roles&quot; session (it had to start
          with the harder question of whether the threat model was real).
        </BodyP>

        {/* 9. The Pattern */}
        <PatternBox label="The Pattern">
          Enterprise platforms inevitably reach a permissions inflection
          point as they grow. The instinct is to enumerate: map every role to
          every permission, add columns for every new user type. This works
          until the matrix grows faster than the team can maintain it. The
          intervention here wasn&apos;t a better spreadsheet (it was
          interrogating whether the threat model behind the spreadsheet was
          real). Once the assumption collapsed, the architecture simplified.
          Not all permissions problems look the same: internal access and
          external access are different problems and need different
          mechanisms. Designing two focused systems, each right for its
          context, beats designing one flexible system that handles nothing
          well.
        </PatternBox>

        <BackLink />
      </main>
    </div>
  );
}
