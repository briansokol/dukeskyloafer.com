import type { Route } from "./+types/home";
import { GlowLine } from "../components/GlowLine";
import { LaserGrid } from "../components/LaserGrid";
import { QuickLinkCard } from "../components/QuickLinkCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Duke Skyloafer" },
    { name: "description", content: "Gamer, streamer, and programmer." },
  ];
}

function YouTubeIcon() {
  return (
    <svg className="w-10 h-10 mx-auto text-accent-cyan" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      className="w-10 h-10 mx-auto text-accent-cyan"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 4-6 8 6 8M16 4l6 8-6 8" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      className="w-10 h-10 mx-auto text-accent-cyan"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17h6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zM12 17v4"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <LaserGrid />

        <div className="relative z-10 text-center px-6 drop-shadow-[0_0_5px_rgb(0,0,0)]">
          <img
            src="/logo-large.png"
            alt="Duke Skyloafer logo"
            className="w-48 h-48 mx-auto mb-8"
            style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
          />
          <h1 className="text-5xl md:text-7xl mb-4 text-text-primary">Duke Skyloafer</h1>
          <GlowLine />
          <p
            className="mt-6 text-lg md:text-xl text-accent-cyan font-heading inline-block overflow-hidden whitespace-nowrap border-r-2 border-accent-cyan"
            style={{
              animation:
                "reveal-text 2s steps(40) 0.5s forwards, blink-caret 0.75s step-end infinite",
              maxWidth: "0",
            }}
          >
            Gamer. Streamer. Programmer.
          </p>
          <div className="relative mt-6">
            <div
              className="absolute inset-0 -z-1 w-200 h-100 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0) 70%)",
              }}
            />
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Hey, I'm Brian. I stream games like Space Engineers on YouTube as Duke Skyloafer, and
              I publish open source projects on GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLinkCard
            to="/youtube"
            icon={<YouTubeIcon />}
            title="YouTube"
            description="Live streams, gameplay videos, and tech content."
          />
          <QuickLinkCard
            to="/projects"
            icon={<CodeIcon />}
            title="Projects"
            description="Open source work and personal projects on GitHub."
          />
          <QuickLinkCard
            to="/specs"
            icon={<MonitorIcon />}
            title="Specs"
            description="The hardware and software powering the stream."
          />
        </div>
      </section>
    </main>
  );
}
