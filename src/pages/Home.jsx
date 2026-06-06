import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux.js";

export default function Home() {
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <div
      className={
        mode === "dark"
          ? "min-h-[calc(100vh-73px)] bg-gray-950 px-4 py-10 text-white"
          : "min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-10 text-gray-900"
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section
          className={
            mode === "dark"
              ? "rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
              : "rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
          }
        >
          <p
            className={
              mode === "dark"
                ? "text-sm uppercase tracking-[0.25em] text-cyan-300"
                : "text-sm uppercase tracking-[0.25em] text-cyan-700"
            }
          >
            Store Overview
          </p>

          <div className="mt-4 max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl">
              A simple place to discover everyday products.
            </h1>

            <p
              className={
                mode === "dark"
                  ? "text-base leading-7 text-slate-300"
                  : "text-base leading-7 text-slate-600"
              }
            >
              This store is built to help customers browse products by category,
              compare prices, check ratings, and place orders quickly.
              Everything is kept clean and easy to understand.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Electronics",
                text: "Phones, laptops, and accessories.",
              },
              {
                title: "Fashion",
                text: "Clothing, shoes, and daily style.",
              },
              {
                title: "Home Goods",
                text: "Useful items for your living space.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={
                  mode === "dark"
                    ? "rounded-2xl border border-white/10 bg-black/20 p-5"
                    : "rounded-2xl border border-gray-200 bg-gray-50 p-5"
                }
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p
                  className={
                    mode === "dark"
                      ? "mt-2 text-sm text-slate-400"
                      : "mt-2 text-sm text-slate-600"
                  }
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard/products"
              className="inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Browse Products
            </Link>
            <div
              className={
                mode === "dark"
                  ? "inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-slate-300"
                  : "inline-flex items-center rounded-full border border-gray-200 px-5 py-3 text-sm text-gray-600"
              }
            >
              Simple store layout for quick shopping
            </div>
          </div>
        </section>

        <section
          className={
            mode === "dark"
              ? "grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2"
              : "grid gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2"
          }
        >
          <div>
            <h2 className="text-xl font-semibold">What this store offers</h2>
            <p
              className={
                mode === "dark"
                  ? "mt-2 text-sm leading-6 text-slate-400"
                  : "mt-2 text-sm leading-6 text-gray-600"
              }
            >
              You can search products, filter by category, sort by price or
              name, and open each item for more details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Shopping flow</h2>
            <p
              className={
                mode === "dark"
                  ? "mt-2 text-sm leading-6 text-slate-400"
                  : "mt-2 text-sm leading-6 text-gray-600"
              }
            >
              Pick a product, check the details page, add it to cart, then use
              the checkout flow when you are ready.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
