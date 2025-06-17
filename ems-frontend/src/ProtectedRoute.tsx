import { Navigate, Outlet } from "react-router-dom";
import type { User } from "./types/auth";

interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = "/login",
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
