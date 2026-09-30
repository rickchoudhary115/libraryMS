
import {
  useEffect,
  useState
} from "react";

import {
  BookOpen,
  ClipboardList,
  RefreshCw,
  Library,
  AlertCircle
} from "lucide-react";

import IssueTable
  from "../components/issues/IssueTable.jsx";

import api
  from "../utils/axios.js";

export default function Issues() {
  const [issues, setIssues] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } =
        await api.get("/issues");

      setIssues(data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load your issued books."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const activeIssues = issues.filter(
    (issue) =>
      issue.status === "issued"
  );

  const returnedIssues = issues.filter(
    (issue) =>
      issue.status === "returned"
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Library size={16} />
                My Library
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                My Issued Books
              </h1>

              <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">
                Track the books you've borrowed,
                due dates and your return history.
              </p>

            </div>

            <button
              type="button"
              onClick={loadIssues}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 disabled:opacity-60 sm:self-auto"
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

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            <AlertCircle
              size={19}
              className="shrink-0"
            />

            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Records
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {issues.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ClipboardList size={22} />
              </div>

            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Currently Issued
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {activeIssues.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BookOpen size={22} />
              </div>

            </div>
          </div>

          {/* Returned */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Returned
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-700">
                  {returnedIssues.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Library size={22} />
              </div>

            </div>
          </div>

        </div>

        {/* Issue Table */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Borrowing History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your complete book issue history.
              </p>
            </div>

          </div>

          <div className="p-4 sm:p-6">

            {loading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3">

                <RefreshCw
                  size={30}
                  className="animate-spin text-indigo-600"
                />

                <p className="text-sm text-slate-500">
                  Loading your issues...
                </p>

              </div>
            ) : issues.length === 0 ? (

              <div className="flex min-h-64 flex-col items-center justify-center text-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <BookOpen
                    size={30}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  No issued books
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  You haven't issued any books yet.
                  Visit the book catalog to explore
                  available books.
                </p>

              </div>

            ) : (
              <IssueTable
                issues={issues}
              />
            )}

          </div>

        </section>

      </section>
    </main>
  );
}

