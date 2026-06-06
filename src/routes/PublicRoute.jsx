import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard/products" replace />;
  }

  return children;
}
