import { useEffect, useState } from "react";
import { fetchVehicles } from "../api/vehicles.js";
import { fetchOptions, calculerDevis, souscrire } from "../api/subscriptions.js";

export default function Souscription() {
    const [vehicules, setVehicules] = useState([]);
    const [options, setOptions] = useState([]);
    const [vehicule, setVehicule] = useState("");
    const [choisies, setChoisies] = useState([]);
    const [duree, setDuree] = useState(36);
    const [devis, setDevis] = useState(null);
    const [message, setMessage] = useState(null);

    // Au montage : véhicules en location uniquement + options disponibles
    useEffect(() => {
        fetchVehicles({ mode: "location" }).then((d) => setVehicules(d.results || []));
        fetchOptions().then(setOptions);
    }, []);

    // Coche / décoche une option
    function toggleOption(id) {
        setChoisies((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    // Corps de requête commun au devis et à la souscription
    const payload = () => ({
        vehicule: Number(vehicule),
        options: choisies,
        duree_mois: Number(duree),
    });

    // Aperçu du prix, sans engagement
    async function handleDevis() {
        setMessage(null);

        try { 
            setDevis(await calculerDevis(payload())); 
        }
        catch { 
            setMessage("Devis impossible."); 
        }
    }

    // Souscription effective
    async function handleSouscrire() {
        try {
            await souscrire(payload());
            setMessage("Contrat souscrit.");
            setDevis(null);
        } catch { 
            setMessage("Souscription impossible."); 
        }
    }

    return (
        <section>
            <h1>Souscription location longue durée</h1>
            <select value={vehicule} onChange={(e) => setVehicule(e.target.value)}>
                <option value="">Choisir un véhicule</option>

            {vehicules.map((v) => (
                <option key={v.id} value={v.id}>{v.marque} {v.modele}</option>
            ))}
            </select>

            <fieldset>
                <legend>Options</legend>
                {options.map((o) => (
                    <label key={o.id}>
                        <input type="checkbox" checked={choisies.includes(o.id)} onChange={() => toggleOption(o.id)} />
                        {o.libelle} ({o.prix_mensuel} €/mois)
                    </label>
                ))}
            </fieldset>

            <label>Durée (mois)
                <input type="number" min="1" value={duree}
                    onChange={(e) => setDuree(e.target.value)} />
            </label>

            <button onClick={handleDevis} disabled={!vehicule}>Calculer le devis</button>

            {/* Le récapitulatif n'apparaît qu'après un devis */}
            {devis && (
                <div>
                    <p>Loyer de base : {devis.loyer_base} €/mois</p>
                    <p>Total mensuel : {devis.total_mensuel} €/mois</p>
                    <p>Engagement total : {devis.total_engagement} €</p>
                <button onClick={handleSouscrire}>Souscrire</button>
                </div>
            )}

            {message && <p role="alert">{message}</p>}

        </section>
    );
}