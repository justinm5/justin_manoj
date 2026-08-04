import { experienceCards } from "@/data/experience";

const yearFromPeriod = (period: string) => {
  const match = period.match(/\d{4}/);
  return match ? match[0] : "";
};

const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="mt-[0.2em] h-[0.7em] w-[0.7em] shrink-0 text-[#52525b] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  >
    <path
      d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ExperiencePanel = () => (
  <div className="space-y-7">
    {experienceCards.map((item) => {
      const href = item.domain ? `https://${item.domain}` : undefined;
      const title = `${item.role} at ${item.company}`;

      return (
        <div key={`${item.company}-${item.period}`} className="group flex gap-4 sm:gap-8">
          <div className="w-16 shrink-0 pt-0.5 text-sm tabular-nums text-[#52525b] sm:w-28">
            {yearFromPeriod(item.period)}
          </div>
          <div className="min-w-0 flex-1">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1 underline-offset-4 hover:underline font-medium text-foreground"
              >
                <span>{title}</span>
                <ArrowIcon />
              </a>
            ) : (
              <span className="font-medium text-foreground">{title}</span>
            )}
            <p className="mt-0.5 text-sm text-[#a1a1aa]">{item.location}</p>
            <p className="mt-1.5 hidden text-sm leading-relaxed text-[#a1a1aa] group-hover:block">
              {item.summary}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
