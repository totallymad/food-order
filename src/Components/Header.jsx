import { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgresContext from "../store/UserProgresContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgresContext);

  const totalCartItems = cartContext.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgresCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Логотип" />
        <h1>reactfood</h1>
      </div>
      <nav>
        <button className="button" onClick={handleShowCart}>
          Корзина ({totalCartItems})
        </button>
      </nav>
    </header>
  );
}
