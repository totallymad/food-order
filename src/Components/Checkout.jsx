import { useContext } from "react";
import { useActionState } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgresContext from "../store/UserProgresContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgresContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartContext.items.reduce((total, item) => {
    total + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgresCtx.hideCheckout();
  }

  function handleFinish() {
    userProgresCtx.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <button onClick={handleClose} type="button" className="text-button">
        Закрыть
      </button>
      <button className="button">Потвердить заказ</button>
    </>
  );

  if (pending) {
    actions = <span>Отправка данных...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgresCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Успешно!</h2>
        <p>Ваш заказ был принят успешно</p>
        <p>
          Мы сообщим подробности по электронной почте в течение нескольких минут
          😊😊😊{" "}
        </p>
        <p className="modal-actions">
          <button onClick={handleFinish} className="button">
            Окей!
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgresCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Оформление</h2>
        <p>Полная стоимость: {cartTotal}</p>

        <Input label="Полное имя" type="text" id="name" />
        <Input label="Электронная почта" type="email" id="email" />
        <Input label="Улица" type="text" id="street" />
        <div className="control-row">
          <Input label="Почтовый индекс" type="text" id="postal-code" />
          <Input label="Город" type="text" id="city" />
        </div>

        {error && <Error title="Ошибка при отправке" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
