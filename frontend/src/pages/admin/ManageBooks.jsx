
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
  X,
} from "lucide-react";

import BookForm from "../../components/books/BookForm.jsx";
import api from "../../utils/axios.js";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================================
  // LOAD BOOKS
  // =====================================================

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } =
        await api.get("/books");

      setBooks(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load books:",
        error
      );

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


  // =====================================================
  // ADD FORM
  // =====================================================

  const openAddForm = () => {
    setEditing(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };


  // =====================================================
  // EDIT FORM
  // =====================================================

  const openEditForm = (book) => {
    setEditing(book);
    setShowForm(true);
    setError("");
    setSuccess("");
  };


  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    setEditing(null);
    setShowForm(false);
  };


  // =====================================================
  // SAVE BOOK
  // =====================================================

  const saveBook = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // =================================================
      // EDIT BOOK
      // =================================================

      if (editing) {
        const { data } =
          await api.put(
            `/books/${editing._id}`,
            formData
          );

        /*
         * Backend may return either:
         *
         * 1. updated book directly
         * 2. { book: updatedBook }
         */

        const updatedBook =
          data?.book || data;

        /*
         * Immediately replace the old book
         * inside the current UI.
         */

        setBooks((previousBooks) =>
          previousBooks.map((book) =>
            book._id === editing._id
              ? {
                  ...book,
                  ...updatedBook,
                }
              : book
          )
        );

        setSuccess(
          `"${formData.title}" updated successfully.`
        );
      }

      // =================================================
      // ADD BOOK
      // =================================================

      else {
        const { data } =
          await api.post(
            "/books",
            formData
          );

        /*
         * Backend may return either:
         *
         * 1. created book directly
         * 2. { book: createdBook }
         */

        const newBook =
          data?.book || data;

        /*
         * Immediately add the new book
         * to the beginning of the table.
         */

        if (newBook?._id) {
          setBooks((previousBooks) => [
            newBook,
            ...previousBooks,
          ]);
        } else {
          /*
           * If backend does not return
           * the created book, reload from DB.
           */
          await loadBooks();
        }

        setSuccess(
          `"${formData.title}" added successfully.`
        );
      }

      // =================================================
      // CLOSE FORM
      // =================================================

      setEditing(null);
      setShowForm(false);

      /*
       * Final synchronization with MongoDB.
       * This guarantees the UI matches the database.
       */
      await loadBooks();

    } catch (error) {
      console.error(
        "Book save failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save book."
      );
    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // DELETE BOOK
  // =====================================================

  const deleteBook = async (id) => {
    const book =
      books.find(
        (item) => item._id === id
      );

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${book?.title || "this book"}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await api.delete(
        `/books/${id}`
      );

      /*
       * Immediately remove it from UI.
       */

      setBooks((previousBooks) =>
        previousBooks.filter(
          (book) =>
            book._id !== id
        )
      );

      setSuccess(
        `"${book?.title || "Book"}" deleted successfully.`
      );

    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Delete failed."
      );

    } finally {
      setDeletingId(null);
    }
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

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
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

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


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle
              size={19}
              className="shrink-0"
            />

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto rounded-lg p-1 hover:bg-red-100"
            >
              <X size={16} />
            </button>

          </div>
        )}


        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

            <CheckCircle2
              size={19}
              className="shrink-0"
            />

            <span>
              {success}
            </span>

            <button
              type="button"
              onClick={() =>
                setSuccess("")
              }
              className="ml-auto rounded-lg p-1 hover:bg-emerald-100"
            >
              <X size={16} />
            </button>

          </div>
        )}


        {/* =================================================
            FORM
        ================================================= */}

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
                disabled={saving}
                className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
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

              {saving && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-indigo-50 py-3 text-sm font-semibold text-indigo-700">

                  <RefreshCw
                    size={16}
                    className="animate-spin"
                  />

                  {editing
                    ? "Updating book..."
                    : "Adding book..."}

                </div>
              )}

            </div>

          </div>
        )}


        {/* =================================================
            BOOK TABLE
        ================================================= */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Table header */}

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

              {books.length}

              {" "}

              {books.length === 1
                ? "Book"
                : "Books"}

            </div>

          </div>


          {/* Loading */}

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

            /* =================================================
               EMPTY
            ================================================= */

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

            /* =================================================
               TABLE
            ================================================= */

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

                    const percentage =
                      total > 0
                        ? Math.min(
                            (available /
                              total) *
                              100,
                            100
                          )
                        : 0;

                    const isDeleting =
                      deletingId ===
                      book._id;

                    return (

                      <tr
                        key={book._id}
                        className="transition hover:bg-slate-50/70"
                      >

                        {/* =====================================
                            BOOK
                        ===================================== */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                              <BookOpen
                                size={20}
                              />

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


                        {/* =====================================
                            AUTHOR
                        ===================================== */}

                        <td className="px-6 py-5">

                          <span className="text-sm font-medium text-slate-700">
                            {book.author}
                          </span>

                        </td>


                        {/* =====================================
                            CATEGORY
                        ===================================== */}

                        <td className="px-6 py-5">

                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {book.category ||
                              "General"}
                          </span>

                        </td>


                        {/* =====================================
                            AVAILABILITY
                        ===================================== */}

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
                                  width: `${percentage}%`,
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


                        {/* =====================================
                            ACTIONS
                        ===================================== */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(
                                  book
                                )
                              }
                              disabled={
                                saving ||
                                deletingId !==
                                  null
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                              <Pencil
                                size={15}
                              />

                              Edit

                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                deleteBook(
                                  book._id
                                )
                              }
                              disabled={
                                isDeleting ||
                                saving
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                              {isDeleting ? (
                                <RefreshCw
                                  size={15}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2
                                  size={15}
                                />
                              )}

                              {isDeleting
                                ? "Deleting..."
                                : "Delete"}

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

