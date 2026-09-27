import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  author: "",
  ISBN: "",
  category: "General",
  description: "",
  totalCopies: 1,
};

export default function BookForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        totalCopies: initial.totalCopies,
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

      totalCopies: Number(form.totalCopies),
    });
  };

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h2>{initial ? "Edit Book" : "Add Book"}</h2>

      <input
        name="title"
        placeholder="Book title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />

      <input
        name="ISBN"
        placeholder="ISBN"
        value={form.ISBN}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <input
        name="totalCopies"
        type="number"
        min="1"
        placeholder="Total copies"
        value={form.totalCopies}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <div className="actions">
        <button>Save Book</button>

        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
