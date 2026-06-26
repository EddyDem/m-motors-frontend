import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context.js";

// Garde de route : redirige vers /login si l'utilisateur n'est pas connecté
export default function RequireAuth({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}