import { useEffect, useState } from "react";
import { fetchDossiers, creerDossier, ajouterPiece } from "../api/dossiers.js";

// Libellés lisibles des statuts renvoyés par l'API
const LIBELLE_STATUT = {
  depose: "Déposé", en_cours: "En cours", valide: "Validé", refuse: "Refusé",
};

export default function Dossiers() {
  const [dossiers, setDossiers] = useState([]);
  const [type, setType] = useState("achat");
  const [error, setError] = useState(null);

  // Récupère (ou refresh) la liste des dossiers du client
  async function recharger() {
    try { setDossiers((await fetchDossiers()).results || []); }
    catch { setError("Chargement impossible."); }
  }

  // Chargement initial au montage
  useEffect(() => {
    let cancelled = false;
    fetchDossiers()
      .then((data) => { if (!cancelled) setDossiers(data.results || []); })
      .catch(() => { if (!cancelled) setError("Chargement impossible."); });
    return () => { cancelled = true; };
  }, []);

  // Crée un dossier puis rafraîchit la liste
  async function handleCreer() {
    setError(null);
    try {
      await creerDossier(type);
      recharger();
    } catch {
      setError("Création du dossier impossible.");
    }
  }
  
  // Envoie une pièce
  async function handleUpload(dossierId, file) {
    if (!file) return;

    setError(null);

    try { 
        await ajouterPiece(dossierId, file); recharger(); 
    }
    catch { 
        setError("Fichier refusé (type ou taille)."); 
    }
  }

  return (
    <section>
      <h1>Mes dossiers</h1>

      {error && <p role="alert">{error}</p>}

      <div className="filters">

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="achat">Achat</option>
          <option value="location">Location</option>
        </select>

        <button onClick={handleCreer}>Créer un dossier</button>
      </div>
      <ul>
        {dossiers.map((d) => (
          <li key={d.id}>
            Dossier {d.id} - {d.type} - <strong>{LIBELLE_STATUT[d.statut]}</strong>
            {d.statut === "refuse" && d.motif_refus && <em> ({d.motif_refus})</em>}
            {" "}

            <input type="file" accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleUpload(d.id, e.target.files[0])} />

            <span> {d.documents?.length || 0} pièce(s)</span>
          </li>
        ))}
      </ul>
    </section>
  );
}