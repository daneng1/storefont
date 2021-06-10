import superagent from "superagent";

let list = [];

let api = 'https://danengel-api-server.herokuapp.com/product';

export default function productReducer(state = list, action) {
  let { type, payload } = action;

  switch (type) {

    case 'GET':
      return payload;
  
    case 'ACTIVE_CATEGORY':
      let items = state.map((item) => {
        let displayItems = Object.assign({}, item);
        if (item.category === payload) {
          displayItems.active = true;
          return displayItems;
        } else {
          displayItems.active = false;
          return displayItems;
        }
      });
      console.log(state)
      return items;

    case 'ADD_TO_CART':
      return state.map((item) => {
        if (item.name === payload.name) {
          return {
            category: item.category,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.img,
            inventory: item.inventory - 1,
          };
        }
        return item;
      });

    case 'REMOVE_FROM_CART':
      return state.map((item) => {
        if (item.name === payload.name) {
          return {
            category: item.category,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.img,
            inventory: item.inventory - 1,
          };
        }
        return item;
      });

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

export const getRemoteData = () => dispatch => {
  return superagent.get(api)
  .then(response => {
    console.log('data', response.body);
    dispatch(getAction(response.body))
  })
}

export const putRemoteData = (data) => dispatch => {
  return superagent.put(`${api}/${data._id}`).send(data)
    .then(response => {
      console.log(response.body);
      dispatch(addItem(response.body))
    }) 
}

export const removeRemoteData = (data) => dispatch => {
  return superagent.put(`${api}/${data._id}`).send(data)
    .then(response => {
      console.log(response.body);
      dispatch(deleteItem(response.body))
    }) 
}