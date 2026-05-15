import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { buildUrl, fetchProducts } from "../api";

const STEP = 4;

function DetailLink({ product }) {
  let detail = (product.detailPath || `/obra/${product.id}`).trim();

  if (!detail.startsWith("/") && !/^https?:\/\//i.test(detail)) {
    detail = "/" + detail;
  }

  const external = /^https?:\/\//i.test(detail);
  if (external) {
    return (
      <a href={detail} className="btn-3" target="_blank" rel="noreferrer">
        Ver más
      </a>
    );
  }
  return (
    <Link to={detail} className="btn-3">
      Ver más
    </Link>
  );
}

export default function ProductsSection({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(STEP);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchProducts();
        if (!cancelled) {
          setProducts(Array.isArray(list) ? list : []);
          setVisible(STEP);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "No se pudieron cargar los productos");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    const boxes = containerRef.current?.querySelectorAll(".box");
    if (!boxes || !boxes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );
    boxes.forEach((box) => {
      box.style.opacity = "0";
      box.style.transform = "translateY(40px)";
      box.style.transition = "all 0.6s ease";
      observer.observe(box);
    });
    return () => observer.disconnect();
  }, [products]);

  const showLoadMore = visible < products.length;

  function loadMore() {
    setVisible((v) => Math.min(v + STEP, products.length));
  }

  return (
    <main id="productos" className="products container">
      <h2>Productos</h2>
      {error ? <p className="error-msg">{error}</p> : null}
      <div className="box-container" id="lista-1" ref={containerRef}>
        {products.map((p, index) => (
          <div key={p.id} className={`box ${index < visible ? "box-visible" : ""}`}>
            <img src={buildUrl(`/images/${p.image}`)} alt={p.title} />
            <div className="product-txt">
              <h3>{p.title}</h3>
              {p.subtitle ? <p>{p.subtitle}</p> : null}
              <DetailLink product={p} />
            </div>
          </div>
        ))}
      </div>
      {showLoadMore ? (
        <div className="btn-2" role="button" tabIndex={0} onClick={loadMore} onKeyDown={(e) => e.key === "Enter" && loadMore()}>
          Cargar mas
        </div>
      ) : null}
    </main>
  );
}
