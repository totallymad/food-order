import Error from "./Error";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Загрузка...</p>;
  }

  if (error) {
    return <Error title="Ошибка при загрузке" message={error} />;
  }

  // if (!loadedMeals) {
  //   return <p>Не найдено </p>
  // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
