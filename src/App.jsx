import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/auth-context.js";
import RequireAuth from "./auth/RequireAuth.jsx";
import Home from "./pages/Home.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profil from "./pages/Profil.jsx";
import Dossiers from "./pages/Dossiers.jsx";

export default function App() {
  const { user, logout } = useAuth();
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">M-Motors</Link>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/catalogue">Catalogue</Link>
          {/* Liens selon l'etat de connexion */}
          {user ? (
            <>
              <Link to="/dossiers">Mes dossiers</Link>
              <Link to="/profil">Profil</Link>
              <button onClick={logout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profil" element={<RequireAuth><Profil key={user?.id} /></RequireAuth>} />
          <Route path="/dossiers" element={<RequireAuth><Dossiers /></RequireAuth>} />
        </Routes>
      </main>
    </div>
  );
}