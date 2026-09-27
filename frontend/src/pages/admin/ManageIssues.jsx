import { useEffect, useState } from "react";

import IssueTable from "../../components/issues/IssueTable.jsx";

import api from "../../utils/axios.js";

export default function ManageIssues() {
  const [issues, setIssues] = useState([]);

  const [books, setBooks] = useState([]);

  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    bookId: "",
    memberId: "",
    days: 14,
  });

  const loadData = async () => {
    try {
      const [issuesResponse, booksResponse, membersResponse] =
        await Promise.all([
          api.get("/issues"),

          api.get("/books"),

          api.get("/issues/members"),
        ]);

      setIssues(issuesResponse.data);

      setBooks(booksResponse.data);

      setMembers(membersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const issueBook = async (e) => {
    e.preventDefault();

    try {
      await api.post("/issues", form);

      setForm({
        bookId: "",
        memberId: "",
        days: 14,
      });

      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Issue failed");
    }
  };

  const returnBook = async (id) => {
    try {
      const { data } = await api.put(`/issues/${id}/return`);

      alert(`Book returned. Fine: ₹${data.fine}`);

      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Return failed");
    }
  };

  return (
    <main className="container">
      <h1>Manage Issues</h1>

      <form className="card inline-form" onSubmit={issueBook}>
        <select
          required
          value={form.bookId}
          onChange={(e) =>
            setForm({
              ...form,
              bookId: e.target.value,
            })
          }
        >
          <option value="">Select Book</option>

          {books
            .filter((book) => book.availableCopies > 0)
            .map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} ({book.availableCopies})
              </option>
            ))}
        </select>

        <select
          required
          value={form.memberId}
          onChange={(e) =>
            setForm({
              ...form,
              memberId: e.target.value,
            })
          }
        >
          <option value="">Select Member</option>

          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
              {" — "}
              {member.email}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={form.days}
          onChange={(e) =>
            setForm({
              ...form,
              days: Number(e.target.value),
            })
          }
        />

        <button>Issue Book</button>
      </form>

      <IssueTable issues={issues} admin={true} onReturn={returnBook} />
    </main>
  );
}
