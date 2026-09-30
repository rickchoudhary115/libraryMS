
import { useEffect, useState } from "react";

import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Library,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";

import BookForm
  from "../../components/books/BookForm.jsx";

import api from "../../utils/axios.js";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/books");

      setBooks(data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load books."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const openAddForm = () => {
    setEditing(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEditForm = (book) => {
    setEditing(book);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  const saveBook = async (data) => {
    try {
      setError("");
      setSuccess("");

      if (editing) {
        await api.put(
          `/books/${editing._id}`,
          data
        );

        setSuccess(
          "Book updated successfully."
        );
      } else {
        await api.post(
          "/books",
          data
        );

        setSuccess(
          "Book added successfully."
        );
      }

      setEditing(null);
      setShowForm(false);

      await loadBooks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Operation failed."
      );
    }
  };

  const deleteBook = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/books/${id}`
      );

      setSuccess(
        "Book deleted successfully."
      );

      await loadBooks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Delete failed."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
              <Library size={16} />
              Admin Panel
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Manage Books
            </h1>

            <p className="mt-2 text-slate-500">
              Add, edit and manage your library collection.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={loadBooks}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Book
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle
              size={19}
              className="shrink-0"
            />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto rounded-lg p-1 hover:bg-red-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2
              size={19}
              className="shrink-0"
            />

            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto rounded-lg p-1 hover:bg-emerald-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  {editing ? (
                    <Pencil size={21} />
                  ) : (
                    <BookOpen size={21} />
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    {editing
                      ? "Edit Book"
                      : "Add New Book"}
                  </h2>

                  <p className="text-sm text-slate-300">
                    {editing
                      ? "Update the book information."
                      : "Add a new book to your library."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <BookForm
                initial={editing}
                onSubmit={saveBook}
                onCancel={closeForm}
              />
            </div>
          </div>
        )}

        {/* Books Table */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Library Collection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage all books in your library.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
              <BookOpen size={16} />
              {books.length}{" "}
              {books.length === 1
                ? "Book"
                : "Books"}
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw
                  size={30}
                  className="animate-spin text-indigo-600"
                />

                <p className="text-sm text-slate-500">
                  Loading books...
                </p>
              </div>
            </div>
          ) : books.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <BookOpen
                  size={30}
                  className="text-slate-400"
                />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No books found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Your library doesn't have any books yet.
                Add your first book to get started.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={17} />
                Add First Book
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Book
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Author
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Availability
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {books.map((book) => {
                    const available =
                      book.availableCopies ??
                      book.available ??
                      0;

                    const total =
                      book.totalCopies ?? 0;

                    const isAvailable =
                      available > 0;

                    return (
                      <tr
                        key={book._id}
                        className="transition hover:bg-slate-50/70"
                      >

                        {/* Book */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                              <BookOpen size={20} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {book.title}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                ISBN: {book.ISBN}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Author */}
                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-slate-700">
                            {book.author}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {book.category || "General"}
                          </span>
                        </td>

                        {/* Availability */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  isAvailable
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width:
                                    total > 0
                                      ? `${Math.min(
                                          (available /
                                            total) *
                                            100,
                                          100
                                        )}%`
                                      : "0%"
                                }}
                              />
                            </div>

                            <span
                              className={`text-sm font-semibold ${
                                isAvailable
                                  ? "text-emerald-600"
                                  : "text-red-600"
                              }`}
                            >
                              {available}/{total}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {isAvailable
                              ? "Available"
                              : "Out of stock"}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(book)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <Pencil size={15} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteBook(book._id)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

