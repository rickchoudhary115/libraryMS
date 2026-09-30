import { useState } from "react";

import {
  BookOpen,
  User,
  Hash,
  Tag,
  Boxes,
  X,
  CheckCircle2,
  AlertCircle,
  Send,
  Clock3,
  Loader2,
} from "lucide-react";

import api from "../../utils/axios.js";

export default function BookCard({ book }) {
  const [showDetails, setShowDetails] = useState(false);

  const [requesting, setRequesting] = useState(false);

  const [requestStatus, setRequestStatus] = useState(null);

  const [requestMessage, setRequestMessage] = useState("");

  const available = Number(book.availableCopies ?? book.available ?? 0);

  const total = Number(book.totalCopies ?? 0);

  const isAvailable = available > 0;

  const handleRequestIssue = async () => {
    if (!isAvailable) {
      setRequestStatus("error");
      setRequestMessage("No copies are currently available.");
      return;
    }

    try {
      setRequesting(true);

      setRequestStatus(null);
      setRequestMessage("");

      await api.post("/issues/request", {
        bookId: book._id,
      });

      setRequestStatus("success");

      setRequestMessage("Issue request sent to the admin successfully.");
    } catch (error) {
      console.error("Book request failed:", error);

      setRequestStatus("error");

      setRequestMessage(
        error?.response?.data?.message || "Unable to send issue request.",
      );
    } finally {
      setRequesting(false);
    }
  };

  const closeModal = () => {
    setShowDetails(false);
    setRequestStatus(null);
    setRequestMessage("");
  };

  return (
    <>
      {/* =====================================================
          BOOK CARD
      ===================================================== */}

      <article
        onClick={() => setShowDetails(true)}
        className="
          group
          relative
          cursor-pointer
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-indigo-200
          hover:shadow-xl
        "
      >
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        <div className="p-5">
          {/* Icon + Availability */}
          <div className="mb-5 flex items-start justify-between gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
                transition
                group-hover:bg-indigo-600
                group-hover:text-white
              "
            >
              <BookOpen size={23} />
            </div>

            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1.5
                text-xs
                font-semibold
                ${
                  isAvailable
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }
              `}
            >
              {isAvailable ? (
                <CheckCircle2 size={14} />
              ) : (
                <AlertCircle size={14} />
              )}

              {isAvailable ? `${available} available` : "Unavailable"}
            </span>
          </div>

          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {book.category || "General"}
            </span>
          </div>

          {/* Title */}
          <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
            {book.title}
          </h2>

          {/* Author */}
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <User size={15} />
            <span className="truncate">{book.author}</span>
          </div>

          {/* ISBN */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <Hash size={14} />
            <span>{book.ISBN}</span>
          </div>

          {/* Bottom */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-500">
              {total > 0
                ? `${available}/${total} copies`
                : "Copies unavailable"}
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              View details →
            </span>
          </div>
        </div>
      </article>

      {/* =====================================================
          BOOK DETAILS MODAL
      ===================================================== */}

      {showDetails && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            backdrop-blur-sm
          "
          onClick={closeModal}
        >
          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              bg-white
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-6 text-white">
              <button
                type="button"
                onClick={closeModal}
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  transition
                  hover:bg-white/20
                "
              >
                <X size={19} />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                    ring-1
                    ring-white/20
                  "
                >
                  <BookOpen size={30} />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-300">
                    {book.category || "General"}
                  </p>

                  <h2 className="text-2xl font-bold">{book.title}</h2>

                  <p className="mt-1 text-sm text-slate-300">
                    by {book.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Request message */}
              {requestMessage && (
                <div
                  className={`
                    mb-5
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    p-4
                    text-sm
                    ${
                      requestStatus === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {requestStatus === "success" ? (
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={19} className="mt-0.5 shrink-0" />
                  )}

                  <span>{requestMessage}</span>
                </div>
              )}

              {/* Book Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Author */}
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <User size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Author
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900">{book.author}</p>
                </div>

                {/* ISBN */}
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Hash size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      ISBN
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900">
                    {book.ISBN || "Not provided"}
                  </p>
                </div>

                {/* Category */}
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Tag size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Category
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900">
                    {book.category || "General"}
                  </p>
                </div>

                {/* Copies */}
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Boxes size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Availability
                    </span>
                  </div>

                  <p
                    className={`font-semibold ${
                      isAvailable ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {available} of {total} copies available
                  </p>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div className="mt-5">
                  <h3 className="mb-2 text-sm font-bold text-slate-900">
                    Description
                  </h3>

                  <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Availability Banner */}
              <div
                className={`
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  p-4
                  ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }
                `}
              >
                {isAvailable ? (
                  <CheckCircle2 size={21} />
                ) : (
                  <AlertCircle size={21} />
                )}

                <div>
                  <p className="font-semibold">
                    {isAvailable
                      ? "This book is available"
                      : "This book is currently unavailable"}
                  </p>

                  <p className="mt-0.5 text-xs opacity-80">
                    {isAvailable
                      ? "You can send an issue request to the administrator."
                      : "Please check again later when a copy is returned."}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-50
                  "
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleRequestIssue}
                  disabled={
                    requesting || !isAvailable || requestStatus === "success"
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-indigo-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-indigo-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {requesting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending Request...
                    </>
                  ) : requestStatus === "success" ? (
                    <>
                      <Clock3 size={18} />
                      Request Pending
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Request Issue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
