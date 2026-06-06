import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { sortRd as sortAction } from "../store/slice/getProductSlice.js";

export default function Sort() {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  const [selected, setSelected] = useState("");

  const sortMap = {
    "price-high-low": {
      sortBy: "price",
      order: "desc",
    },
    "price-low-high": {
      sortBy: "price",
      order: "asc",
    },
    "name-asc": {
      sortBy: "title",
      order: "asc",
    },
    "name-desc": {
      sortBy: "title",
      order: "desc",
    },
    "stock-high": {
      sortBy: "In_stock",
      order: "desc",
    },
    "stock-low": {
      sortBy: "Low_stock",
      order: "asc",
    },
  };

  useEffect(() => {
    if (!selected) return;

    const sortData = sortMap[selected];

    setSearchParams((prev) => {
      prev.set("sortBy", sortData.sortBy);
      prev.set("order", sortData.order);
      return prev;
    });

    dispatch(sortAction(sortData));
  }, [selected, dispatch, setSearchParams]);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      style={{ colorScheme: mode }}
      className={
        mode === "dark"
          ? "w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          : "w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
      }
    >
      <option value="">Sort By</option>

      <option value="price-high-low">Price: High to Low</option>

      <option value="price-low-high">Price: Low to High</option>

      <option value="name-asc">Name: A to Z</option>

      <option value="name-desc">Name: Z to A</option>

      <option value="stock-high">Stock: High to Low</option>

      <option value="stock-low">Stock: Low to High</option>
    </select>
  );
}
