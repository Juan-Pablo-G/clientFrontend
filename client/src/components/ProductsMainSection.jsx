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

  const fallbackProduct = {
    id: "nina-fresa-01",
    title: "Niña Fresa",
    subtitle: "Ilustración cuentos infantiles",
    image: "PROYECTO1_FINAL.png",
    modalImage: "PROYECTO 1.png",
    description: "Proyecto inspirado en dos palabras en técnica acuarela",
    detailPath: "/obra/niña-fresa",
  };

  const fallbackProduct2 = {
    id: "recetas-abuelita-01",
    title: "Recetas de la Abuelita",
    subtitle: "Recetario ilustrado",
    image: "portadaRecetario.png",
    modalImage: "recetario.png",
    description: "Recetario ilustrado con una identidad visual inspirada en la cocina tradicional",
    detailPath: "/obra/recetas-abuelita",
  };

  const productFromApi = products[0] || {};
  const productFromApi2 = products[1] || {};
  const useFallback =
    !productFromApi.title ||
    productFromApi.title === "Ejemplo Producto" ||
    productFromApi.image?.startsWith("pla") ||
    productFromApi.image?.startsWith("imgPrincipal");

  const useFallback2 =
    !productFromApi2.title ||
    productFromApi2.title === "Ejemplo Producto" ||
    productFromApi2.image?.startsWith("pla") ||
    productFromApi2.image?.startsWith("imgPrincipal");

  const mainProducts = [
    {
      ...fallbackProduct,
      ...productFromApi,
      title: useFallback ? fallbackProduct.title : productFromApi.title,
      subtitle: useFallback
        ? fallbackProduct.subtitle
        : productFromApi.subtitle || fallbackProduct.subtitle,
      image: useFallback ? fallbackProduct.image : productFromApi.image || fallbackProduct.image,
      modalImage: useFallback ? fallbackProduct.modalImage : productFromApi.modalImage || fallbackProduct.modalImage,
      description: useFallback
        ? fallbackProduct.description
        : productFromApi.description || fallbackProduct.description,
      detailPath: productFromApi.detailPath || fallbackProduct.detailPath,
    },
    {
      ...fallbackProduct2,
      ...productFromApi2,
      title: useFallback2 ? fallbackProduct2.title : productFromApi2.title,
      subtitle: useFallback2
        ? fallbackProduct2.subtitle
        : productFromApi2.subtitle || fallbackProduct2.subtitle,
      image: useFallback2 ? fallbackProduct2.image : productFromApi2.image || fallbackProduct2.image,
      modalImage: useFallback2 ? fallbackProduct2.modalImage : productFromApi2.modalImage || fallbackProduct2.modalImage,
      description: useFallback2
        ? fallbackProduct2.description
        : productFromApi2.description || fallbackProduct2.description,
      detailPath: productFromApi2.detailPath || fallbackProduct2.detailPath,
    },
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
                {(product.subtitle || product.description) ? (
                  <p className="product-subtitle">
                    {product.subtitle || product.description}
                  </p>
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
        modalImage={expandedModal?.modalImage ? `/images/${expandedModal.modalImage}` : "/images/PROYECTO 1.png"}
      />
    </section>
  );
}
