import { Navigate, useLocation } from "react-router-dom";

export default function RequireRole({ user, checking, error, role, children }) {
  const location = useLocation();
  if (checking) return <p role="status" className="px-6 py-28 text-center text-gray-500">Checking your account...</p>;
  if (error) return <div role="alert" className="px-6 py-28 text-center"><p>{error}</p><button type="button" onClick={() => window.location.reload()} className="mt-4 text-primary underline">Try again</button></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "owner" ? "/owner" : "/"} replace />;
  return children;
}