// ProductModal.jsx
import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-center" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>

        <img src={product.cover} alt={product.para} className="modal-image-center" />
        <h2 className="modal-title">{product.para}</h2>
        <p className="modal-desc">{product.desc}</p>
      </div>
    </div>
  );
};

export default ProductModal;
