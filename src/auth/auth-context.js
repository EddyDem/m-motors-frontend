import { createContext, useContext } from "react";

// Contexte d'authentification partagé
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}