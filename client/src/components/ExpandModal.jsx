import { buildUrl } from "../api";
import "./ExpandModal.css";

export default function ExpandModal({ isOpen, onClose, product, modalImage: modalImageProp }) {
  if (!isOpen || !product) return null;

  const description = product.description || product.subtitle;
  const modalTitle = "PROYECTO 1";
  const modalImage = modalImageProp ? buildUrl(modalImageProp) : buildUrl("/images/PROYECTO 1.png");

  return (
    <div className="expand-modal-overlay" onClick={onClose}>
      <div className="expand-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="expand-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>{modalTitle}</h2>

        <div className="expand-gallery">
          <div className="expand-item">
            <img src={modalImage} alt="Proyecto 1" />
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
