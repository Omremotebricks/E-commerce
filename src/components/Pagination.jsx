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
  const isDark = mode === "dark";

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("skip", skip);
      prev.set("limit", limit);
      return prev;
    });
  }, [currentPage, setSearchParams]);

  if (totalPages <= 1) return null;

  // Build visible page numbers (show max 5 pages around current)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  const btnBase = `flex h-9 min-w-[36px] items-center justify-center rounded-xl border px-2 text-sm font-medium transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40`;

  const btnInactive = isDark
    ? `border-white/10 bg-white/5 text-slate-300 hover:bg-white/10`
    : `border-slate-200 bg-white text-slate-700 hover:bg-slate-100`;

  const btnActive = isDark
    ? `border-cyan-500 bg-cyan-500 text-gray-950 shadow-[0_0_16px_rgba(6,182,212,0.4)]`
    : `border-slate-900 bg-slate-900 text-white shadow-[0_2px_8px_rgba(15,23,42,0.2)]`;

  return (
    <div className="mt-8 flex w-full items-center justify-center gap-1.5 sm:gap-2">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`${btnBase} ${btnInactive} gap-1 px-3`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className={`flex h-9 w-9 items-center justify-center text-sm ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${btnBase} ${currentPage === page ? btnActive : btnInactive}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`${btnBase} ${btnInactive} gap-1 px-3`}
      >
        <span className="hidden sm:inline">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
