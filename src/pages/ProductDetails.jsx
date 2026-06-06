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
      <div className="mx-auto max-w-7xl px-4 py-8">
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full rounded-2xl shadow-lg"
          />

          <div className="grid grid-cols-3 gap-4 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="rounded-xl border"
              />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-5">
            <p className="text-4xl font-bold text-green-600">
              ₹{product.price}
            </p>
            <p className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
              Quantity: {quantity}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>

            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>

            <p>
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation}
            </p>

            <p>
              <span className="font-semibold">Shipping:</span>{" "}
              {product.shippingInformation}
            </p>

            <p>
              <span className="font-semibold">Return Policy:</span>{" "}
              {product.returnPolicy}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => dispatch(addtoCart(product))}
              className="flex-1 py-3 rounded-xl bg-black text-white"
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
              className="flex-1 cursor-pointer py-3 rounded-xl bg-cyan-500 text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        <div className="space-y-5">
          {product.reviews?.map((review, index) => (
            <div key={index} className="border rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">{review.reviewerName}</h3>

                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>

              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
