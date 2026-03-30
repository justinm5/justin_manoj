import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const name = "Justin Manoj";
const entrancePhoto = "/entrance-stack-1.jpg";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/justinm5" },
  { label: "X", href: "https://x.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/justinmmanoj" },
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
        <div className="grid items-stretch gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative w-full h-full min-h-[420px] overflow-hidden border border-white/15 bg-background shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:min-h-[620px]">
            <img
              src={entrancePhoto}
              alt="Justin Manoj"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex h-full flex-col justify-center gap-2.5 border-l border-white/10 pl-8">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground/90 sm:text-6xl">
              {typedName}
              <span className="ml-1 inline-block w-[1px] animate-pulse bg-foreground/70 align-baseline">
                &nbsp;
              </span>
            </h1>

            <div className="mt-1 space-y-1 text-[18px] leading-relaxed text-foreground/72">
              <p>CS &amp; Math @ UMass Amherst</p>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-[16px] text-foreground/70">
              {socialLinks.map((link, index) => (
                <div key={link.label} className="inline-flex items-center gap-2">
                  {"href" in link ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="transition-colors hover:text-foreground/90"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} className="transition-colors hover:text-foreground/90">
                      {link.label}
                    </Link>
                  )}
                  {index < socialLinks.length - 1 ? <span className="text-foreground/45">·</span> : null}
                </div>
              ))}
            </div>

            <p className="mt-2 text-[14px] uppercase tracking-[0.12em] text-foreground/52">
              ✻︎ New York, NY
            </p>

            <div className="mt-2 w-full rounded-2xl border border-white/18 bg-white/[0.04] px-5 py-4">
              <p className="text-[12px] font-tabular-itf uppercase tracking-[0.18em] text-foreground/55">
                Facts
              </p>
              <div className="mt-2 space-y-1 text-[15px] text-foreground/80">
                <p>🎓 Expected Graduation: May 2027</p>
                <p>📍 Born in: New York, NY</p>
                <p>🇮🇳 Nationality: Indian</p>
                <p>✈️ Favorite place visited: Dubai</p>
                <p>🌮 Favorite food: Birria tacos</p>
                <p>💼 Incoming SWE at Dell Technologies and IBM!</p>
                <p>🧠 Currently exploring: cloud, distributed systems, backend infra</p>
                <p>📧 Contact: justinmmanoj [at] gmail [dot] com</p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/home"
                className="inline-flex rounded-lg items-center bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 self-end"
              >
                Enter My Page
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Entrance;
