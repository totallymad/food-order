import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgresContext from "../store/UserProgresContext";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgresContext);

  const cartTotal = cartContext.items.reduce((total, item) => {
    total + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgresCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal open={userProgresCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Оформление</h2>
        <p>Полная стоимость: {cartTotal}</p>

        <Input label="Полное имя" type="text" id="name" />
        <Input label="Электронная почта" type="email" id="email" />
        <Input label="Улица" type="text" id="street" />
        <div className="control-row">
          <Input label="Почтовый индекс" type="text" id="postal-code" />
          <Input label="Город" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <button onClick={handleClose} type="button" className="text-button">
            Закрыть
          </button>
          <button className="button">Потвердить заказ</button>
        </p>
      </form>
    </Modal>
  );
}
