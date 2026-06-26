import apiClient from "./client.js";

// Catalogue des options de location
export async function fetchOptions() {
  return (await apiClient.get("/options/")).data;
}

// Calcule le prix sans rien enregistrer (aperçu)
export async function calculerDevis(payload) {
  return (await apiClient.post("/contracts/devis/", payload)).data;
}

// Crée le contrat (montants figés côté back)
export async function souscrire(payload) {
  return (await apiClient.post("/contracts/", payload)).data;
}