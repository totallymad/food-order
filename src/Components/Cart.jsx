import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgresContext from "../store/UserProgresContext";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgresContext);

  const cartTotal = cartContext.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgresCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgresCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <li key={item.id}>
            {item.name} --- {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        {" "}
        <button onClick={handleCloseCart} className="button">
          Закрыть
        </button>
        <button onClick={handleCloseCart} className="button">
          Продолжить оформление
        </button>
      </p>
    </Modal>
  );
}
