
import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  BookOpen,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Library,
  ShieldCheck
} from "lucide-react";

import {
  useAuth
} from "../../context/AuthContext.jsx";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]:
        e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill all fields."
      );

      return;
    }

    if (
      formData.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    try {
      setLoading(true);

      await register(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "REGISTER ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden overflow-hidden lg:flex">

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  LibraryMS
                </p>

                <p className="text-xs text-slate-400">
                  Library Management System
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-lg">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Library size={16} />
                Digital Library
              </div>

              <h2 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Your library,
                <span className="block text-indigo-400">
                  all in one place.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                Create your account and start exploring
                books, managing your issues and keeping
                track of your library activity.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck size={18} />
                </div>

                Secure account management
              </div>

            </div>

            {/* Footer */}
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} LibraryMS
            </p>

          </div>
        </section>

        {/* Register Side */}
        <section className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  LibraryMS
                </p>

                <p className="text-xs text-slate-500">
                  Library Management System
                </p>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">

              {/* Heading */}
              <div className="mb-8">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <User size={23} />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create Account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Register to access your library account.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700">
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <span className="text-xs text-slate-400">
                      Min. 6 characters
                    </span>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

              {/* Login */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Login
                  </Link>
                </p>
              </div>

            </div>

            {/* Bottom */}
            <p className="mt-6 text-center text-xs text-slate-400">
              By creating an account, you can access
              the library management system.
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Register;

