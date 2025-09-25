import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const hasDiscount = product.discount && product.discount > 0;
  const salePrice = hasDiscount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-center" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {/* Ảnh nằm trên */}
        <img src={product.cover} alt={product.name} className="modal-image-center" />

        {/* Thông tin nằm dưới */}
        <h2 className="modal-title">{product.name}</h2>

        {hasDiscount ? (
          <>
            <p className="modal-old-price">${product.price}</p>
            <p className="modal-price">${salePrice}</p>
          </>
        ) : (
          <p className="modal-price">${product.price}</p>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
