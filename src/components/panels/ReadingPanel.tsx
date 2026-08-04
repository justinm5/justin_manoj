import { bookStatusLabel, type BookStatus } from "@/data/books";
import { useGoodreadsBooks } from "@/hooks/use-goodreads";
import { cn } from "@/lib/utils";

const statusDotClass: Record<BookStatus, string> = {
  reading: "bg-emerald-400/80",
  finished: "bg-foreground/35",
  queued: "bg-amber-400/70",
};

export const ReadingPanel = () => {
  const { books } = useGoodreadsBooks();

  return (
    <div className="divide-y divide-white/10">
      {books.map((book) => (
        <div key={book.id} className="cursor-target group flex items-start gap-3 py-3 first:pt-0">
          <span
            className={cn(
              "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full",
              statusDotClass[book.status],
            )}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="text-[15px] font-semibold leading-tight text-foreground/88 transition-colors group-hover:text-accent">
                {book.title}
              </p>
              <p className="text-[11px] font-tabular-itf uppercase tracking-[0.12em] text-foreground/45">
                {bookStatusLabel[book.status]}
              </p>
            </div>
            <p className="mt-0.5 text-[13px] text-foreground/62">{book.author}</p>
            {book.note && (
              <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/60">{book.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
