// Carte d'affichage d'un véhicule dans la grille du catalogue
export default function VehicleCard({ vehicle }) {
  return (
    <article className="card">
      <span className="badge">{vehicle.mode}</span>
      <h3>{vehicle.marque} {vehicle.modele}</h3>
      <p>{vehicle.motorisation} - {vehicle.kilometrage} km</p>
      <p className="price">{vehicle.prix} €</p>
    </article>
  );
}