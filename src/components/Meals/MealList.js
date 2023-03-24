import styles from "./MealList.module.css"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState();

  useEffect( () => {

    const fetchMeals = async () => {
      setIsLoading(true);

      const endPoint = "https://sushi-delivery-30647-default-rtdb.firebaseio.com/meals.json";
      const response = await fetch(endPoint);

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const responseJson = await response.json();
      const loadedMeals = [];

      for (const key in responseJson) {
        loadedMeals.push({
          id: key,
          name: responseJson[key].name,
          description: responseJson[key].description,
          price: responseJson[key].price,
        });
      }
      setMeals(loadedMeals);

      setIsLoading(false);
    };

    fetchMeals().then(() => console.log("fetchMeals is complete")).catch(err => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    });

  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Fetching data from server...</p>
      </section>
    )
  }

  if (httpErrorMessage) {
    return (
      <section className={styles.error}>
        <p>{httpErrorMessage}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal =>
    <MealItem key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}/>
  )

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}

export default MealList;
