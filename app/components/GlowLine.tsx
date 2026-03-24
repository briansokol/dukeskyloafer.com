export function GlowLine() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-accent-cyan), var(--color-accent-purple), transparent)",
        boxShadow: "0 0 8px var(--color-accent-cyan), 0 0 8px var(--color-accent-purple)",
      }}
    />
  );
}
