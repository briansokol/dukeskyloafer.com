import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { GlowLine } from "./GlowLine";

const links = [
  { to: "/", label: "Home" },
  { to: "/youtube", label: "YouTube" },
  { to: "/projects", label: "Projects" },
  { to: "/specs", label: "Specs" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="w-6 h-6 text-text-secondary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-heading font-bold tracking-wide"
        >
          <img src="/logo-small.png" alt="" className="h-8 w-8" />
          Duke Skyloafer
        </NavLink>
        <ul className="hidden sm:flex gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest transition-colors ${
                    isActive ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="sm:hidden p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>
      {menuOpen && (
        <ul className="sm:hidden px-6 pb-4 flex flex-col gap-3 border-t border-text-secondary/20">
          {links.map((link) => (
            <li key={link.to} className={link === links[0] ? "pt-4" : ""}>
              <NavLink
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.to
                    ? "text-accent-cyan"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <GlowLine />
    </nav>
  );
}
