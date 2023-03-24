import styles from "./SubmitOrder.module.css";
import {useRef, useState} from "react";

const SubmitOrder = (props) => {

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const isInputValid = (inputValue) => inputValue.trim() !== "";
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    address: true
  });

  const confirmOrderHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const isEnteredNameValid = isInputValid(enteredName);
    const isEnteredCityValid = isInputValid(enteredCity);
    const isEnteredAddressValid = isInputValid(enteredAddress);

    setFormValidity({
      name: isEnteredNameValid,
      city: isEnteredCityValid,
      address: isEnteredAddressValid
    })

    const isFormValid = isEnteredNameValid && isEnteredCityValid && isEnteredAddressValid;

    if (!isFormValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress
    });
  };

  const nameInputClasses = `${styles.control} ${formValidity.name ? "" : styles.invalid}`;
  const cityInputClasses = `${styles.control} ${formValidity.city ? "" : styles.invalid}`;
  const addressInputClasses = `${styles.control} ${formValidity.address ? "" : styles.invalid}`;

  return (
    <form onSubmit={confirmOrderHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Enter the name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
        />
        {!formValidity.name && <p>Name is required</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">Enter the city</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
        />
        {!formValidity.city && <p>City is required</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Enter the address</label>
        <input
          type="text"
          id="address"
          ref={addressInputRef}
        />
        {!formValidity.address && <p>Address is required</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Submit order</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SubmitOrder;