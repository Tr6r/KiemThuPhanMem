import React, { useState } from "react";
import Slider from "react-slick";
import ProductDetailsModal from "./ProductDetailsModal"; // import modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // state để lưu sản phẩm đang xem

  const increment = () => {
    setCount(count + 1);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="control-btn"><button className="next"><i className="fa fa-long-arrow-alt-right"></i></button></div>,
    prevArrow: <div className="control-btn"><button className="prev"><i className="fa fa-long-arrow-alt-left"></i></button></div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((item) => (
          <div className="box" key={item.id}>
            <div className="product mtop" onClick={() => setSelectedProduct(item)}>
              <div className="img">
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
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa fa-star"></i>
                  ))}
                </div>
                <div className="price">
                  <h4>${item.price}.00</h4>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(item); }}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Hiện modal khi chọn sản phẩm */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default FlashCard;
