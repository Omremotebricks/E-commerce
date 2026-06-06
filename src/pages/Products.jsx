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
  const limit = 12;
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalProducts / limit);

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

  const filterData = productList.filter((data) => data.rating <= rating);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div
        className={
          mode === "dark"
            ? "rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg"
            : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        }
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <Searchbar />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-105">
            <Sort />
            <Filter />
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        {loading && (
          <Loader
            mode={mode}
            title="Loading products"
            subtitle="Please wait while we fetch the latest items."
            overlay
          />
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {productList.length !== 0 ? (
            productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div
              className={
                mode === "dark"
                  ? "col-span-full flex min-h-[40vh] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5"
                  : "col-span-full flex min-h-[40vh] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60"
              }
            >
              <p
                className={
                  mode === "dark"
                    ? "mt-4 text-xl text-white"
                    : "mt-4 text-xl text-slate-900"
                }
              >
                No Data Found
              </p>
            </div>
          )}
        </div>

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
  );
}
