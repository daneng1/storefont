let initialState = {
  items: [], 
  cartCount: 0
}

export default function cartReducer (state = initialState, action) {
  let { type, payload } = action;

  switch(type) {
    case 'ADD':
      return {items:[...state.items, payload], cartCount: state.cartCount + 1};
    
    case 'REMOVE':
      console.log(payload);
      return {items: [...state.items.slice(payload)], cartCount: state.cartCount -1};
      
    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export const addItem = (name) => {
  return {
    type: 'ADD',
    payload: name
  }
}

export const deleteItem = (item) => {
  return {
    type: 'REMOVE',
    payload: item
  }
}

export const resetCart = () => {
  return {
    type: "RESET_CART"
  }
}
