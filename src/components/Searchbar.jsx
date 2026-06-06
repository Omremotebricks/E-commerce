import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { searchRd as searchAction } from "../store/slice/getProductSlice";
export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const debouncedValue = useDebounce(search, 2000);
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ search: debouncedValue });
    } else {
      setSearchParams({});
    }

    dispatch(searchAction(debouncedValue));
  }, [debouncedValue, dispatch, setSearchParams]);
  return (
    <div className="relative w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={
          mode === "dark"
            ? "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            : "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
        />
      </svg>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        style={{ colorScheme: mode }}
        className={
          mode === "dark"
            ? "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pl-10 text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            : "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-10 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        }
      />
    </div>
  );
}
