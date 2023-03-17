import CardContext from "./cart-context"
import {useReducer} from "react";

const defaultCardState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const existingCardItemIndex = state.items.findIndex(item => {
      return item.id === action.item.id;
    });

    const existingCardItem = state.items[existingCardItemIndex];

    let updatedItem;
    let updatedItems;

    if (existingCardItem) {
      updatedItem = {
        ...existingCardItem,
        amount: existingCardItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem
    } else {
      updatedItem = {
        ...action.item
      }
      updatedItems = state.items.concat(updatedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => {
      return item.id === action.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...existingCartItem, amount: existingCartItem.amount -1}
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

  }
  return defaultCardState;
};

const CartContextProvider = props => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCardState);

  const addItemHandler = item => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item
    });
  };

  const removeItemHandler = id => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  )
};

export default CartContextProvider;
