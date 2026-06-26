import { useEffect, useState } from "react";
import apiClient, { setAccessToken, setAuthHandlers } from "../api/client.js";
import { AuthContext } from "./auth-context.js";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("access"));
  const [user, setUser] = useState(null);

  // Rafraichit le token d'accès à partir du refresh stocké
  async function refresh() {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) throw new Error("Pas de refresh token");
    const r = await apiClient.post("/auth/refresh/", { refresh: refreshToken });
    localStorage.setItem("access", r.data.access);
    setToken(r.data.access);
    return r.data.access;
  }

  // Branche les callbacks utilisés par l'intercepteur axios
  useEffect(() => {
    setAuthHandlers({ refresh, logout });
  }, []);

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

  async function login(email, password) {
    const r = await apiClient.post("/auth/login/", { email, password });
    localStorage.setItem("refresh", r.data.refresh);
    setToken(r.data.access);
  }

  function logout() {
    localStorage.removeItem("refresh");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}