import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgresContext from "../store/UserProgresContext";
import CartItem from "./CartItem";
import { formatNumber } from "../utils/formatter";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgresContext);

  const cartTotal = cartContext.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgresCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgresCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgresCtx.progress === "cart"}
      onClose={userProgresCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Ваша корзина</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{formatNumber(cartTotal)}</p>
      <p className="modal-actions">
        {" "}
        <button onClick={handleCloseCart} className="text-button">
          Закрыть
        </button>
        {cartContext.items.length > 0 ? (
          <button onClick={handleGoToCheckout} className="button">
            Оформить
          </button>
        ) : null}
      </p>
    </Modal>
  );
}
