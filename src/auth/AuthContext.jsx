import { useEffect, useState } from "react";
import apiClient, { setAccessToken } from "../api/client.js";
import { AuthContext } from "./auth-context.js";


// Fournit le token, le profil et les actions login/logout à toute l'app.
export function AuthProvider({ children }) {
  // Token initialisé depuis localStorage pour garder la session après un rechargement.
  const [token, setToken] = useState(() => localStorage.getItem("access"));
  const [user, setUser] = useState(null);
  
  // À chaque changement de token : on l'injecte dans axios, on le persiste,
  // et on récupère le profil (/me/). Token invalide => déconnexion
  useEffect(() => {
    setAccessToken(token);
    async function loadProfil() {
      if (token) {
        localStorage.setItem("access", token);
        try {
          const r = await apiClient.get("/me/");
          setUser(r.data);
        } catch {
          logout();
        }
      } else {
        localStorage.removeItem("access");
        setUser(null);
      }
    }
    loadProfil();
  }, [token]);

  // Connexion : récupère le token d'accès JWT et le stocke
  async function login(email, password) {
    const r = await apiClient.post("/auth/login/", { email, password });
    setToken(r.data.access);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}