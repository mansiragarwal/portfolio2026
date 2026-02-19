import Link from "next/link";
import { Nav } from "../../components/Nav";

export default function FlappyBirdExperimentPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Nav />

      <main className="mx-auto max-w-[720px] px-6 pb-20 pt-[72px]">
        <Link
          href="/experiments"
          className="mb-8 inline-block text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          ← Back to experiments
        </Link>

        <span className="mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-medium text-[#6B6360] bg-[#F3EFEB]">
          React Native · Expo
        </span>
        <h1 className="mb-4 text-[38px] font-medium tracking-[-0.03em] text-[#1A1A1A]">
          Flappy Bird
        </h1>
        <p className="mb-10 text-[18px] leading-[1.6] text-[#6B6360]">
          A mobile-first Flappy Bird clone. Tap to keep the bird airborne while navigating through randomly-generated pipe gaps.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">Tech stack</h2>
            <p className="text-[15px] leading-[1.75] text-[#6B6360]">
              React Native (Expo SDK 51), react-native-game-engine, @shopify/react-native-skia, expo-av, AsyncStorage, XState v5, expo-screen-orientation, expo-keep-awake. Custom physics (no third-party physics engine).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">Features</h2>
            <ul className="list-inside list-disc space-y-2 text-[15px] leading-[1.75] text-[#6B6360]">
              <li>Physics simulation (gravity, velocity, rotation)</li>
              <li>Real-time score and high score persistence</li>
              <li>Difficulty progression (pipe speed and gap size)</li>
              <li>Pause/resume and app lifecycle handling</li>
              <li>Audio/visual effects and asset loading with error recovery</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#A09893]">Run locally</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-[#6B6360]">
              The game lives in this repo under <code className="rounded bg-[#F3EFEB] px-1.5 py-0.5 text-[13px] text-[#1A1A1A]">experiments/FlappyBird</code>. From the project root:
            </p>
            <pre className="overflow-x-auto rounded-[10px] border border-[#EAE4DE] bg-[#FFFFFF] p-5 text-[13px] leading-[1.6] text-[#1A1A1A]" style={{ fontFamily: "ui-monospace, monospace" }}>
{`cd experiments/FlappyBird
npx expo start`}
            </pre>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#6B6360]">
              Open in Expo Go on your device or use an iOS/Android simulator.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
