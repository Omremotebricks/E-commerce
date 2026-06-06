import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { filterRd as filterAction } from "../store/slice/getProductSlice.js";

export default function Filter() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("categories");

  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  // Fetch once
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  // Dispatch when category changes
  useEffect(() => {
    dispatch(filterAction(categoryName));
  }, [categoryName, dispatch]);

  return (
    <div className="w-full">
      <select
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={{ colorScheme: mode }}
        className={
          mode === "dark"
            ? "w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all sm:py-3 sm:text-base focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            : "w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-all sm:py-3 sm:text-base focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        }
      >
        <option value="categories">All Categories</option>
        {categories.map((data) => (
          <option key={data.slug} value={data.slug}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
}
