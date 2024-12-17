import { useEffect, useState } from "react";
import Item from "./Item";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setLoadedMeals(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Item
          key={meal.id}
          name={meal.name}
          price={meal.price}
          descr={meal.description}
          image={meal.image}
        />
      ))}
    </ul>
  );
}
