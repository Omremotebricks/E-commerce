import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
