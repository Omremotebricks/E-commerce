import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
export default function Pagination({
  currentPage,
  setCurrentPage,
  limit,
  skip,
  totalPages,
}) {
  const [, setSearchParams] = useSearchParams();
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("skip", skip);
      prev.set("limit", limit);
      return prev;
    });
  }, [currentPage, setSearchParams]);
  return (
    <div className="mt-8 flex w-full items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={
          mode === "dark"
            ? "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        }
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={
            currentPage === index + 1
              ? mode === "dark"
                ? "rounded-full bg-cyan-500 px-3 py-1 text-sm font-semibold text-gray-950"
                : "rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white"
              : mode === "dark"
                ? "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10"
                : "rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
          }
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={
          mode === "dark"
            ? "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        }
      >
        Next
      </button>
    </div>
  );
}
