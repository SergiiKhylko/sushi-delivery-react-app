import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css"
import {useContext} from "react";
import CartContext from "../../store/cart-context";

const HeaderCardButton = props => {

  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce(
    (current, item) => {
      return current + item.amount;
    }, 0);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}><CartIcon /></span>
      <span>{props.text}</span>
      <span className={styles.badge}>
        {cartItemsNumber}
      </span>

    </button>
  )
}

export default HeaderCardButton;
