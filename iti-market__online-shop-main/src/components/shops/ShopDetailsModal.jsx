import React from "react";

const ShopDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  // Tính giá sau khi giảm
  const salePrice = (
    product.price - (product.price * product.discount) / 100
  ).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-body">
          <img src={product.cover} alt={product.name} className="modal-img" />
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p>
              <b>Discount:</b> {product.discount}%
            </p>
            <p>
              <b>Original Price:</b>{" "}
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                ${product.price}.00
              </span>
            </p>
            <p>
              <b>Sale Price:</b>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                ${salePrice}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsModal;
