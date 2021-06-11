import superagent from "superagent";

let initialState= {
  list: [],
  filteredList: []
}

let api = 'https://danengel-api-server.herokuapp.com/product';

export default function productReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {

    case 'GET':
      return {...state, list: payload};
  
    case 'ACTIVE_CATEGORY':
      if (payload) {
        return { ...state, filteredList: [...state.products.filter(product => product.category === payload)] }
    }

    return { ...state, filteredList: [...state.list] };


    case 'ADD_TO_CART':
      return {...state, list: [...state.list.map(item => {
          if (item._id === payload._id) {
             item.inventory = item.inventory - 1}
             return item;
        })]
    }

    case 'REMOVE_FROM_CART':
      return {...state, list: [...state.list.map(item => {
        if (item._id === payload._id) {
           item.inventory = item.inventory + 1}
           return item;
      })]
  }

    case 'RESET':
      return state;

    default:
      return state;
  }
}

export const activeProd = (category) => {
  return {
    type: 'ACTIVE',
    payload: category,
  };
};

export const addItem = (item) => {
  console.log('inside products',item);
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item,
  };
};

export const getAction = data => {
  return {
    type: 'GET',
    payload: data
  }
}

export const getRemoteData = () => dispatch => {
  console.log('data');
  return superagent.get(api)
  .then(response => {
    dispatch(getAction(response.body))
  })
}

// export const putRemoteData = (data) => dispatch => {
//   return superagent.put(`${api}/${data._id}`).send(data)
//     .then(response => {
//       console.log(response.body);
//       dispatch(addItem(response.body))
//     }) 
// }

// export const removeRemoteData = (data) => dispatch => {
//   return superagent.put(`${api}/${data._id}`).send(data)
//     .then(response => {
//       console.log('data', response.body);
//       dispatch(deleteItem(response.body))
//     }) 
// }