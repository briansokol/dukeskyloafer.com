import type { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  const colClass =
    columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return <div className={`mt-8 grid ${colClass} gap-6 ${className ?? ""}`}>{children}</div>;
}
