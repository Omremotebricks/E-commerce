import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import {
  useAppDispatch,
  useAppSelector,
  useAppSelector as useThemeSelector,
} from "../hooks/useRedux";
import { addtoCart, apiProduct, payment } from "../store/slice/getProductSlice";
import { handlePayment } from "../utils/payment.js";
export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mode } = useThemeSelector((state) => state.theme);
  const {
    singleProduct: product,
    loading,
    error,
    cart,
  } = useAppSelector((state) => state.product);

  const cartItem = cart.find((item) => {
    return item.id == id;
  });
  const quantity = cartItem?.quantity || 0;

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    dispatch(apiProduct({ query: `/${id}` }));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <Loader
          mode={mode}
          title="Loading product details"
          subtitle="We are fetching the selected product."
        />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-auto w-full rounded-2xl shadow-lg"
          />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="aspect-square rounded-xl border object-cover"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <span className="inline-flex w-fit rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold sm:text-4xl">{product.title}</h1>

          <p className="text-sm leading-6 text-gray-600 sm:text-base">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <p className="text-2xl font-bold text-green-600 sm:text-4xl">
              ₹{product.price}
            </p>
            <p className="w-fit rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
              Quantity: {quantity}
            </p>
          </div>

          <div className="space-y-2 text-sm sm:text-base">
            <p className="leading-6">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>

            <p className="leading-6">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>

            <p className="leading-6">
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation}
            </p>

            <p className="leading-6">
              <span className="font-semibold">Shipping:</span>{" "}
              {product.shippingInformation}
            </p>

            <p className="leading-6">
              <span className="font-semibold">Return Policy:</span>{" "}
              {product.returnPolicy}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={() => dispatch(addtoCart(product))}
              className="flex-1 rounded-xl bg-black py-3 text-sm text-white sm:text-base"
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                quantity === 0
                  ? handlePayment(Math.round(product.price), () => {
                      dispatch(payment());
                      navigate("/dashboard/products");
                    })
                  : handlePayment(Math.round(totalPrice), () => {
                      dispatch(payment());
                      navigate("/dashboard/products");
                    });
              }}
              className="flex-1 cursor-pointer rounded-xl bg-cyan-500 py-3 text-sm text-white sm:text-base"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-16">
        <h2 className="mb-6 text-xl font-bold sm:text-3xl">Customer Reviews</h2>

        <div className="space-y-5">
          {product.reviews?.map((review, index) => (
            <div key={index} className="rounded-2xl border p-5 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">{review.reviewerName}</h3>

                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
