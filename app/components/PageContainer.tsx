import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <main className={`max-w-5xl mx-auto px-6 py-12 ${className ?? ""}`}>{children}</main>;
}
