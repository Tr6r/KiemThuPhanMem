import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null; // Không render khi chưa chọn sản phẩm

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <img src={product.cover} alt={product.name} className="modal-image" />
        <h2>{product.name}</h2>
        <p className="modal-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductModal;
