import { GlowLine } from "./GlowLine";

interface PageHeaderProps {
  title: string;
  accentColor?: "cyan" | "purple";
}

export function PageHeader({ title, accentColor = "cyan" }: PageHeaderProps) {
  const colorClass = accentColor === "cyan" ? "text-accent-cyan" : "text-accent-purple";

  return (
    <div style={{ animation: "fade-in-up 0.5s ease-out" }}>
      <h2 className={`text-3xl md:text-5xl mb-6 drop-shadow-[0_0_5px_rgb(0,0,0)] ${colorClass}`}>
        {title}
      </h2>
      <GlowLine />
    </div>
  );
}
