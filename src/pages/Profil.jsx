import { useState } from "react";
import { useAuth } from "../auth/auth-context.js";
import { updateProfile } from "../auth/auth.js";

export default function Profil() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    telephone: user?.telephone || "",
  });
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    try {
      await updateProfile(form);
      setMessage("Profil mis à jour.");
    } catch {
      setMessage("Mise à jour impossible.");
    }
  }

  if (!user) return <p>Chargement...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Mon profil</h1>

      <p>{user.email}</p>

      {message && <p role="alert">{message}</p>}

      <input name="first_name" placeholder="Prénom"
        value={form.first_name} onChange={handleChange} />

      <input name="last_name" placeholder="Nom"
        value={form.last_name} onChange={handleChange} />

      <input name="telephone" placeholder="Téléphone"
        value={form.telephone} onChange={handleChange} />

      <button type="submit">Enregistrer</button>
    </form>
  );
}