import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
