import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
import ProductModal from "./ProductModal"; // ✅ Import modal
import "../newarrivals/style.css";

const Dcard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    margin: 200,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {Ddata.map((value, index) => (
          <div
            className="box product"
            key={index}
            onClick={() => setSelectedProduct(value)} // ✅ Khi click, mở modal
            style={{ cursor: "pointer" }}
          >
            <div className="img">
              <img src={value.cover} alt={value.name} width="100%" />
            </div>
            <h4>{value.name}</h4>
            <span>{value.price}</span>
          </div>
        ))}
      </Slider>

      {/* Hiển thị modal khi có sản phẩm được chọn */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default Dcard;
