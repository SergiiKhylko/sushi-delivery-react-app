import styles from "./MealItemForm.module.css"
import Input from "../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = props => {

  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = event => {
    event.preventDefault();

    const inputAmount = amountInputRef.current.value;

    if (inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
      setIsAmountValid(false);
      return;

    }
    props.onAddToCard(+inputAmount);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id : props.id,
          type : 'number',
          min : '1',
          step : '1',
          defaultValue : '1'
      }}/>
      <button>Add</button>
      {!isAmountValid && <p>Enter valid amount from 1 to 10</p>}
    </form>
  )
}

export default MealItemForm;
