import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { buildUrl, fetchProducts } from "../api";
import ExpandModal from "./ExpandModal";

const STEP = 4;
const CATEGORIES = ["Ilustraciones", "Digital", "Acuarela", "Papel"];

export default function ProductsSection({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [expandedModal, setExpandedModal] = useState(null);
  const [visibleByCategory, setVisibleByCategory] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchProducts();
        if (!cancelled) {
          const sortedProducts = Array.isArray(list) ? list : [];
          setProducts(sortedProducts);
          
          // Inicializar contador de productos visibles por categoría
          const initialVisible = {};
          CATEGORIES.forEach((cat) => {
            initialVisible[cat] = STEP;
          });
          setVisibleByCategory(initialVisible);
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

  // Agrupar productos por categoría
  const productsByCategory = {};
  CATEGORIES.forEach((cat) => {
    productsByCategory[cat] = products.filter((p) => p.category === cat);
  });

  function handleLoadMore(category) {
    setVisibleByCategory((prev) => ({
      ...prev,
      [category]: Math.min(
        prev[category] + STEP,
        productsByCategory[category].length
      ),
    }));
  }

  function handleExpandClick(product) {
    setExpandedModal(product);
  }

  return (
    <main id="productos" className="products container">
      <h2>Proyectos recientes</h2>
      {error ? <p className="error-msg">{error}</p> : null}

      <div ref={containerRef}>
        {CATEGORIES.map((category) => {
          const categoryProducts = productsByCategory[category];
          const visible = visibleByCategory[category] || STEP;
          const showLoadMore = visible < categoryProducts.length;

          return (
            <section key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              
              {categoryProducts.length === 0 ? (
                <p className="no-products">No hay productos en esta categoría</p>
              ) : (
                <>
                  <div className="box-container">
                    {categoryProducts.map((p, index) => (
                      <div
                        key={p.id}
                        className={`box ${index < visible ? "box-visible" : ""}`}
                      >
                        <img
                          src={buildUrl(`/images/${p.image}`)}
                          alt={p.title}
                        />
                        <div className="product-txt">
                          <h3>{p.title}</h3>
                          {p.subtitle ? <p>{p.subtitle}</p> : null}
                          <button
                            className="btn-3"
                            onClick={() => handleExpandClick(p)}
                          >
                            Ver más
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showLoadMore ? (
                    <div
                      className="btn-2"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleLoadMore(category)}
                      onKeyDown={(e) => e.key === "Enter" && handleLoadMore(category)}
                    >
                      Cargar mas
                    </div>
                  ) : null}
                </>
              )}
            </section>
          );
        })}
      </div>

      <ExpandModal
        isOpen={!!expandedModal}
        onClose={() => setExpandedModal(null)}
        product={expandedModal}
        modalImage="/images/PROYECTO1_FINAL.png"
      />

    </main>
  );
}
