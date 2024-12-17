export default function Item({ name, price, descr, image }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{descr}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button">Добавить в корзину</button>
        </p>
      </article>
    </li>
  );
}
