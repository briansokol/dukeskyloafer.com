import type { Route } from "./+types/home";
import { GlowLine } from "../components/GlowLine";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Duke Skyloafer" },
    { name: "description", content: "Gamer, streamer, and open source enthusiast." },
  ];
}

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center">
      <img
        src="/logo.png"
        alt="Duke Skyloafer logo"
        className="w-40 h-40 mx-auto mb-8 rounded-lg"
        style={{
          boxShadow:
            "0 0 20px var(--color-accent-cyan), 0 0 40px var(--color-accent-purple)",
        }}
      />
      <h1 className="text-4xl mb-4 text-text-primary">Duke Skyloafer</h1>
      <GlowLine />
      <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
        {/* User will fill in their own about text */}
        Gamer, streamer, and open source enthusiast. Follow along on YouTube for
        live streams and videos, or check out my projects on GitHub.
      </p>
    </main>
  );
}
