import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/profil");
    } catch {
      setError("Identifiants invalides.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>

      {error && <p role="alert">{error}</p>}

      <input type="email" placeholder="E-mail" value={email}
        onChange={(e) => setEmail(e.target.value)} required />

      <input type="password" placeholder="Mot de passe" value={password}
        onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Se connecter</button>
    </form>
  );
}