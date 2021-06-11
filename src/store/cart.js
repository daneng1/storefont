let initialState = {
  items: [], 
  cartCount: 0
}

export default function cartReducer (state = initialState, action) {
  let { type, payload } = action;

  switch(type) {
    case 'ADD_TO_CART':
      console.log(state);
      return {items:[...state.items, payload], cartCount: state.cartCount + 1};
    
    case 'REMOVE_FROM_CART':
      // let index = state.items.indexOf(payload);
      // TODO: Cart is removing all of a same item rather than just one. Maybe retool to add an item counter rather than more list items. 
      console.log(payload);
      let newItems = state.items.filter(item => item !== payload)
      return {...state, items: newItems, cartCount: state.cartCount - 1};
      
    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export const addItem = (name) => {
  console.log('inside cart', name);
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
