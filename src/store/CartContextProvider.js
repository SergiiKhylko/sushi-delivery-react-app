import CardContext from "./cart-context"

const CartContextProvider = props => {

  const addItemHandler = item => {

  }

  const removeItemHandler = id => {

  }

  const cardContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  }

  return (
    <CardContext.Provider value={cardContext}>
      {props.children}
    </CardContext.Provider>
  )
}

export default CartContextProvider;