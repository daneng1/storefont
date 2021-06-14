import superagent from "superagent";

let initialState= {
  list: [],
  filteredList: [],
  activeItem: null
}

let api = 'https://danengel-api-server.herokuapp.com/product';

export default function productReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {

    case 'GET':
      return {...state, list: payload};

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
    case 'SET_ACTIVE_ITEM':
      return {...state, activeItem: [payload] };

    case 'RESET_ACTIVE_ITEM':
      return {...state, activeItem: null }

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

export const productDetailPage = data => {
  return {
    type:'SET_ACTIVE_ITEM',
    payload: data
  }
}

export const removeActiveItem = data => {
  return {
    type:'RESET_ACTIVE_ITEM',
    payload: data
  }
}

export const getRemoteData = () => dispatch => {
  return superagent.get(api)
  .then(response => {
    dispatch(getAction(response.body))
  })
}
