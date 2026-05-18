import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import ObraPage from "./pages/ObraPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<Home />} />
      <Route path="/admin/obra/:id" element={<ObraPage />} />
      <Route path="/obra/:id" element={<ObraPage />} />
    </Routes>
  );
}
