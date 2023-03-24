import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";

const Cart = props => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);

  const removeCartItemHandler = id => {
    cartContext.removeItem(id);
  }

  const addCartItemHandler = item => {
    cartContext.addItem({...item, amount: 1});
  }

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  }

  const submitOrderHandler = userData =>  {
    const endPoint = "https://sushi-delivery-30647-default-rtdb.firebaseio.com/orders.json";
    console.log("fetch");
    fetch(endPoint, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedMeals: cartContext.items
      })
    }).catch(e => console.log(e.message()));
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
        )
      )}
    </ul>
    );

  const modalButton = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>close</button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>order</button>}
    </div>
  )

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>total</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable
        ? <SubmitOrder onSubmit={submitOrderHandler} onCancel={props.onHideCart}/>
        : modalButton}
    </Modal>
  )
}

export default Cart;
