import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./App";

export default function AuthGuard({ role, children }) {
  const { user } = useContext(AppContext);

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
