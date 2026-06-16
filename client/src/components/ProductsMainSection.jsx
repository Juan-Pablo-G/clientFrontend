import React, { useEffect, useState, useRef } from 'react';
import { buildUrl, fetchProducts } from '../api';
import ExpandModal from './ExpandModal';

export default function ProductsMainSection({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [expandedModal, setExpandedModal] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchProducts();
        if (!cancelled) {
          const sortedProducts = Array.isArray(list) ? list : [];
          setProducts(sortedProducts);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'No se pudieron cargar los productos');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    const boxes = containerRef.current?.querySelectorAll('.product-card');
    if (!boxes || !boxes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );
    boxes.forEach((box) => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(40px)';
      box.style.transition = 'all 0.6s ease';
      observer.observe(box);
    });
    return () => observer.disconnect();
  }, [products]);

  function handleExpandClick(product) {
    setExpandedModal(product);
  }

  // Mostrar solo el primer producto.
  // Los siguientes dos productos se conservan en el comentario para uso futuro.
  const mainProducts = products.slice(0, 1);
  // const mainProducts = products.slice(0, 3);

  return (
    <section className="products-section">
      <div className="section-header">
        <span className="section-label">Portafolio</span>
        <h2 className="section-title">Proyectos recientes</h2>
      </div>

      {error ? <p className="error-msg">{error}</p> : null}

      <div className="products-grid" ref={containerRef}>
        {mainProducts.length > 0 ? (
          mainProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={buildUrl(`/images/${product.image}`)}
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                {product.subtitle ? (
                  <p className="product-subtitle">{product.subtitle}</p>
                ) : null}
                <button
                  className="product-button"
                  onClick={() => handleExpandClick(product)}
                >
                  Proceso Creativo
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">No hay productos disponibles</p>
        )}
      </div>

      <ExpandModal
        isOpen={!!expandedModal}
        onClose={() => setExpandedModal(null)}
        product={expandedModal}
      />
    </section>
  );
}
