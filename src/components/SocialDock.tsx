import type { ComponentType } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const SpotifyIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm4.327 15.264a.665.665 0 0 1-.914.218c-2.505-1.531-5.655-1.88-9.359-1.037a.664.664 0 0 1-.294-1.295c4.052-.924 7.534-.53 10.347 1.191a.664.664 0 0 1 .22.923zm1.306-2.906a.832.832 0 0 1-1.143.274c-2.868-1.757-7.238-2.266-10.633-1.235a.831.831 0 1 1-.483-1.591c3.873-1.175 8.693-.61 11.985 1.409a.831.831 0 0 1 .274 1.143zm.112-3.026c-3.437-2.041-9.111-2.228-12.392-1.233a.997.997 0 1 1-.579-1.908c3.766-1.14 10.028-.919 13.99 1.433a.997.997 0 0 1-1.019 1.708z" />
  </svg>
);

const XIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.901 2.25h3.681l-8.042 9.19 9.461 12.31h-7.405L10.797 16.3 4.28 23.75H.596l8.602-9.834L0 2.25h7.593l5.243 6.924L18.901 2.25zm-1.292 19.31h2.04L6.482 4.327H4.292L17.609 21.56z" />
  </svg>
);

const socialLinks: { label: string; href: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Email", href: "mailto:justinmmanoj@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/justinmmanoj", icon: Linkedin },
  { label: "Spotify", href: "https://open.spotify.com/user/31ujvm27vmo3m4r2xpz2lrmflnxq?si=40e7e5e5a29b4467", icon: SpotifyIcon },
  { label: "GitHub", href: "https://github.com/justinm5", icon: Github },
  { label: "X", href: "https://x.com/", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/j_manoj01", icon: Instagram },
];

export const SocialDock = () => (
  <nav className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
    {socialLinks.map((social) => {
      const Icon = social.icon;
      const isEmailLink = social.href.startsWith("mailto:");
      return (
        <a
          key={social.label}
          href={social.href}
          target={isEmailLink ? undefined : "_blank"}
          rel={isEmailLink ? undefined : "noopener noreferrer"}
          aria-label={social.label}
          className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#18181b]/80 backdrop-blur-md transition-colors hover:bg-white/10 sm:h-10 sm:w-10"
        >
          <Icon className="h-[18px] w-[18px] text-foreground/80 transition-colors group-hover:text-foreground sm:h-[20px] sm:w-[20px]" />
          <span className="pointer-events-none absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100 md:block">
            {social.label}
          </span>
        </a>
      );
    })}
  </nav>
);
