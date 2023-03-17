import styles from "./Cart.module.css"
import Modal from "../UI/Modal";

const Cart = props => {
  const cartItems = (
    <ul className={styles['cart-items']}>
      {[{ id : "m1", name : "Sushi", amount : 2, price : 10.99 }].map((item) => (
        <li>{item.name}</li>
        )
      )}
    </ul>
    );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>total</span>
        <span>49.99</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>close</button>
        <button className={styles.button}>order</button>
      </div>
    </Modal>
  )
}

export default Cart;
