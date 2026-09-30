import { Link } from "react-router-dom";

import {
  BookOpen,
  ClipboardList,
  Users,
  Plus,
  ArrowRight,
  Settings2,
  ShieldCheck,
  Sparkles,
  Library,
  BarChart3,
  UserCog,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            {/* Hero content */}

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide text-indigo-200 backdrop-blur">
                <ShieldCheck size={14} />
                ADMIN CONTROL CENTER
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Library
                <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Management Hub
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Manage your books, members, issue requests and library
                operations from one powerful workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/admin/books"
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
                    transition
                    hover:-translate-y-0.5
                    hover:bg-indigo-50
                  "
                >
                  <BookOpen size={18} />
                  Manage Books
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/admin/issues"
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
                  <ClipboardList size={18} />
                  Manage Issues
                </Link>
              </div>
            </div>

            {/* Visual */}

            <div className="hidden lg:block">
              <div className="relative h-72 w-72">
                <div className="absolute inset-0 rounded-[3rem] bg-indigo-500/20 blur-3xl" />

                <div className="absolute right-2 top-4 h-52 w-44 rotate-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl" />

                <div className="absolute bottom-3 left-3 h-52 w-44 -rotate-6 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                        <Settings2 size={22} />
                      </div>

                      <Sparkles size={18} className="text-violet-300" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Admin
                      </p>

                      <p className="mt-2 text-xl font-bold text-white">
                        Everything
                      </p>

                      <p className="text-xl font-bold text-indigo-300">
                        under control.
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
        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStat
            icon={BookOpen}
            title="Book Catalog"
            description="Manage your collection"
            to="/admin/books"
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <AdminStat
            icon={ClipboardList}
            title="Issue Management"
            description="Issues & requests"
            to="/admin/issues"
            iconClass="bg-violet-50 text-violet-600"
          />

          <AdminStat
            icon={Users}
            title="Members"
            description="View library members"
            to="/admin/issues"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <AdminStat
            icon={BarChart3}
            title="Library Activity"
            description="Monitor operations"
            to="/admin/issues"
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* =====================================================
            MANAGEMENT GRID
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main management */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <Library size={19} className="text-indigo-600" />

                <h2 className="font-bold text-slate-900">Library Management</h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Quickly access the most important administrative tools.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <ManagementCard
                to="/admin/books"
                icon={BookOpen}
                title="Manage Books"
                description="Add new books, update book information, remove books and monitor availability."
                iconClass="bg-indigo-50 text-indigo-600"
              />

              <ManagementCard
                to="/admin/issues"
                icon={ClipboardList}
                title="Manage Issues"
                description="Approve member requests, issue books manually and process returns."
                iconClass="bg-violet-50 text-violet-600"
              />

              <ManagementCard
                to="/admin/issues"
                icon={Users}
                title="Manage Members"
                description="View registered members and manage their library activity."
                iconClass="bg-emerald-50 text-emerald-600"
              />

              <ManagementCard
                to="/admin/books"
                icon={Plus}
                title="Add New Book"
                description="Expand your collection by adding another book to the catalog."
                iconClass="bg-amber-50 text-amber-600"
              />
            </div>
          </section>

          {/* Quick panel */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={19} className="text-violet-600" />

              <h2 className="font-bold text-slate-900">Quick Actions</h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Common administrative tasks.
            </p>

            <div className="mt-6 space-y-3">
              <QuickAdminAction
                to="/admin/books"
                icon={Plus}
                title="Add a Book"
                description="Add to catalog"
              />

              <QuickAdminAction
                to="/admin/books"
                icon={BookOpen}
                title="View Catalog"
                description="Manage collection"
              />

              <QuickAdminAction
                to="/admin/issues"
                icon={ClipboardList}
                title="Review Requests"
                description="Approve or reject"
              />

              <QuickAdminAction
                to="/admin/issues"
                icon={UserCog}
                title="Members"
                description="View member activity"
              />
            </div>
          </section>
        </div>

        {/* =====================================================
            ADMIN CTA
        ===================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-950 p-7 sm:p-9">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                <ShieldCheck size={15} />
                Administration
              </div>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Keep your library running smoothly.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Review pending requests, keep the catalog updated and make sure
                every issue is handled properly.
              </p>
            </div>

            <Link
              to="/admin/issues"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-50"
            >
              Open Issue Manager
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

// =====================================================
// ADMIN STAT
// =====================================================

function AdminStat({ icon: Icon, title, description, to, iconClass }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClass} transition group-hover:scale-110`}
        >
          <Icon size={22} />
        </div>

        <ArrowRight
          size={17}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
        />
      </div>

      <h3 className="mt-5 font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </Link>
  );
}

// =====================================================
// MANAGEMENT CARD
// =====================================================

function ManagementCard({ to, icon: Icon, title, description, iconClass }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-100 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-slate-50"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass} transition group-hover:scale-105`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-slate-900">{title}</h3>

            <ArrowRight
              size={16}
              className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
            />
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// =====================================================
// QUICK ADMIN ACTION
// =====================================================

function QuickAdminAction({ to, icon: Icon, title, description }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{title}</p>

        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>

      <ArrowRight
        size={15}
        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
      />
    </Link>
  );
}
