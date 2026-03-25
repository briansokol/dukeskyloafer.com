import { Link } from "react-router";
import type { ReactNode } from "react";
import { Card } from "./Card";

interface QuickLinkCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export function QuickLinkCard({ to, icon, title, description }: QuickLinkCardProps) {
  return (
    <Link to={to} className="block">
      <Card className="p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="font-heading text-lg text-text-primary mb-2">{title}</h2>
        <p className="text-sm text-text-secondary">{description}</p>
      </Card>
    </Link>
  );
}
