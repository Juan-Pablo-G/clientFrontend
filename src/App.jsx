import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ObraPage from "./pages/ObraPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obra/:id" element={<ObraPage />} />
    </Routes>
  );
}
