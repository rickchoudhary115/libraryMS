import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ children, admin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
