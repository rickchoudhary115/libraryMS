import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <main className="container">
      <h1>Admin Panel</h1>

      <div className="admin-links">
        <Link className="card link-card" to="/admin/books">
          📚 Manage Books
        </Link>

        <Link className="card link-card" to="/admin/issues">
          🔄 Manage Issues
        </Link>
      </div>
    </main>
  );
}
