import { NavLink } from "react-router";
import { GlowLine } from "./GlowLine";

const links = [
  { to: "/", label: "Home" },
  { to: "/youtube", label: "YouTube" },
  { to: "/projects", label: "Projects" },
];

export function Nav() {
  return (
    <nav>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-heading font-bold tracking-wide">
          Duke Skyloafer
        </NavLink>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-accent-cyan"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <GlowLine />
    </nav>
  );
}
