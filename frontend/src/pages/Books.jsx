import { useEffect, useState } from "react";

import BookCard from "../components/books/BookCard.jsx";

import api from "../utils/axios.js";

export default function Books() {
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");

  const loadBooks = async () => {
    try {
      const { data } = await api.get(
        `/books?search=${encodeURIComponent(search)}`,
      );

      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <main className="container">
      <div className="page-head">
        <h1>Book Catalog</h1>

        <div className="search">
          <input
            placeholder="Search title, author or ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={loadBooks}>Search</button>
        </div>
      </div>

      <div className="grid">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </main>
  );
}
