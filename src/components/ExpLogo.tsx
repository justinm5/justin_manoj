import { useState } from "react";
import { logoDevUrl } from "@/lib/logos";

interface ExpLogoProps {
  logo?: string;
  domain?: string;
  company: string;
  size?: number;
  className?: string;
}

export const ExpLogo = ({
  logo,
  domain,
  company,
  size = 64,
  className,
}: ExpLogoProps) => {
  const sources = [logo, domain ? logoDevUrl(domain, size) : null].filter(
    (source): source is string => Boolean(source),
  );

  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  return (
    <div
      className={`home-exp-logo${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {src ? (
        <img
          className="home-exp-logo-img"
          src={src}
          alt={`${company} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setSourceIndex((index) => index + 1)}
        />
      ) : (
        <span className="home-exp-logo-fallback">{company.slice(0, 1)}</span>
      )}
    </div>
  );
};

export default ExpLogo;
