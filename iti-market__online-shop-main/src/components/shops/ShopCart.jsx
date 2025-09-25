import React, { useState } from "react";
import ShopDetailsModal from "./ShopDetailsModal"; // import modal

const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // state lưu sản phẩm đang xem

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {shopItems.map((item, index) => (
        <div className="box" key={index}>
          <div className="product mtop">
            <div className="img" onClick={() => setSelectedProduct(item)}>
              <span className="discount">{item.discount}% Off</span>
              <img src={item.cover} alt={item.name} />
              <div className="product-like">
                <label>{count}</label> <br />
                <i className="fa-regular fa-heart" onClick={increment}></i>
              </div>
            </div>
            <div className="product-details">
              <h3>{item.name}</h3>
              <div className="rate">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <div className="price">
                <h4>${item.price}.00</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // tránh mở modal khi nhấn +
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Hiện modal khi chọn sản phẩm */}
      {selectedProduct && (
        <ShopDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ShopCart;
