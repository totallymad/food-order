import { useState } from "react";
import logo from "../assets/logo.jpg";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  function handleShowingModal() {
    setShowModal((prevState) => !prevState);
    console.log("show");
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Логотип" />
        <h1>reactfood</h1>
      </div>
      <nav>
        <button className="button" onClick={handleShowingModal}>
          Cart (0)
        </button>
      </nav>
      {showModal && <div className="modal">Modal</div>}
    </header>
  );
}
