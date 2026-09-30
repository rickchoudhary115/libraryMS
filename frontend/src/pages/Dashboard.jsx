
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  Bookmark,
  Clock3,
  ArrowRight,
  Search,
  Library,
  Sparkles,
  CheckCircle2,
  CalendarDays,
  RefreshCw,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

import api from "../utils/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async (refresh = false) => {
    try {
      setError("");

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data } = await api.get("/dashboard");

      setDashboard(data);
    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /*
   * Keep the dashboard flexible with the existing
   * backend response.
   */
  const stats = useMemo(() => {
    const data = dashboard || {};

    return {
      books:
        data.totalBooks ??
        data.booksCount ??
        data.books ??
        0,

      issued:
        data.activeIssues ??
        data.issuedBooks ??
        data.totalIssued ??
        data.issued ??
        0,

      pending:
        data.pendingRequests ??
        data.pendingIssues ??
        data.requests ??
        0,

      returned:
        data.returnedBooks ??
        data.returnedIssues ??
        data.totalReturned ??
        data.returned ??
        0,
    };
  }, [dashboard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="h-72 animate-pulse rounded-[2rem] bg-slate-200" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="h-72 animate-pulse rounded-3xl bg-white lg:col-span-2" />
            <div className="h-72 animate-pulse rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        {/* Background glow */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">

            {/* Hero text */}

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-indigo-200 backdrop-blur">
                <Sparkles size={14} />
                YOUR DIGITAL LIBRARY
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Welcome back,
                <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {user?.name || "Reader"}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover books, track your issues and
                manage your personal library journey
                from one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/books"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-slate-950
                    shadow-lg
                    shadow-black/20
                    transition
                    hover:-translate-y-0.5
                    hover:bg-indigo-50
                  "
                >
                  <Search size={18} />
                  Browse Books
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/issues"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur
                    transition
                    hover:bg-white/10
                  "
                >
                  <Bookmark size={18} />
                  My Issues
                </Link>

              </div>
            </div>


            {/* Hero visual */}

            <div className="hidden lg:block">

              <div className="relative mx-auto h-72 w-72">

                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl" />

                <div className="absolute inset-5 rotate-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl" />

                <div className="absolute inset-10 -rotate-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-7 shadow-2xl">

                  <div className="flex h-full flex-col justify-between">

                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                        <Library size={25} />
                      </div>

                      <Sparkles
                        size={19}
                        className="text-violet-300"
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Library
                      </p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        Keep Reading.
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        Explore. Borrow. Learn.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Error */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => loadDashboard(true)}
              className="ml-auto font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}


        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={BookOpen}
            label="Books Available"
            value={stats.books}
            description="Explore the catalog"
            iconClass="bg-indigo-50 text-indigo-600"
            valueClass="text-slate-900"
          />

          <StatCard
            icon={Bookmark}
            label="Active Issues"
            value={stats.issued}
            description="Books currently with you"
            iconClass="bg-violet-50 text-violet-600"
            valueClass="text-slate-900"
          />

          <StatCard
            icon={Clock3}
            label="Pending Requests"
            value={stats.pending}
            description="Waiting for approval"
            iconClass="bg-amber-50 text-amber-600"
            valueClass="text-slate-900"
          />

          <StatCard
            icon={CheckCircle2}
            label="Returned Books"
            value={stats.returned}
            description="Completed reading"
            iconClass="bg-emerald-50 text-emerald-600"
            valueClass="text-slate-900"
          />

        </div>


        {/* =====================================================
            LOWER CONTENT
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Library activity */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={19}
                    className="text-indigo-600"
                  />

                  <h2 className="font-bold text-slate-900">
                    Your Library
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your books and requests.
                </p>
              </div>

              <Link
                to="/issues"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all
              </Link>

            </div>

            <div className="p-6">

              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                    <BookOpen size={28} />
                  </div>

                  <div className="flex-1">

                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Reading activity
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {stats.issued > 0
                        ? "You have books waiting for you."
                        : "Your reading journey starts here."}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {stats.issued > 0
                        ? `You currently have ${stats.issued} active issue${stats.issued === 1 ? "" : "s"}. Keep an eye on your due dates.`
                        : "Browse the library and request a book you would like to read."}
                    </p>

                  </div>

                  <Link
                    to={stats.issued > 0 ? "/issues" : "/books"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {stats.issued > 0
                      ? "View Issues"
                      : "Explore Books"}

                    <ArrowRight size={16} />
                  </Link>

                </div>
              </div>


              {/* Mini stats */}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <MiniStat
                  icon={BookOpen}
                  label="Catalog"
                  value={stats.books}
                />

                <MiniStat
                  icon={Clock3}
                  label="Requests"
                  value={stats.pending}
                />

                <MiniStat
                  icon={CheckCircle2}
                  label="Returned"
                  value={stats.returned}
                />

              </div>
            </div>
          </section>


          {/* Quick actions */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-2">
              <Sparkles
                size={19}
                className="text-violet-600"
              />

              <h2 className="font-bold text-slate-900">
                Quick Actions
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Jump straight to what you need.
            </p>

            <div className="mt-6 space-y-3">

              <QuickAction
                to="/books"
                icon={Search}
                title="Find a Book"
                description="Browse the complete catalog"
              />

              <QuickAction
                to="/issues"
                icon={Bookmark}
                title="My Issues"
                description="Check borrowed books"
              />

              <QuickAction
                to="/books"
                icon={Library}
                title="Explore Library"
                description="Discover something new"
              />

            </div>

          </section>

        </div>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-7 shadow-xl shadow-indigo-900/10 sm:p-9">

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-indigo-100">
                READY FOR YOUR NEXT BOOK?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Find your next great read.
              </h2>

              <p className="mt-2 max-w-xl text-sm text-indigo-100">
                Explore the collection and send an
                issue request directly from any book.
              </p>
            </div>

            <Link
              to="/books"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              Browse Library
              <ArrowRight size={17} />
            </Link>

          </div>
        </section>


        {/* Refresh */}

        <div className="mt-6 flex justify-center">

          <button
            type="button"
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white hover:text-slate-600"
          >
            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh dashboard
          </button>

        </div>

      </main>
    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass,
  valueClass,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p
            className={`mt-2 text-3xl font-black ${valueClass}`}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass} transition group-hover:scale-110`}
        >
          <Icon size={21} />
        </div>

      </div>
    </div>
  );
}


// =====================================================
// MINI STAT
// =====================================================

function MiniStat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="font-bold text-slate-900">
          {value}
        </p>
      </div>

    </div>
  );
}


// =====================================================
// QUICK ACTION
// =====================================================

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/50"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">

        <p className="font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowRight
        size={16}
        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
      />

    </Link>
  );
}

