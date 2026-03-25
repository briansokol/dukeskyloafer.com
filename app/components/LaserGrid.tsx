export function LaserGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 201, 203, 0.08) 0%, rgba(134, 0, 255, 0.04) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
