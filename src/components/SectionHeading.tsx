interface SectionHeadingProps {
  index: string;
  title: string;
  meta?: string;
}

export const SectionHeading = ({ index, title, meta }: SectionHeadingProps) => (
  <div className="mb-6 flex items-baseline gap-3">
    <span className="text-[11px] font-tabular-itf tabular-nums tracking-[0.18em] text-foreground/30">
      {index}
    </span>
    <h2 className="text-xs font-tabular-itf uppercase tracking-[0.18em] text-foreground/60">
      {title}
    </h2>
    <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
    {meta && (
      <span className="text-[11px] font-tabular-itf uppercase tracking-[0.12em] text-foreground/30">
        {meta}
      </span>
    )}
  </div>
);
