import { buildUrl } from "../api";
import "./ExpandModal.css";

export default function ExpandModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const description = product.description || product.subtitle;
  const modalTitle = product.modalTitle || "PROYECTO 1";

  return (
    <div className="expand-modal-overlay" onClick={onClose}>
      <div className="expand-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="expand-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>{modalTitle}</h2>

        <div className="expand-gallery">
          <div className="expand-item">
            <img src={buildUrl(`/images/${product.image}`)} alt={product.title} />
            <div className="product-txt">
              <h3>{product.title}</h3>
              {description ? <p>{description}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
