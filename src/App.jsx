import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">M-Motors</Link>
        <nav>
          <Link to="/">Accueil</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}