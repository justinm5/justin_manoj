import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const name = "Justin Manoj";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/justinmmanoj" },
  { label: "GitHub", href: "https://github.com/justinm5" },
  { label: "Email", href: "mailto:justinmmanoj@gmail.com" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/31ujvm27vmo3m4r2xpz2lrmflnxq?si=40e7e5e5a29b4467",
  },
];

const Entrance = () => {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (typedCount >= name.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTypedCount((value) => value + 1);
    }, 85);

    return () => window.clearTimeout(timer);
  }, [typedCount]);

  const typedName = useMemo(() => name.slice(0, typedCount), [typedCount]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pt-24 pb-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-2.5 text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground/90 sm:text-6xl">
              {typedName}
              <span className="ml-1 inline-block w-[1px] animate-pulse bg-foreground/70 align-baseline">
                &nbsp;
              </span>
            </h1>

            <div className="mt-1 space-y-1 text-[18px] leading-relaxed text-foreground/72">
              <p>CS &amp; Math @ UMass Amherst</p>
            </div>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-[16px] text-foreground/70">
              {socialLinks.map((link, index) => (
                <div key={link.label} className="inline-flex items-center gap-2">
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                  {index < socialLinks.length - 1 ? <span className="text-foreground/45">·</span> : null}
                </div>
              ))}
            </div>

            <p className="mt-2 text-[14px] uppercase tracking-[0.12em] text-foreground/52">
              ✻︎ New York, NY
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/home"
                className="inline-flex rounded-lg items-center bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                Enter My Page
              </Link>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Entrance;
