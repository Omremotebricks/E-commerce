import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux.js";
import { login } from "../store/slice/authSlice.js";
import userValidation from "../utils/userValidation.js";
export default function Login() {
  const [formData, setformData] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { mode } = useAppSelector((state) => state.theme);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user == null) {
        const result = await userValidation(
          formData.userName,
          formData.password,
        );
        dispatch(login({ data: result, isAuth: true }));
      } else {
        return;
      }
    } catch (error) {
      console.error("error", error);
    }
    setformData({
      userName: "",
      password: "",
    });
  }

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className={
        mode === "dark"
          ? "flex min-h-[calc(100vh-73px)] items-center justify-center px-4 bg-gray-950"
          : "flex min-h-[calc(100vh-73px)] items-center justify-center px-4 bg-gray-50"
      }
    >
      <div
        className={
          mode === "dark"
            ? "w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm"
            : "w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        }
      >
        <h1
          className={
            mode === "dark"
              ? "text-2xl font-semibold text-white"
              : "text-2xl font-semibold text-gray-900"
          }
        >
          Login
        </h1>
        <p
          className={
            mode === "dark"
              ? "mt-2 text-sm text-gray-300"
              : "mt-2 text-sm text-gray-600"
          }
        >
          Enter your
          <b>
            <q>emilys</q>
          </b>
          and{" "}
          <b>
            <q>emilyspass</q>
          </b>{" "}
          to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="userName"
              className={
                mode === "dark"
                  ? "mb-1 block text-sm font-medium text-gray-200"
                  : "mb-1 block text-sm font-medium text-gray-700"
              }
            >
              Username
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              placeholder="Enter username"
              value={formData.userName}
              onChange={handleChange}
              className={
                mode === "dark"
                  ? "w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-900"
                  : "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={
                mode === "dark"
                  ? "mb-1 block text-sm font-medium text-gray-200"
                  : "mb-1 block text-sm font-medium text-gray-700"
              }
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={
                mode === "dark"
                  ? "w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-900"
                  : "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
