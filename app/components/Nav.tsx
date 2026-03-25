import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { GlowLine } from "./GlowLine";

const DISCORD_URL = "https://discord.gg/BAxAPFcTwB";

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

function DiscordIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

function DiscordModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg-card border border-text-secondary/20 rounded-lg p-6 pt-8 max-w-sm mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-heading font-bold mb-3">Join Discord</h2>
        <p className="text-text-secondary mb-6">
          The <b>Aegir & Engineered Coffee</b> Discord is a friendly community primarily focused on
          Space Engineers. Would you like to join?
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-accent-cyan text-bg-dark font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
          >
            Yes, join
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md border border-text-secondary/30 text-text-secondary text-sm uppercase tracking-widest transition-colors hover:text-text-primary hover:border-text-primary/30"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-heading font-bold tracking-wide"
          >
            <img src="/logo-small.png" alt="" className="h-8 w-8" />
            Duke Skyloafer
          </NavLink>
          <div className="hidden sm:flex items-center gap-6">
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
            <button
              onClick={() => setShowDiscordModal(true)}
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Join Discord"
            >
              <DiscordIcon />
            </button>
          </div>
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
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowDiscordModal(true);
                }}
                className="text-sm uppercase tracking-widest transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
              >
                Discord
              </button>
            </li>
          </ul>
        )}
        <GlowLine />
      </nav>
      {showDiscordModal && <DiscordModal onClose={() => setShowDiscordModal(false)} />}
    </>
  );
}
