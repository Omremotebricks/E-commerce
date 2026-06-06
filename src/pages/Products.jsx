import { useEffect, useState } from "react";
import Filter from "../components/Filter.jsx";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Searchbar from "../components/Searchbar.jsx";
import Sort from "../components/Sort.jsx";

import { useAppDispatch, useAppSelector } from "../hooks/useRedux.js";
import { apiProduct } from "../store/slice/getProductSlice.js";

export default function Products() {
  const { productList, totalProducts, filters, loading, error } =
    useAppSelector((state) => state.product);
  const { mode } = useAppSelector((state) => state.theme);

  const {
    search,
    sort: { sortBy, order },
    filter,
    rating,
  } = filters;

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const limit = 12;
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalProducts / limit);

  const isDark = mode === "dark";

  useEffect(() => {
    let query = "";

    if (search.trim()) {
      query = `/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (filter && filter !== "categories") {
      query = `/category/${filter}?limit=${limit}&skip=${skip}`;
    } else {
      query = `?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      query += `${query.includes("?") ? "&" : "?"}sortBy=${sortBy}&order=${order}`;
    }

    dispatch(apiProduct({ query }));
  }, [search, filter, sortBy, order, skip]);

  // reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, sortBy, order]);

  const filterData = productList.filter((data) => data.rating <= rating);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ─── Page Header ─── */}
        <div className="mb-6">
          <h1
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Products
          </h1>
          <p
            className={`mt-1 text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {totalProducts > 0
              ? `Showing ${skip + 1}–${Math.min(skip + limit, totalProducts)} of ${totalProducts} results`
              : "Browse our collection"}
          </p>
        </div>

        {/* ─── Filter Bar (desktop) / Toggle (mobile) ─── */}
        <div
          className={`mb-6 rounded-2xl p-4 shadow-sm sm:p-5 ${
            isDark
              ? "border border-white/10 bg-slate-900/80"
              : "border border-slate-200 bg-white"
          }`}
        >
          {/* Search always visible */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Searchbar />
            </div>

            {/* Mobile: toggle filter button */}
            <button
              onClick={() => setFilterOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all sm:hidden ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h18M6 9.75h12M9.75 15h4.5"
                />
              </svg>
              Filters
              {filterOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop: always show filters inline */}
          <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-2">
            <Sort />
            <Filter />
  
          </div>

          {/* Mobile: collapsible filters */}
          <div
            className={`overflow-hidden transition-all duration-300 sm:hidden ${
              filterOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3">
              <Sort />
              <Filter />

            </div>
          </div>
        </div>

        {/* ─── Product Grid ─── */}
        <div className="relative">
          {loading && (
            <Loader
              mode={mode}
              title="Loading products"
              subtitle="Please wait while we fetch the latest items."
              overlay
            />
          )}

          {error && (
            <div
              className={`mb-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                isDark
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {productList.length !== 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            !loading && (
              <div
                className={`flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-300 bg-white/60"
                }`}
              >
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  🛍️
                </div>
                <p
                  className={`text-lg font-semibold ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  No products found
                </p>
                <p
                  className={`mt-1 text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Try adjusting your search or filters
                </p>
              </div>
            )
          )}

          {productList.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
              skip={skip}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
