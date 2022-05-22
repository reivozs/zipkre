import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/homePage.css";
import sarkanszils from "./images/ShirtDifSleeve/sarkanszils.png";
import { preces } from "./preces.js";
import Slider from "react-slick";

const HomePage = () => {
  const [productList, setProductList] = useState(
    JSON.parse(window.sessionStorage.getItem("productList"))
  );

  const [acceptProduct, setAcceptProduct] = useState({
    name: "",
    price: 0,
    size: "",
    sizeId: 0,
    sameProduct: 0,
  });

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const changeBg = (prop) => {
    var elements = document.getElementsByClassName("sizeValue"); // get all elements
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "black";
    }
    prop.style.backgroundColor = "gray";
    setAcceptProduct({ size: prop.innerHTML, sizeId: prop.id });
  };

  const addProduct = (prop) => {
    if (acceptProduct.sizeId === prop.id) {
      if (productList) {
        setProductList([
          ...productList,
          {
            id: Math.random().toString(36).substr(2, 9),
            nosaukums: prop.nosaukums,
            bilde: prop.bilde,
            cena: prop.cena,
            izmers: acceptProduct.size,
          },
        ]);
      } else {
        setProductList([
          {
            id: Math.random().toString(36).substr(2, 9),
            nosaukums: prop.nosaukums,
            bilde: prop.bilde,
            cena: prop.cena,
            izmers: acceptProduct.size,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    window.sessionStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  return (
    <>
      <div className="hr"></div>
      <header>
        <div className="leftHeader">
          <nav>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart">
                  <span className="productCountCircle">
                    {productList ? productList.length : 0}
                  </span>
                </i>
              </Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#shop">Shop</a>
            </li>
            <li>
              <a href="#footer">Contact</a>
            </li>
          </nav>
          <div>
            <h1>ZIPKRE</h1>
            <h2>Feel Freedom</h2>
          </div>
        </div>
        <div className="rightHeader">
          <img src={sarkanszils} alt="Red T-Shirt with blue sleeves" />
        </div>
      </header>
      <main>
        <div id="about">
          <img src={sarkanszils} alt="Red T-Shirt with blue sleeves" />
          <div className="aboutProductBox">
            <section>
              <h1 style={{ backgroundColor: "rgb(213, 233, 233)" }}>
                Funkcionāls
              </h1>
              <p>
                Ar rāvējslēdzēju mehānismu iespējams noņemt/pielikt piedurknes
              </p>
            </section>
            <section>
              <h1 style={{ backgroundColor: "rgb(213, 213, 233)" }}>
                Ietaupa vietu
              </h1>
              <p>
                Izmanojam gan kā krekls ar garām, gan kā krekls ar īsām
                piedurknēm
              </p>
            </section>
            <section>
              <h1 style={{ backgroundColor: "rgb(233, 213, 213)" }}>
                Ietaupa naudu
              </h1>
              <p>
                Iegādājoties 2 kreklus ir iespējams izveidot 8 kreklu
                kombinācijas
              </p>
            </section>
            <section>
              <h1 style={{ backgroundColor: "rgb(213, 233, 213)" }}>
                Mainīt krāsas
              </h1>
              <p>Vienādu izmēru krekliem iespējam mainīt piedurknes</p>
            </section>
          </div>
        </div>
        <h2 id="shop">T-Shirts with long sleeves in one color</h2>
        <Slider {...settings}>
          {preces[0]["kreklsGarasPiedurknes"].map((prece) => {
            return (
              <div className="prece" key={prece.nosaukums}>
                <Content
                  prece={prece}
                  changeBg={changeBg}
                  addProduct={addProduct}
                />
              </div>
            );
          })}
        </Slider>
        <h2>T-Shirts without sleeves</h2>
        <Slider {...settings}>
          {preces[0]["krekls"].map((prece) => {
            return (
              <div className="prece" key={prece.nosaukums}>
                <Content
                  prece={prece}
                  changeBg={changeBg}
                  addProduct={addProduct}
                />
              </div>
            );
          })}
        </Slider>
        <h2>Sleeves</h2>
        <Slider {...settings}>
          {preces[0]["sleeves"].map((prece) => {
            return (
              <div className="prece" key={prece.nosaukums}>
                <Content
                  prece={prece}
                  changeBg={changeBg}
                  addProduct={addProduct}
                />
              </div>
            );
          })}
        </Slider>
      </main>
      <footer id="footer">
        <a href="#" className="fa fa-facebook"></a>
        <a href="#" className="fa fa-instagram"></a>
      </footer>
    </>
  );
};

const Content = ({ prece, changeBg, addProduct }) => {
  return (
    <div className="preceContent">
      <img src={prece.bilde} alt={prece.nosaukums} />
      <h3>{prece.nosaukums}</h3>
      <div className="size">
        <h4>SIZE:</h4>
        <span
          className="sizeValue"
          id={prece.id}
          onClick={(e) => changeBg(e.target, prece.nosaukums, prece.cena)}
        >
          S
        </span>
        <span
          className="sizeValue"
          id={prece.id}
          onClick={(e) => changeBg(e.target)}
        >
          M
        </span>
        <span
          className="sizeValue"
          id={prece.id}
          onClick={(e) => changeBg(e.target)}
        >
          L
        </span>
        <span
          className="sizeValue"
          id={prece.id}
          onClick={(e) => changeBg(e.target)}
        >
          XL
        </span>
        <span
          className="sizeValue"
          id={prece.id}
          onClick={(e) => changeBg(e.target)}
        >
          XXL
        </span>
      </div>
      <div className="details">
        <p>${prece.cena}</p>
        <span onClick={() => addProduct(prece)}>+</span>
      </div>
    </div>
  );
};

export default HomePage;
