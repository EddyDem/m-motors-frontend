import apiClient from "../api/client.js";

// Création d'un compte client
export async function register(payload) {
  const r = await apiClient.post("/auth/register/", payload);
  return r.data;
}

// Mise à jour partielle du profil connecté
export async function updateProfile(payload) {
  const r = await apiClient.patch("/me/", payload);
  return r.data;
}