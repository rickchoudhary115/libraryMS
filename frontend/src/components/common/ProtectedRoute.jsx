import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ children, admin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-50
      "
      >
        <div className="text-center">
          <div
            className="
            mx-auto
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-slate-200
            border-t-slate-900
          "
          />

          <p
            className="
            mt-4
            text-sm
            font-medium
            text-slate-500
          "
          >
            Loading library...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
