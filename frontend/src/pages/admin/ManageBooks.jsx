import { useEffect, useState } from "react";

import BookForm from "../../components/books/BookForm.jsx";

import api from "../../utils/axios.js";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const loadBooks = async () => {
    const { data } = await api.get("/books");

    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const saveBook = async (data) => {
    try {
      if (editing) {
        await api.put(`/books/${editing._id}`, data);
      } else {
        await api.post("/books", data);
      }

      setEditing(null);

      setShowForm(false);

      loadBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const deleteBook = async (id) => {
    const confirmed = window.confirm("Delete this book?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/books/${id}`);

      loadBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <main className="container">
      <div className="page-head">
        <h1>Manage Books</h1>

        <button
          onClick={() => {
            setEditing(null);

            setShowForm(true);
          }}
        >
          + Add Book
        </button>
      </div>

      {showForm && (
        <BookForm
          initial={editing}
          onSubmit={saveBook}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>

              <th>Author</th>

              <th>Category</th>

              <th>Copies</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.category}</td>

                <td>
                  {book.availableCopies}/{book.totalCopies}
                </td>

                <td>
                  <button
                    className="small"
                    onClick={() => {
                      setEditing(book);

                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="small danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
