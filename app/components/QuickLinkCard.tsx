import { Link } from "react-router";
import type { ReactNode } from "react";

interface QuickLinkCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export function QuickLinkCard({ to, icon, title, description }: QuickLinkCardProps) {
  return (
    <Link
      to={to}
      className="block bg-bg-card rounded-lg p-6 text-center border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/30 hover:shadow-[0_0_20px_var(--color-accent-purple),0_0_40px_var(--color-accent-purple)]"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="font-heading text-lg text-text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-secondary">{description}</p>
    </Link>
  );
}
