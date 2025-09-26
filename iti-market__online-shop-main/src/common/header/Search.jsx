import React, { useEffect, useRef, useState } from "react";
import logo from "../../components/assets/images/logo1.svg";
import { Link, useNavigate } from "react-router-dom";

// Import dữ liệu
import Data from "../../components/flashDeals/Data";
import Ddata from "../../components/discount/Ddata";
import Ndata from "../../components/newarrivals/Ndata";
import Sdata from "../../components/shops/Sdata";
import Tdata from "../../components/top/Tdata";

const Search = ({ cartItem }) => {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Gộp tất cả sản phẩm từ nhiều nguồn
  const allProducts = [
    ...Data.productItems,
    ...Ddata,
    ...Ndata,
    ...Sdata.shopItems,
    ...Tdata,
  ].map((item, index) => ({
    ...item,
    id: item.id || `p-${index}`, // đảm bảo mỗi item có id
    price: item.price || 0,
  }));

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = allProducts.filter((item) =>
        item.name?.toLowerCase().includes(value)
      );
      setResults(filtered);
    }
  };

  // Đóng dropdown login khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [loginRef]);

  return (
    <section className="search">
      <div className="container c_flex">
        {/* Logo */}
        <div className="logo width">
          <img
            src={logo}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Search box */}
        <div className="search-box f_flex" style={{ position: "relative" }}>
          <i className="fa fa-search"></i>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search and hit enter..."
          />
          <span>All Category</span>

          {/* Kết quả tìm kiếm */}
          {results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                width: "100%",
                border: "1px solid #ddd",
                zIndex: 1000,
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {results.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/product/${item.id}`)} // chuyển đến chi tiết
                >
                  <img
                    src={item.cover}
                    alt={item.name}
                    style={{ width: "40px", marginRight: "10px" }}
                  />
                  <span>
                    {item.name}{" "}
                    <span style={{ color: "red" }}> ${item.price} </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User + Cart */}
        <div className="icon f_flex width">
          <div className="icon-Circle" ref={loginRef}>
            <i
              className="fa fa-user icon-circle"
              onClick={() => setShowLogin((prev) => !prev)}
            ></i>
            <ul style={{ display: `${showLogin ? "block" : "none"}` }}>
              <li onClick={() => setShowLogin(false)}>
                <Link to="/login">Login</Link>
              </li>
              <li onClick={() => setShowLogin(false)}>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div className="cart">
            <Link to="/cart">
              <i className="fa fa-shopping-bag icon-circle"></i>
              <span>{cartItem.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
