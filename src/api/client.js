import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const apiClient = axios.create({ baseURL, timeout: 10000 });

// Token JWT gardé en mémoire
let accessToken = null;
export function setAccessToken(token) {
  accessToken = token;
}

// Callbacks fournis par AuthContext pour rafraîchir / déconnecter
let onRefresh = null;
let onLogout = null;
export function setAuthHandlers({ refresh, logout }) {
  onRefresh = refresh;
  onLogout = logout;
}

// Ajoute le token à chaque requête
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Sur 401 : tente un refresh une seule fois, puis rejoue la requête
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && onRefresh) {
      original._retry = true;
      try {
        const nouveau = await onRefresh();
        original.headers.Authorization = `Bearer ${nouveau}`;
        return apiClient(original);
      } catch {
        if (onLogout) onLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;