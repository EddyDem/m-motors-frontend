import axios from "axios";

// URL de l'API back (Django)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const apiClient = axios.create({ baseURL, timeout: 10000 });

export default apiClient;