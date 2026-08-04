import { SiteLayout } from "@/components/SiteLayout";
import { books } from "@/data/context";

const Books = () => (
  <SiteLayout>
    <div className="projects-serial">
      <h1 className="pc-signature">cool books to read!</h1>
      <ul className="books-grid">
        {books.map((book) => (
          <li key={book.title} className="book-card">
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  </SiteLayout>
);

export default Books;
