import React, { useState, useRef, useEffect } from "react";
import "./style/cartPage.css";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const CartPage = () => {
  const [productList, setProductList] = useState(
    JSON.parse(window.sessionStorage.getItem("productList"))
  );

  const form = useRef();

  const totalRef = useRef(0);

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      form.current.elements["user_name"].value !== "" &&
      form.current.elements["user_surname"].value !== "" &&
      form.current.elements["user_email"].value !== "" &&
      form.current.elements["piegadesVeids"].value !== "" &&
      productList.length > 0
    ) {
      emailjs
        .sendForm(
          "gmail",
          "template_7e28plm",
          form.current,
          "1ExmH4jPglPvAXI_O"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Veiksmīgi pasūtīts!");
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      alert("Please fill all boxes");
    }
  };

  const removeItem = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  useEffect(() => {
    totalRef.current = 0;
    window.sessionStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  function Captcha(value) {
    console.log("Captcha value:", value);
  }

  return (
    <>
      <header className="cartHeader">
        <h1>Shopping cart</h1>
      </header>
      <main style={{ display: "flex" }}>
        <div className="productCart">
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {productList?.map((product) => {
                totalRef.current = 0;
                productList.map((product) => {
                  totalRef.current =
                    parseInt(totalRef.current) + parseInt(product.cena);
                });
                return (
                  <tr key={product.id}>
                    <td className="tableProduct">
                      <img src={product.bilde} alt="" />
                      <p>
                        {product.nosaukums} - {product.izmers}
                      </p>
                    </td>
                    <td className="tablePrice">${product.cena}</td>
                    <div
                      className="tableDelete"
                      onClick={() => removeItem(product.id)}
                    >
                      x
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="purchase">
          <h2>KOPĀ</h2>
          <hr />
          <div className="purchaseInformation">
            <div>
              <form ref={form} onSubmit={sendEmail}>
                <label>Piegāde:</label>
                <br />
                <label htmlFor="Omniva">Omniva: $3 </label>
                <input
                  type="radio"
                  id="Omniva"
                  name="piegadesVeids"
                  value="Omniva: $3"
                />
                <br />
                <label htmlFor="tikšanās">Norunāta tikšanās </label>
                <input
                  id="tikšanās"
                  type="radio"
                  name="piegadesVeids"
                  value="norunāta tikšanās"
                />
                <br />
                <label>Vārds: </label>
                <input type="text" name="user_name" />
                <br />
                <label>Uzvārds: </label>
                <input type="text" name="user_surname" />
                <br />
                <label>E-pasts: </label>
                <input type="email" name="user_email" />
                <br />
                <h3>Summa: ${totalRef.current}</h3>
                <ReCAPTCHA
                  sitekey="6LcspA0gAAAAAG6lek4EtSN8coOxn2ScXJr3L4Oi"
                  onChange={Captcha}
                />
                <input type="submit" value="Noformēt pirkumu" />
                {productList?.map((product) => {
                  return (
                    <div style={{ display: "none" }}>
                      <input
                        name="product_nosaukums"
                        value={`
                          <div style="border: solid gray">
                            <span>${product.nosaukums}</span>
                            <span>$${product.cena}</span?
                          </div>
                        `}
                      />
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer id="footer">
        <a
          href="https://www.facebook.com/profile.php?id=100080978261047"
          className="fa fa-facebook"
        ></a>
        <a
          href="https://instagram.com/_zipkre_smu_?igshid=YmMyMTA2M2Y="
          className="fa fa-instagram"
        ></a>
      </footer>
    </>
  );
};

export default CartPage;
