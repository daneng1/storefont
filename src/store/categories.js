let initialState = {
  categories: [
    {name: 'games', displayName: 'Games', description: 'Board games, lawn games and table games'},
    {name: 'kitchen', displayName: 'Kitchen', description: 'Small appliances, tableware and cookware'},
    {name: 'patio', displayName: 'Patio and Outdoor', description: 'Patio Furniture and '}
  ],
  activeCat: null,
}

export default function categoryReducer (state = initialState, action) {
  let { type, payload } = action;

  switch(type) {
    case 'SELECT_CATEGORY':
      let activeCat = payload;
        return { ...state, activeCat };

    case 'RESET':
      return initialState;

    default:
      return state;  
  }
}

export const selectCat = (name) => {
  return {
    type: 'SELECT_CATEGORY',
    payload: name
  }
}

export const reset = () => {
  return {
    type: "RESET"
  }
}
