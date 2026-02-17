import { getImage } from "../../lib/images";
import { Nav } from "../components/Nav";

const paragraphs = [
  "I'm a product designer based in New York City. I studied Computer Science and Human-Computer Interaction at Carnegie Mellon.",
  "My strength is diagnosis. I'm often brought in when something isn't working but nobody can articulate why. I step back, find the binding constraint, and reframe the problem so progress becomes possible. Sometimes that means surfacing hidden assumptions. Sometimes it means recognizing the real issue isn't the interface, it's the system behind it.",
  "I care about how products behave over time, how they fit into existing workflows, and how they earn trust. I operate at every altitude: edge cases with engineers, strategy with leadership, and advocacy for users who aren't in the room.",
  "Outside of work, I stay grounded through climbing, yoga, and long walks with podcasts. I journal, go to therapy, and believe mental health tools should feel gentle and accessible, not clinical.",
  "Fashion is where I explore self-expression. I'm drawn to sustainable, size-inclusive pieces and have an ongoing love-hate relationship with translating Pinterest energy into outfits that actually fit. Thrifting, reworking pieces, and slowly building a wardrobe that feels like home bring me a lot of joy.",
  "I care about community and connection but I equally value solitude. Both are necessary for me to feel balanced. At my core, I'm curious, observant, and adventurous. Always learning, always tinkering, always open to what's next.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[900px] px-12">
        <h1
          className="text-[28px] text-[#C74B6F] md:text-[38px]"
          style={{
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            marginTop: "60px",
            marginBottom: "32px",
          }}
        >
          About Me
        </h1>

        <section className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="shrink-0 md:max-w-[280px]">
            <img
              src={getImage("about", "/images/about.jpg")}
              alt="Mansi Agarwal"
              width={280}
              height={360}
              className="object-cover"
              style={{ maxWidth: "280px" }}
            />
          </div>
          <div className="min-w-0 flex-1">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-[15px] text-[#1A1A1A]"
                style={{ lineHeight: 1.75, marginBottom: "24px" }}
              >
                {text}
              </p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
