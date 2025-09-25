import React, { useState } from "react";
import Ndata from "./Ndata";
import ProductDetailsModal from "./ProductDetailsModal"; // import modal

const Cart = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div className="content grid product">
        {Ndata.map((val, index) => (
          <div
            className="box"
            key={index}
            onClick={() => setSelectedProduct(val)} // mở modal khi click
          >
            <div className="img">
              <img src={val.cover} alt={val.name} />
            </div>
            <h4>{val.name}</h4>
            <span>${val.price}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Cart;
