import { buildUrl } from "../api";
import "./ExpandModal.css";

export default function ExpandModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  // Crear 3 elementos adicionales con la misma imagen del producto principal
  const additionalItems = [
    { id: `${product.id}-ext-1`, image: product.image, title: `${product.title} - Variante 1` },
    { id: `${product.id}-ext-2`, image: product.image, title: `${product.title} - Variante 2` },
    { id: `${product.id}-ext-3`, image: product.image, title: `${product.title} - Variante 3` },
  ];

  return (
    <div className="expand-modal-overlay" onClick={onClose}>
      <div className="expand-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="expand-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>{product.title}</h2>

        <div className="expand-gallery">
          {additionalItems.map((item) => (
            <div key={item.id} className="expand-item">
              <img src={buildUrl(`/images/${item.image}`)} alt={item.title} />
              <div className="product-txt">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
