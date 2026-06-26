import axios from "axios";

// URL de l'API back (Django)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const apiClient = axios.create({ baseURL, timeout: 10000 });

// Token JWT gardé en mémoire
let accessToken = null;
export function setAccessToken(token) {
  accessToken = token;
}

// Ajoute l'en-tete Authorization a chaque requete si un token est présent
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;