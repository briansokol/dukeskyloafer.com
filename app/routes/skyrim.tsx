import type { Route } from "./+types/skyrim";
import type { ModListMod } from "~/types/skyrim";
import { Card } from "../components/Card";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { MOD_LIST } from "../data/skyrim-mods";

interface ModSection {
  label: string;
  mods: ModListMod[];
}

const SECTIONS: ModSection[] = MOD_LIST.map((section) => {
  const first = section[0];
  return {
    label: first?.type === "header" ? first.label : "",
    mods: section.filter((entry): entry is ModListMod => entry.type === "mod"),
  };
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Skyrim | Duke Skyloafer" },
    { name: "description", content: "Lonely Wolf Skyrim Mod List." },
  ];
}

export default function Skyrim() {
  return (
    <PageContainer>
      <PageHeader
        title="Lonely Wolf Skyrim AE Mod List"
        subtitle="In honor of Skyrim's 15th anniversary, I'm doing a new playthrough with a heavily modded version of Anniversary Edition (v1.6.1170). This is not an exhaustive mod list. It contains the major mods, and generally omits patches. Apologies if something isn't in the category you think it belongs in. It made sense to me at the time."
        link={{
          label: "YouTube Playlist",
          href: "https://www.youtube.com/playlist?list=PLACEHOLDER",
        }}
      />

      <div className="mt-8 flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <Card key={`${section.label}-${section.mods[0]?.name}`} className="p-6">
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-heading text-lg text-text-primary">
                <svg
                  className="w-4 h-4 text-text-secondary transition-transform group-open:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {section.label}
                <span className="text-sm text-text-secondary">({section.mods.length})</span>
              </summary>
              <ul className="mt-4 sm:columns-2 gap-8">
                {section.mods.map((mod) => (
                  <li key={mod.name} className="text-sm py-0.5 break-inside-avoid">
                    {mod.url ? (
                      <a
                        href={mod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline"
                      >
                        {mod.name}
                      </a>
                    ) : (
                      <span className="text-text-secondary">{mod.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
