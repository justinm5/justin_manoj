import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { SoundToggle } from "@/components/SoundToggle";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";
import { displayName, footerSocials, socials } from "@/data/context";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/books", label: "Books" },
  { to: "/ask", label: "Ask" },
];

const icons: Record<string, ReactNode> = {
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  resume: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  spotify: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.365-2.13-10.542-1.17-.399.08-.78-.18-.859-.539-.08-.399.18-.78.54-.859 4.56-1.061 8.52-.6 11.76 1.38.36.18.48.66.24 1.02zm1.44-3.3c-.301.48-.841.6-1.261.3-3.239-1.98-8.159-2.56-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.72-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.019.599-1.559.3z" />
    </svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.214-6.817L4.424 21.75H1.117l7.73-8.835L1.215 2.25H7.98l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm8.965-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  ),
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

const Footer = () => (
  <footer className="site-footer" aria-label="Now playing, social links, and copyright">
    <div className="site-footer-left">
      <SpotifyLastPlayed />
    </div>
    <div className="site-footer-right">
      <div className="site-footer-icons">
        {footerSocials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="site-footer-icon"
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons[social.icon]}
          </a>
        ))}
      </div>
      <p className="site-footer-copy">
        © {new Date().getFullYear()} {displayName}
      </p>
    </div>
  </footer>
);

interface SiteLayoutProps {
  children: ReactNode;
  bodyClass?: string;
  contentClassName?: string;
  /** Page name for the browser tab. Falls back to just the site name. */
  title?: string;
}

export const SiteLayout = ({
  children,
  bodyClass,
  contentClassName,
  title,
}: SiteLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} · ${displayName}` : displayName;
  }, [title]);

  // A client-side route change does not reset scroll on its own.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  // Escape is the expected way out of an open drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!bodyClass) return;
    document.body.classList.add(bodyClass);
    return () => document.body.classList.remove(bodyClass);
  }, [bodyClass]);

  return (
    <>
      <div className="site-controls" role="group" aria-label="Site controls">
        <SoundToggle />
        <ThemeToggle />
      </div>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-sidebar"
        aria-label="Open navigation menu"
        onClick={() => setMenuOpen(true)}
      >
        <span aria-hidden="true">☰</span>
      </button>

      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="home-grid">
        <aside className="home-sidebar" id="site-sidebar" aria-label="Site">
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <nav className="home-sidebar-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="home-sidebar-rule" role="presentation" />

          <ul className="home-sidebar-social">
            {socials.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="home-social-link"
                    target={external || social.icon === "resume" ? "_blank" : undefined}
                    rel={
                      external || social.icon === "resume"
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <span className="home-social-icon" aria-hidden="true">
                      {icons[social.icon]}
                    </span>
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="home-main">
          <main className={`home-content${contentClassName ? ` ${contentClassName}` : ""}`}>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SiteLayout;
