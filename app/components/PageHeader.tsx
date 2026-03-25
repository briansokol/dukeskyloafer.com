import { GlowLine } from "./GlowLine";

interface PageHeaderLink {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  link?: PageHeaderLink;
  accentColor?: "cyan" | "purple";
}

export function PageHeader({ title, subtitle, link, accentColor = "cyan" }: PageHeaderProps) {
  const colorClass = accentColor === "cyan" ? "text-accent-cyan" : "text-accent-purple";
  const hasSubContent = subtitle || link;

  return (
    <div style={{ animation: "fade-in-up 0.5s ease-out" }}>
      <h2 className={`text-3xl md:text-5xl mb-6 drop-shadow-[0_0_5px_rgb(0,0,0)] ${colorClass}`}>
        {title}
      </h2>
      <GlowLine />
      {hasSubContent && (
        <div className="relative mt-3 flex items-center justify-between gap-4">
          <div
            className="absolute -z-1 w-[150%] h-[500%] rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0) 70%)",
            }}
          />
          {subtitle && <p className="text-base text-text-secondary">{subtitle}</p>}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-accent-cyan hover:text-accent-purple transition-colors shrink-0"
            >
              {link.label}
              <svg
                className="inline-block w-4 h-4 ml-1 -translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
