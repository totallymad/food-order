import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // Обработка действия добавления элемента в корзину
  if (action.type === "ADD_ITEM") {
    // Находим индекс элемента в корзине, который совпадает с добавляемым элементом
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Создаем копию массива items, чтобы не мутировать исходный массив
    const updatedItems = [...state.items];

    if (exisitngCartItemIndex > -1) {
      // Если элемент уже существует в корзине
      const existingItem = state.items[exisitngCartItemIndex]; // Получаем существующий элемент
      const updatedItem = {
        ...existingItem, // Копируем свойства существующего элемента
        quantity: existingItem.quantity + 1, // Увеличиваем количество на 1
      };
      updatedItems[exisitngCartItemIndex] = updatedItem; // Обновляем элемент в массиве items
    } else {
      // Если элемент отсутствует в корзине
      updatedItems.push({ ...action.item, quantity: 1 }); // Добавляем новый элемент с quantity = 1
    }

    // Возвращаем новый стейт с обновленным массивом items
    return { ...state, items: updatedItems };
  }

  // Обработка действия удаления элемента из корзины
  if (action.type === "DELETE_ITEM") {
    // Находим индекс элемента, который нужно удалить, по его id
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Получаем сам элемент из корзины
    const existingCartItem = state.items[exisitngCartItemIndex];

    // Создаем копию массива items, чтобы не мутировать исходный массив
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // Если количество товара равно 1
      updatedItems.splice(exisitngCartItemIndex, 1); // Удаляем элемент из массива
    } else {
      // Если количество товара больше 1
      const updatedItem = {
        ...existingCartItem, // Копируем свойства существующего элемента
        quantity: existingCartItem.quantity - 1, // Уменьшаем количество на 1
      };
      updatedItems[exisitngCartItemIndex] = updatedItem; // Обновляем элемент в массиве items
    }

    // Возвращаем новый стейт с обновленным массивом items
    return { ...state, items: updatedItems };
  }

  // Возвращаем текущий стейт, если тип действия не распознан
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCart({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatchCart({
      type: "DELETE_ITEM",
      id,
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext.items);

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
