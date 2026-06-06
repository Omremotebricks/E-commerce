import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux.js";
import { logout } from "../store/slice/authSlice.js";
import { toggleTheme } from "../store/slice/themeSlice.js";

export default function Header() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.product);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <header
      className={
        mode === "dark"
          ? "border-b border-white/10 bg-gray-950/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur"
          : "border-b border-slate-200 bg-white/90 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span
            className={
              mode === "dark"
                ? "grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20"
                : "grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white"
            }
          >
            E
          </span>

          <div className="leading-tight">
            <h3 className="text-base font-semibold tracking-wide sm:text-lg">
              E-Commerce
            </h3>
            <p
              className={
                mode === "dark"
                  ? "text-xs text-slate-400"
                  : "text-xs text-slate-500"
              }
            >
              Smart shopping, simple checkout
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium sm:gap-3">
          {!isAuthenticated && (
            <>
              <Link
                to="/"
                className={
                  mode === "dark"
                    ? "rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                    : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                }
              >
                Home
              </Link>
              <Link
                to="/login"
                className={
                  mode === "dark"
                    ? "rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                    : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                }
              >
                Login
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard/products"
                className={
                  mode === "dark"
                    ? "rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                    : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                }
              >
                Dashboard
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className={
              mode === "dark"
                ? "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200 transition hover:bg-white/10"
                : "rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
            }
          >
            {mode === "light" ? "Dark mode" : "Light mode"}
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className={
                mode === "dark"
                  ? "rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-rose-200 transition hover:bg-rose-500/20"
                  : "rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-rose-700 transition hover:bg-rose-100"
              }
            >
              Logout
            </button>
          )}

          {isAuthenticated && (
            <Link
              to="/dashboard/products/cart"
              className={
                mode === "dark"
                  ? "relative rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20"
                  : "relative rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-cyan-700 transition hover:bg-cyan-100"
              }
            >
              Cart
              <span
                className={
                  mode === "dark"
                    ? "ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-semibold text-gray-950"
                    : "ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-cyan-600 px-2 py-0.5 text-xs font-semibold text-white"
                }
              >
                {cart.length}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
