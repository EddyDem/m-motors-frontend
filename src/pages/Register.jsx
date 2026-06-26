import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../auth/auth.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", password: "", first_name: "", last_name: "", telephone: "",
  });
  const [error, setError] = useState(null);
  
  // Met à jour le champ modifié
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await register(form);
      navigate("/login");
    } catch {
      setError("Inscription impossible (e-mail déjà utilisé ou mot de passe trop faible).");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>

      {error && <p role="alert">{error}</p>}

      <input name="email" type="email" placeholder="E-mail"
        value={form.email} onChange={handleChange} required />

      <input name="password" type="password" placeholder="Mot de passe"
        value={form.password} onChange={handleChange} required />

      <input name="first_name" placeholder="Prénom"
        value={form.first_name} onChange={handleChange} />

      <input name="last_name" placeholder="Nom"
        value={form.last_name} onChange={handleChange} />

      <input name="telephone" placeholder="Téléphone"
        value={form.telephone} onChange={handleChange} />

      <button type="submit">Créer mon compte</button>
    </form>
  );
}