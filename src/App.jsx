import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Catalogue from "./pages/Catalogue.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">M-Motors</Link>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/catalogue">Catalogue</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </main>
    </div>
  );
}