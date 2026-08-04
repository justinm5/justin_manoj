const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Navigation = () => (
  <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 sm:pt-5">
    <nav className="pointer-events-auto flex max-w-[92vw] flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-[#18181b]/80 px-2 py-1.5 backdrop-blur-md">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="rounded-full px-3 py-1 text-sm font-medium text-[#a1a1aa] transition-colors hover:bg-white/5 hover:text-foreground"
        >
          {section.label}
        </a>
      ))}
    </nav>
  </header>
);
