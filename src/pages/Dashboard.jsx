import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux.js";

export default function Dashboard() {
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <div
      className={
        mode === "dark"
          ? "flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-950 px-4"
          : "flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-4"
      }
    >
      <Outlet />
      {/* <div
        className={
          mode === "dark"
            ? "w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6"
            : "w-full max-w-md rounded-lg border border-gray-200 bg-white p-6"
        }
      >
        <h1
          className={
            mode === "dark"
              ? "text-2xl font-semibold text-white"
              : "text-2xl font-semibold text-gray-900"
          }
        >
          Dashboard
        </h1>
        <p
          className={
            mode === "dark"
              ? "mt-2 text-sm text-gray-300"
              : "mt-2 text-sm text-gray-600"
          }
        >
          You are logged in.
        </p>
      </div> */}
    </div>
  );
}
