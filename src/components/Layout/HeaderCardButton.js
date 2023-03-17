import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css"
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCardButton = props => {

  const cartContext = useContext(CartContext);
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);

  const cartItemsNumber = cartContext.items.reduce(
    (current, item) => {
      return current + item.amount;
    }, 0);

  const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ""}`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }

    setIsButtonAnimated(true);

    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={styles.icon}><CartIcon /></span>
      <span>{props.text}</span>
      <span className={styles.badge}>
        {cartItemsNumber}
      </span>

    </button>
  )
}

export default HeaderCardButton;
