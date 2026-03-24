import type { Route } from "./+types/projects";
import { cachedFetch } from "../lib/cache.server";
import { fetchPinnedRepos } from "../lib/github.server";
import { GlowLine } from "../components/GlowLine";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Duke Skyloafer" },
    { name: "description", content: "Duke Skyloafer's open source projects." },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;

  const repos = await cachedFetch(env.CACHE, "gh:pinned", 3600, () =>
    fetchPinnedRepos(env.GITHUB_TOKEN, env.GITHUB_USERNAME)
  );

  return { repos };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { repos } = loaderData;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl mb-6 text-accent-cyan">Projects</h2>
      <GlowLine />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-bg-card rounded-lg p-6 transition-shadow hover:shadow-[0_0_15px_var(--color-accent-cyan)]"
          >
            <h3 className="font-heading text-lg text-text-primary">{repo.name}</h3>
            {repo.description && (
              <p className="text-sm text-text-secondary mt-2">{repo.description}</p>
            )}
            <div className="flex items-center gap-4 mt-4 text-xs text-text-secondary">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: repo.languageColor ?? "#666" }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && <span>★ {repo.stars}</span>}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
