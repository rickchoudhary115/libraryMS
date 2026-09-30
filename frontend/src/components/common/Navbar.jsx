import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  Settings,
  Menu,
  X,
  LogOut,
  Library,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Books",
      path: "/books",
      icon: BookOpen,
    },
    {
      label: "My Issues",
      path: "/issues",
      icon: ClipboardList,
    },
  ];

  if (user?.role === "admin") {
    navItems.push({
      label: "Admin",
      path: "/admin",
      icon: Settings,
    });
  }

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header
      className="
      sticky top-0 z-50
      border-b border-slate-200
      bg-white/90 backdrop-blur-xl
    "
    >
      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-4
        sm:px-6
        lg:px-8
      "
      >
        {/* Logo */}

        <Link to="/dashboard" className="flex items-center gap-3">
          <div
            className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-slate-900
            text-white
            shadow-lg
          "
          >
            <Library size={21} />
          </div>

          <div className="hidden sm:block">
            <h1
              className="
              text-lg
              font-bold
              tracking-tight
              text-slate-900
            "
            >
              LibraryMS
            </h1>

            <p
              className="
              text-[10px]
              font-medium
              uppercase
              tracking-widest
              text-slate-400
            "
            >
              Management System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav
          className="
          hidden
          items-center
          gap-1
          md:flex
        "
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition-all

                  ${
                    isActive(item.path)
                      ? `
                        bg-slate-900
                        text-white
                        shadow-md
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                      `
                  }
                `}
              >
                <Icon size={17} />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}

        <div
          className="
          hidden
          items-center
          gap-3
          md:flex
        "
        >
          <div
            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-slate-900
            text-sm
            font-bold
            text-white
          "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="mr-2">
            <p
              className="
              max-w-28
              truncate
              text-sm
              font-semibold
              text-slate-800
            "
            >
              {user?.name}
            </p>

            <p
              className="
              text-xs
              capitalize
              text-slate-400
            "
            >
              {user?.role}
            </p>
          </div>

          <button
            onClick={logout}
            className="
              rounded-xl
              p-2.5
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-600
            "
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            rounded-xl
            p-2
            text-slate-700
            hover:bg-slate-100
            md:hidden
          "
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (
        <div
          className="
          border-t
          border-slate-200
          bg-white
          p-4
          md:hidden
        "
        >
          <div
            className="
            flex
            flex-col
            gap-1
          "
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium

                    ${
                      isActive(item.path)
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon size={18} />

                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="
                mt-2
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                text-red-600
                hover:bg-red-50
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
