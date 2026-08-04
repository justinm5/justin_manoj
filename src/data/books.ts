export type BookStatus = "reading" | "finished" | "queued";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  note?: string;
};

export const books: Book[] = [
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    note: "Replication, partitioning, and the tradeoffs behind every distributed system.",
  },
  {
    id: "the-almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    status: "finished",
    note: "Leverage, specific knowledge, and playing long-term games.",
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    status: "finished",
    note: "Where intuition quietly fails and why models beat gut feel.",
  },
  {
    id: "the-man-who-solved-the-market",
    title: "The Man Who Solved the Market",
    author: "Gregory Zuckerman",
    status: "queued",
    note: "Renaissance Technologies and the case for signal over story.",
  },
];

export const bookStatusLabel: Record<BookStatus, string> = {
  reading: "Now reading",
  finished: "Finished",
  queued: "Up next",
};
