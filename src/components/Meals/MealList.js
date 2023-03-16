
import styles from "./MealList.module.css"

const DUMMY_MEALS = [
  {
    id: "m1",
    name: 'Roll "Naomi"',
    description:
      "Philadelphia cheese, chicken fillet, masago, tomato, cucumber, sesame",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Spice in salmon",
    description: "Rice, salmon, spicy sauce",
    price: 3.99
  },
  {
    id: "m3",
    name: "Eel Sushi",
    description: "Smoked eel, unagi sauce, sesame",
    price: 4.99
  },
  {
    id: "m4",
    name: 'Salad "Poke with salmon"',
    description:
      "Rice, salmon, cucumber, chuka, nori, tuna shavings, walnut sauce",
    price: 7.99
  },
];

const MealList = () => {


  const mealsList = DUMMY_MEALS.map(meal =>
    <li>{meal.name}</li>
  )

  return (
    <section className={styles.meals}>
      <ul>
        {mealsList}
      </ul>
    </section>
  )
}

export default MealList;