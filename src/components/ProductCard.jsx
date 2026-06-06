import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux.js";
import { addtoCart, removeCart } from "../store/slice/getProductSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.product);
  const { mode } = useAppSelector((state) => state.theme);

  const isDark = mode === "dark";
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-white/10 bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-cyan-500/30"
          : "border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:border-cyan-300"
      }`}
    >
      {/* Image */}
      <div
        className="relative cursor-pointer overflow-hidden"
        style={{ aspectRatio: "4/3" }}
        onClick={() => navigate(`/dashboard/product/${product.id}`)}
      >
        <img
          src={
            product.images?.[0] ||
            product.images?.[1] ||
            product.images?.[2] ||
            product.images?.[3] ||
            "https://via.placeholder.com/300x225?text=No+Image"
          }
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability badge */}
        <div className="absolute left-2 top-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              product.availabilityStatus === "In Stock"
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {product.availabilityStatus === "In Stock" ? "In Stock" : "Out"}
          </span>
        </div>

        {/* Quantity badge */}
        {quantity > 0 && (
          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white shadow">
            {quantity}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Category + Rating row */}
        <div className="mb-1.5 flex items-center justify-between gap-1">
          <span
            className={`truncate rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
              isDark
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
                : "bg-cyan-50 text-cyan-700"
            }`}
          >
            {product.category}
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-amber-500 sm:text-xs">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`mb-1 line-clamp-2 text-xs font-bold leading-tight sm:text-sm ${
            isDark ? "text-white" : "text-slate-800"
          }`}
          onClick={() => navigate(`/dashboard/product/${product.id}`)}
        >
          {product.title}
        </h2>

        {/* Brand */}
        {product.brand && (
          <p
            className={`mb-2 text-[10px] sm:text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {product.brand}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto">
          <p className="text-base font-extrabold text-emerald-500 sm:text-lg">
            ₹{product.price}
          </p>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:gap-2">
            <button
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200 active:scale-95 sm:text-sm ${
                isDark
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-400"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
              onClick={() => dispatch(addtoCart(product))}
            >
              {quantity > 0 ? `Add (${quantity})` : "Add to Cart"}
            </button>

            {quantity > 0 && (
              <button
                onClick={() => dispatch(removeCart(product))}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200 active:scale-95 sm:text-sm ${
                  isDark
                    ? "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
