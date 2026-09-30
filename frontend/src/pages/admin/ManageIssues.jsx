
import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Send,
  User,
  X,
  XCircle,
  CalendarDays,
  Library,
} from "lucide-react";

import api from "../../utils/axios.js";

import IssueTable from "../../components/issues/IssueTable.jsx";
import BookForm from "../../components/books/BookForm.jsx";

export default function ManageIssues() {
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manual issue form
  const [form, setForm] = useState({
    bookId: "",
    memberId: "",
    days: 14,
  });

  const [submitting, setSubmitting] = useState(false);

  // Request action
  const [processingRequest, setProcessingRequest] =
    useState(null);

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [
        issuesResponse,
        booksResponse,
        membersResponse,
      ] = await Promise.all([
        api.get("/issues"),
        api.get("/books"),
        api.get("/issues/members"),
      ]);

      setIssues(issuesResponse.data || []);
      setBooks(booksResponse.data || []);
      setMembers(membersResponse.data || []);
    } catch (err) {
      console.error(
        "Failed to load issue data:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load issue management data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // FILTER REQUESTS
  // =====================================================

  const pendingRequests = useMemo(() => {
    return issues.filter(
      (issue) => issue.status === "requested"
    );
  }, [issues]);

  const activeIssues = useMemo(() => {
    return issues.filter(
      (issue) => issue.status === "issued"
    );
  }, [issues]);

  // =====================================================
  // FORM HANDLERS
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // ADMIN DIRECT ISSUE
  // =====================================================

  const handleIssue = async (event) => {
    event.preventDefault();

    if (!form.bookId || !form.memberId) {
      setError(
        "Please select both a book and a member."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.post("/issues", {
        bookId: form.bookId,
        memberId: form.memberId,
        days: Number(form.days),
      });

      setSuccess(
        "Book issued successfully."
      );

      setForm({
        bookId: "",
        memberId: "",
        days: 14,
      });

      await loadData(true);
    } catch (err) {
      console.error(
        "Failed to issue book:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to issue book."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // APPROVE REQUEST
  // =====================================================

  const handleApprove = async (issueId) => {
    try {
      setProcessingRequest(issueId);
      setError("");
      setSuccess("");

      await api.put(
        `/issues/${issueId}/approve`
      );

      setSuccess(
        "Book request approved successfully."
      );

      await loadData(true);
    } catch (err) {
      console.error(
        "Failed to approve request:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to approve request."
      );
    } finally {
      setProcessingRequest(null);
    }
  };

  // =====================================================
  // REJECT REQUEST
  // =====================================================

  const handleReject = async (issueId) => {
    try {
      setProcessingRequest(issueId);
      setError("");
      setSuccess("");

      await api.put(
        `/issues/${issueId}/reject`
      );

      setSuccess(
        "Book request rejected."
      );

      await loadData(true);
    } catch (err) {
      console.error(
        "Failed to reject request:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to reject request."
      );
    } finally {
      setProcessingRequest(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="mb-8 h-36 animate-pulse rounded-3xl bg-slate-200" />

          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="mt-8 h-96 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-indigo-200">
                <Library size={14} />
                ADMIN PANEL
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Manage Issues
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage book requests, issue books,
                approve members and handle returns.
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/10
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/15
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>
          </div>
        </div>
      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Alerts */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Requests */}

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-amber-700">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-900">
                  {pendingRequests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Clock3 size={23} />
              </div>
            </div>
          </div>


          {/* Active */}

          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-indigo-700">
                  Active Issues
                </p>

                <p className="mt-2 text-3xl font-bold text-indigo-900">
                  {activeIssues.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <BookOpen size={23} />
              </div>
            </div>
          </div>


          {/* Members */}

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Members
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-900">
                  {members.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <User size={23} />
              </div>
            </div>
          </div>
        </div>


        {/* =================================================
            PENDING REQUESTS
        ================================================= */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <Clock3
                    size={19}
                    className="text-amber-500"
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    Pending Book Requests
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Review requests submitted by
                  library members.
                </p>
              </div>

              <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                {pendingRequests.length} pending
              </span>
            </div>
          </div>


          {pendingRequests.length === 0 ? (
            <div className="px-6 py-14 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <CheckCircle2 size={27} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No pending requests
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                New member requests will appear
                here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {pendingRequests.map((issue) => {

                const book =
                  issue.book || {};

                const member =
                  issue.member || {};

                const isProcessing =
                  processingRequest ===
                  issue._id;

                return (
                  <div
                    key={issue._id}
                    className="p-5 transition hover:bg-slate-50 sm:p-6"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Request info */}

                      <div className="flex min-w-0 gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <BookOpen size={22} />
                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate font-bold text-slate-900">
                            {book.title ||
                              "Unknown Book"}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            by{" "}
                            {book.author ||
                              "Unknown Author"}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">

                            <span className="inline-flex items-center gap-1.5">
                              <User size={14} />
                              {member.name ||
                                "Unknown Member"}
                            </span>

                            {member.email && (
                              <span>
                                {member.email}
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays
                                size={14}
                              />

                              {issue.createdAt
                                ? new Date(
                                    issue.createdAt
                                  ).toLocaleDateString()
                                : "Recently"}
                            </span>
                          </div>
                        </div>
                      </div>


                      {/* Actions */}

                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() =>
                            handleReject(
                              issue._id
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-red-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          {isProcessing ? (
                            <RefreshCw
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <XCircle
                              size={17}
                            />
                          )}

                          Reject
                        </button>


                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() =>
                            handleApprove(
                              issue._id
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-emerald-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          {isProcessing ? (
                            <RefreshCw
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <CheckCircle2
                              size={17}
                            />
                          )}

                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>


        {/* =================================================
            MANUAL ISSUE
        ================================================= */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-2">
              <Send
                size={19}
                className="text-indigo-600"
              />

              <h2 className="text-lg font-bold text-slate-900">
                Issue Book Manually
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Admins can still directly issue a
              book to a member.
            </p>
          </div>


          <form
            onSubmit={handleIssue}
            className="grid gap-5 p-6 md:grid-cols-4"
          >

            {/* Book */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Book
              </label>

              <select
                name="bookId"
                value={form.bookId}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
              >
                <option value="">
                  Select a book
                </option>

                {books.map((book) => {

                  const available =
                    Number(
                      book.availableCopies ??
                        book.available ??
                        0
                    );

                  return (
                    <option
                      key={book._id}
                      value={book._id}
                      disabled={
                        available <= 0
                      }
                    >
                      {book.title} —{" "}
                      {available > 0
                        ? `${available} available`
                        : "Unavailable"}
                    </option>
                  );
                })}
              </select>
            </div>


            {/* Member */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Member
              </label>

              <select
                name="memberId"
                value={form.memberId}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
              >
                <option value="">
                  Select a member
                </option>

                {members.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name} —{" "}
                    {member.email}
                  </option>
                ))}
              </select>
            </div>


            {/* Days */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Borrowing Days
              </label>

              <input
                type="number"
                name="days"
                min="1"
                max="90"
                value={form.days}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
              />
            </div>


            {/* Submit */}

            <div className="flex items-end md:col-span-3">

              <button
                type="submit"
                disabled={submitting}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {submitting ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="animate-spin"
                    />

                    Issuing...
                  </>
                ) : (
                  <>
                    <Send size={17} />

                    Issue Book
                  </>
                )}
              </button>
            </div>
          </form>
        </section>


        {/* =================================================
            ALL ISSUES
        ================================================= */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <h2 className="text-lg font-bold text-slate-900">
              All Issue Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View active, returned, requested and
              rejected records.
            </p>
          </div>

          <div className="overflow-x-auto">
            <IssueTable
              issues={issues}
              admin={true}
              onReturn={async (issueId) => {
                try {
                  setError("");
                  setSuccess("");

                  await api.put(
                    `/issues/${issueId}/return`
                  );

                  setSuccess(
                    "Book returned successfully."
                  );

                  await loadData(true);
                } catch (err) {
                  console.error(
                    "Failed to return book:",
                    err
                  );

                  setError(
                    err?.response?.data?.message ||
                      "Failed to return book."
                  );
                }
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

