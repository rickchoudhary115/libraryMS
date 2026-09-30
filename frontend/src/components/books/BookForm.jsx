
import { useEffect, useState } from "react";

import {
  BookOpen,
  User,
  Hash,
  Tag,
  Boxes,
  FileText,
  Save,
  X,
} from "lucide-react";

const defaultForm = {
  title: "",
  author: "",
  ISBN: "",
  category: "General",
  description: "",
  totalCopies: 1,
};

export default function BookForm({
  initial,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] =
    useState(defaultForm);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        author: initial.author || "",
        ISBN: initial.ISBN || "",
        category:
          initial.category || "General",
        description:
          initial.description || "",
        totalCopies:
          initial.totalCopies || 1,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      ISBN: form.ISBN.trim(),
      category:
        form.category.trim() || "General",
      description:
        form.description.trim(),
      totalCopies: Number(
        form.totalCopies
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ================================
          FORM TITLE
      ================================= */}

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <BookOpen size={21} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {initial
              ? "Edit Book"
              : "Add New Book"}
          </h2>

          <p className="text-sm text-slate-500">
            {initial
              ? "Update the information and save your changes."
              : "Enter the information for the new book."}
          </p>
        </div>

      </div>


      {/* ================================
          FORM FIELDS
      ================================= */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* TITLE */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BookOpen
              size={15}
              className="text-slate-400"
            />

            Book Title

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            name="title"
            placeholder="Book title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>


        {/* AUTHOR */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <User
              size={15}
              className="text-slate-400"
            />

            Author

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            name="author"
            placeholder="Author name"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>


        {/* ISBN */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Hash
              size={15}
              className="text-slate-400"
            />

            ISBN

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            name="ISBN"
            placeholder="ISBN number"
            value={form.ISBN}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>


        {/* CATEGORY */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Tag
              size={15}
              className="text-slate-400"
            />

            Category
          </label>

          <input
            name="category"
            placeholder="e.g. Fiction"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>


        {/* TOTAL COPIES */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Boxes
              size={15}
              className="text-slate-400"
            />

            Total Copies

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            name="totalCopies"
            type="number"
            min="1"
            placeholder="Total copies"
            value={form.totalCopies}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>


        {/* DESCRIPTION */}

        <div className="md:col-span-2">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText
              size={15}
              className="text-slate-400"
            />

            Description
          </label>

          <textarea
            name="description"
            placeholder="Write a short description about the book..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />

        </div>

      </div>


      {/* ================================
          SAVE / CANCEL
      ================================= */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

        {/* CANCEL */}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <X size={17} />

            Cancel
          </button>
        )}


        {/* SAVE / UPDATE */}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
        >
          <Save size={18} />

          {initial
            ? "Update Book"
            : "Save Book"}
        </button>

      </div>

    </form>
  );
}
