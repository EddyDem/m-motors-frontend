import apiClient from "./client.js";

// Dossiers du client connecté
export async function fetchDossiers() {
  return (await apiClient.get("/dossiers/")).data;
}

// Crée un dossier
export async function creerDossier(type) {
  return (await apiClient.post("/dossiers/", { type })).data;
}

// Joint une pièce au dossier
export async function ajouterPiece(dossierId, fichier) {
  const data = new FormData();
  data.append("fichier", fichier);
  return (await apiClient.post(`/dossiers/${dossierId}/documents/`, data)).data;
}