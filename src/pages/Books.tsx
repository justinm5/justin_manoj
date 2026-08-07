import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { BookCover } from "@/components/BookCover";
import { books } from "@/data/context";

const ALL = "all";

const Books = () => {
  const tags = useMemo(
    () => [ALL, ...[...new Set(books.map((book) => book.tag))].sort()],
    [],
  );
  const [activeTag, setActiveTag] = useState(ALL);

  const visible =
    activeTag === ALL ? books : books.filter((book) => book.tag === activeTag);

  return (
    <SiteLayout title="Books">
      <div className="projects-serial">
        <h1 className="pc-signature">Cool Books to Read!</h1>
        <p className="books-lede">
          A Few Books I've Read and Enjoyed Recently.
        </p>

        <div className="books-filter" role="group" aria-label="Filter books by topic">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="books-filter-chip"
              aria-pressed={tag === activeTag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul className="books-grid">
          {visible.map((book) => (
            <li key={book.title} className="book-card">
              <BookCover title={book.title} author={book.author} />
              <div className="book-body">
                <span className="book-title">{book.title}</span>
                <span className="book-author">{book.author}</span>
                <p className="book-note">{book.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
};

export default Books;
