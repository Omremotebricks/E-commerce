import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux.js";
import { addtoCart, removeCart } from "../store/slice/getProductSlice.js";
export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.product);
  const { mode } = useAppSelector((state) => state.theme);

  const cartItem = cart.find((item) => item.id === product.id);

  const quantity = cartItem?.quantity || 0;

  return (
    <div
      key={product.id}
      className={
        mode === "dark"
          ? "overflow-hidden cursor-pointer rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
          : "overflow-hidden cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]"
      }
    >
      <div
        className="h-56 overflow-hidden"
        onClick={() => navigate(`/dashboard/product/${product.id}`)}
      >
        <img
          src={
            product.images[0] ||
            product.images[1] ||
            product.images[2] ||
            product.images[3]
          }
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2
          className={
            mode === "dark"
              ? "line-clamp-1 text-lg font-bold text-white"
              : "line-clamp-1 text-lg font-bold text-slate-800"
          }
        >
          {product.title}
        </h2>

        <p
          className={
            mode === "dark"
              ? "line-clamp-2 text-sm text-slate-300"
              : "line-clamp-2 text-sm text-slate-600"
          }
        >
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span
            className={
              mode === "dark"
                ? "rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200"
                : "rounded-full bg-cyan-50 px-2 py-1 text-xs text-cyan-700"
            }
          >
            {product.category}
          </span>

          <span className="text-yellow-500 font-semibold">
            ⭐ {product.rating}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-emerald-500">
            ₹{product.price}
          </p>
          {quantity > 0 && (
            <p
              className={
                mode === "dark"
                  ? "text-sm text-slate-400"
                  : "text-sm text-slate-500"
              }
            >
              Qty: {quantity}
            </p>
          )}
          <p
            className={
              mode === "dark"
                ? "text-sm text-slate-400"
                : "text-sm text-slate-500"
            }
          >
            {product.brand}
          </p>
        </div>

        <p
          className={`text-sm font-medium ${
            product.availabilityStatus === "In Stock"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.availabilityStatus}
        </p>
        <div className="w-full flex gap-2">
          <button
            className={
              mode === "dark"
                ? "w-full rounded-lg bg-cyan-500 py-2 font-medium text-gray-950 transition hover:bg-cyan-400"
                : "w-full rounded-lg bg-slate-950 py-2 font-medium text-white transition hover:bg-slate-800"
            }
            onClick={() => dispatch(addtoCart(product))}
          >
            Add to Cart
          </button>
          {quantity > 0 && (
            <button
              onClick={() => dispatch(removeCart(product))}
              className={
                mode === "dark"
                  ? "w-full rounded-lg border border-white/10 bg-white/5 py-2 font-medium text-white transition hover:bg-white/10"
                  : "w-full rounded-lg border border-slate-200 bg-white py-2 font-medium text-slate-900 transition hover:bg-slate-100"
              }
            >
              Remove to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
