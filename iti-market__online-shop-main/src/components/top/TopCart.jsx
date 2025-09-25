import React, { useState } from "react";
import Tdata from "./Tdata";
import Slider from "react-slick";
import ProductModal from "./ProductModal"; // import modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopCart = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 580, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {Tdata.map((value, index) => (
          <div
            className="box product"
            key={index}
            onClick={() => setSelectedProduct(value)} // Khi bấm → mở modal
            style={{ cursor: "pointer" }}
          >
            <div className="nametop d_flex">
              <span className="tleft">{value.para}</span>
              <span className="tright">{value.desc}</span>
            </div>
            <div className="img">
              <img src={value.cover} alt={`Slide ${index}`} />
            </div>
          </div>
        ))}
      </Slider>

      {/* Hiển thị modal khi có sản phẩm được chọn */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default TopCart;
