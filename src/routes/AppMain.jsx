import { Route, Routes } from "react-router-dom";
import NotFound from "../components/Error.jsx";
import Header from "../components/Header";
import { useAppSelector } from "../hooks/useRedux.js";
import CartPage from "../pages/CartPage.jsx";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails.jsx";
import Products from "../pages/Products.jsx";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppMain() {
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <div
      className={
        mode === "dark"
          ? "min-h-screen bg-gray-950 text-white"
          : "min-h-screen bg-gray-50 text-gray-900"
      }
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/product/:id" element={<ProductDetails />} />
          <Route
            path="/dashboard/products/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
