import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        📚 LibraryMS
      </Link>

      <nav>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/books">Books</Link>

        <Link to="/issues">My Issues</Link>

        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        <button className="danger small" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
