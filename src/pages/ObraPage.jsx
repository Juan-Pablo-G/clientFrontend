import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buildUrl, fetchProduct } from "../api";

export default function ObraPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const p = await fetchProduct(id);
        if (!cancelled) setProduct(p);
      } catch (e) {
        if (!cancelled) setError(e.message || "No encontrado");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <header className="header">
        <div className="header-content container" style={{ padding: "80px 24px" }}>
          <div className="header-txt" style={{ width: "100%", textAlign: "center" }}>
            <p className="error-msg">{error}</p>
            <Link to="/#productos" className="btn-1">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </header>
    );
  }

  if (!product) {
    return (
      <header className="header">
        <div className="header-content container" style={{ padding: "80px 24px" }}>
          <p>Cargando…</p>
        </div>
      </header>
    );
  }

  return (
    <header className="header obra-header">
      <div className="header-content container">
        <div className="header-img">
          <img src={buildUrl(`/images/${product.image}`)} alt={product.title} />

        <div className="header-txt">
          <h1>{product.title}</h1>
          <p>{product.description || "No hay descripción de producto. Agrega una desde administración."}</p>

          <Link to="/#productos" className="btn-1">
            Volver
          </Link>
        </div>
      </div>
    </header>
  );
}
