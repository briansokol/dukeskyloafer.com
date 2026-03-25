import { NavLink } from "react-router";

const tabs = [
  { to: "/youtube", label: "Videos", end: true },
  { to: "/youtube/playlists", label: "Playlists", end: false },
];

export function YouTubeTabs() {
  return (
    <div className="flex gap-6 mb-8">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `font-heading text-sm uppercase tracking-widest pb-2 border-b-2 transition-colors ${
              isActive
                ? "text-accent-cyan border-accent-cyan"
                : "text-text-secondary border-transparent hover:text-text-primary"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
