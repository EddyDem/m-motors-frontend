import { useEffect, useState } from "react";
import { fetchVehicles } from "../api/vehicles.js";
import VehicleCard from "../components/VehicleCard.jsx";

export default function Catalogue() {
  const [vehicles, setVehicles] = useState([]);
  const [marque, setMarque] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recharge la liste à chaque changement de filtre
  useEffect(() => {
    let cancelled = false;
    const params = {};
    if (marque) params.marque = marque;
    if (mode) params.mode = mode;
    fetchVehicles(params)
      .then((data) => {
        if (cancelled) return;
        setVehicles(data.results || []);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger le catalogue.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [marque, mode]);

  return (
    <section>
      <h1>Catalogue</h1>
      <div className="filters">
        <input type="text" placeholder="Marque" value={marque}
          onChange={(e) => setMarque(e.target.value)} />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="">Achat et location</option>
          <option value="achat">Achat</option>
          <option value="location">Location</option>
        </select>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && vehicles.length === 0 && <p>Aucun véhicule trouvé.</p>}
      <div className="grid">
        {vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
      </div>
    </section>
  );
}