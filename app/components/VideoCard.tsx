interface VideoCardProps {
  videoId: string;
  title: string;
  thumbnail: string;
  subtitle: string;
}

export function VideoCard({ videoId, title, thumbnail, subtitle }: VideoCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-bg-card rounded-lg overflow-hidden transition-shadow hover:shadow-[0_0_15px_var(--color-accent-cyan)]"
    >
      <img src={thumbnail} alt={title} className="w-full aspect-video object-cover" />
      <div className="p-4">
        <h3 className="font-heading text-sm text-text-primary line-clamp-2">{title}</h3>
        <p className="text-xs text-text-secondary mt-1">{subtitle}</p>
      </div>
    </a>
  );
}
