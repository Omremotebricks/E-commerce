import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { addtoCart, payment, removeCart } from "../store/slice/getProductSlice";
import { handlePayment } from "../utils/payment.js";
export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.product);
  const { mode } = useAppSelector((state) => state.theme);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={
        mode === "dark"
          ? "min-h-[calc(100vh-73px)] bg-gray-950 px-4 py-8 text-white"
          : "min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8 text-slate-900"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p
              className={
                mode === "dark"
                  ? "mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300"
                  : "mb-2 text-sm uppercase tracking-[0.2em] text-cyan-700"
              }
            >
              Checkout
            </p>
            <h1 className="text-2xl font-bold sm:text-4xl">Cart Page</h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className={
                    mode === "dark"
                      ? "flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:flex-row"
                      : "flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:flex-row"
                  }
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-32 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                  />

                  <div className="flex-1">
                    <h2 className="text-sm font-semibold sm:text-lg">
                      {item.title}
                    </h2>

                    <p
                      className={
                        mode === "dark" ? "text-slate-400" : "text-slate-500"
                      }
                    >
                      {item.brand}
                    </p>

                    <p className="mt-2 font-bold text-emerald-500">
                      ₹{item.price}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => dispatch(removeCart(item))}
                        className={
                          mode === "dark"
                            ? "rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-white transition hover:bg-white/10"
                            : "rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-slate-900 transition hover:bg-slate-200"
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(addtoCart(item))}
                        className={
                          mode === "dark"
                            ? "rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-white transition hover:bg-white/10"
                            : "rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-slate-900 transition hover:bg-slate-200"
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeCart(item))}
                    className="self-start font-medium text-rose-500 transition hover:text-rose-400"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div
                className={
                  mode === "dark"
                    ? "rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8"
                    : "rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8"
                }
              >
                <h1 className="text-xl font-semibold sm:text-2xl">
                  Cart is Empty
                </h1>
                <Link
                  className={
                    mode === "dark" ? "mt-2 text-sky-300" : "mt-2 text-sky-500"
                  }
                  to="/dashboard/products"
                >
                  click hear add products..
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div
            className={
              mode === "dark"
                ? "h-fit rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-6"
                : "h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6"
            }
          >
            <h2 className="mb-5 text-lg font-semibold sm:text-xl">
              Order Summary
            </h2>

            <div
              className={
                mode === "dark"
                  ? "space-y-3 text-slate-200"
                  : "space-y-3 text-slate-700"
              }
            >
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Math.round(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr
                className={
                  mode === "dark" ? "border-white/10" : "border-slate-200"
                }
              />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{Math.round(totalPrice)}</span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={() =>
                handlePayment(Math.round(totalPrice), () => {
                  dispatch(payment());
                  navigate("/dashboard/products");
                })
              }
              className={
                mode === "dark"
                  ? "mt-6 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-gray-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
                  : "mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
