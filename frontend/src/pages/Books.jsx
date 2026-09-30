
import {
  useEffect,
  useState
} from "react";

import {
  Search,
  BookOpen,
  Library,
  RefreshCw,
  Sparkles,
  X
} from "lucide-react";

import BookCard
  from "../components/books/BookCard.jsx";

import api
  from "../utils/axios.js";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadBooks = async (
    searchValue = search
  ) => {
    try {
      setLoading(true);
      setError("");

      const { data } =
        await api.get(
          `/books?search=${encodeURIComponent(
            searchValue
          )}`
        );

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
    loadBooks("");
  }, []);

  const handleSearch = () => {
    loadBooks(search);
  };

  const clearSearch = () => {
    setSearch("");
    loadBooks("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">

        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
              <Library size={16} />
              Digital Library
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Your
              <span className="block text-indigo-400">
                Book Collection
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Discover books, explore authors and find
              exactly what you're looking for in your
              library.
            </p>

            {/* Search */}
            <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search title, author or ISBN..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-11 text-sm text-white outline-none backdrop-blur transition placeholder:text-slate-500 focus:border-indigo-400 focus:bg-white/15 focus:ring-4 focus:ring-indigo-500/20"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}

              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={18} />
                Search
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen size={21} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Book Catalog
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  {loading
                    ? "Finding books..."
                    : `${books.length} ${
                        books.length === 1
                          ? "book"
                          : "books"
                      } found`}
                </p>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={() => loadBooks(search)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({
              length: 8
            }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-40 animate-pulse bg-slate-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}

          </div>
        ) : books.length === 0 ? (

          /* Empty */
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              {search ? (
                <Search size={30} />
              ) : (
                <BookOpen size={30} />
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {search
                ? "No books found"
                : "No books available"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {search
                ? `We couldn't find any books matching "${search}". Try another title, author or ISBN.`
                : "There are currently no books in the library catalog."}
            </p>

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <X size={16} />
                Clear Search
              </button>
            )}

          </div>

        ) : (

          /* Books */
          <>
            {search && (
              <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
                <Sparkles
                  size={16}
                  className="text-indigo-500"
                />

                Search results for
                <span className="font-semibold text-slate-900">
                  "{search}"
                </span>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                />
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
}

