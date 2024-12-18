import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartContextProvider } from "./store/CartContext";
import { UserProgresContextProvider } from "./store/UserProgresContext";

function App() {
  return (
    <UserProgresContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgresContextProvider>
  );
}

export default App;
