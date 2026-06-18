import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("supportdesk:token");
  const userData = localStorage.getItem("supportdesk:user");

  if (!token || !userData) {
    return <Navigate to="/acesso" replace />;
  }

  const user = JSON.parse(userData);

  if (allowedRoles && !allowedRoles.includes(user.tipo)) {
    return <Navigate to="/acesso" replace />;
  }

  return <>{children}</>;
}