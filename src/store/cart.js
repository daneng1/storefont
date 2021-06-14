let initialState = {
  items: [], 
  cartCount: 0
}

export default function cartReducer (state = initialState, action) {
  let { type, payload } = action;

  switch(type) {
    case 'ADD_TO_CART':
      return {items:[...state.items, payload], cartCount: state.cartCount + 1};
    
    case 'REMOVE_FROM_CART':
      let newItems = state.items.filter(item => item !== payload)
      return {...state, items: newItems, cartCount: state.cartCount - 1};
      
    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export const addItem = (name) => {
  return {
    type: 'ADD_TO_CART',
    payload: name
  }
}

export const deleteItem = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item
  }
}

export const resetCart = () => {
  return {
    type: "RESET_CART"
  }
}
