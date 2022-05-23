import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import CartPage from "./cartPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basemname={`/${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route exact path="/zipkre/" element={<HomePage />} />
        <Route path="zipkre/cart/" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
