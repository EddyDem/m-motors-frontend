import apiClient from "./client.js";

// liste paginée des véhicules
export async function fetchVehicles(params = {}) {
  const response = await apiClient.get("/vehicles/", { params });
  return response.data;
}