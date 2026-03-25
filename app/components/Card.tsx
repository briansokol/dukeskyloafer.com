import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-bg-card rounded-lg border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/30 hover:shadow-[0_0_20px_var(--color-accent-purple),0_0_40px_var(--color-accent-purple)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
