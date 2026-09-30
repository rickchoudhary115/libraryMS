import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { Library, Mail, Lock } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(form.email, form.password);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-slate-950
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-md
      "
      >
        <div
          className="
          mb-8
          text-center
        "
        >
          <div
            className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-white
            text-slate-900
            shadow-xl
          "
          >
            <Library size={27} />
          </div>

          <h1
            className="
            mt-5
            text-2xl
            font-bold
            text-white
          "
          >
            Welcome back
          </h1>

          <p
            className="
            mt-2
            text-sm
            text-slate-400
          "
          >
            Sign in to your LibraryMS account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-2xl
            sm:p-8
          "
        >
          {error && (
            <div
              className="
              mb-5
              rounded-xl
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-600
            "
            >
              {error}
            </div>
          )}

          <label
            className="
            text-sm
            font-semibold
            text-slate-700
          "
          >
            Email
            <div
              className="
              mt-2
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              px-3
              focus-within:border-slate-500
            "
            >
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="
                  w-full
                  border-0
                  py-3
                  outline-none
                "
              />
            </div>
          </label>

          <label
            className="
            mt-5
            block
            text-sm
            font-semibold
            text-slate-700
          "
          >
            Password
            <div
              className="
              mt-2
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              px-3
              focus-within:border-slate-500
            "
            >
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  border-0
                  py-3
                  outline-none
                "
              />
            </div>
          </label>

          <button
            className="
              mt-7
              w-full
              rounded-xl
              bg-slate-900
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Sign In
          </button>

          <p
            className="
            mt-6
            text-center
            text-sm
            text-slate-500
          "
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                font-semibold
                text-slate-900
                hover:underline
              "
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
