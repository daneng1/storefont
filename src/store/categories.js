import superagent from 'superagent';

let list = {
  categories: [],
  active: 'all',
};

const api = 'https://danengel-api-server.herokuapp.com/category';

export default function categoryReducer (state = list, action) {
  let { type, payload } = action;

  switch(type) {
    case 'SELECT_CATEGORY':
      return { categories: state.categories, active: payload}

    case 'RESET':
      return { categories: state.categories, active: 'all'}

    case 'GET_CAT':
      return { categories: payload, active: state.active}

    default:
      return state;  
  }
}

export const selectCat = (name) => {
  console.log(name);
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

export const getCategory = data => {
  return {
    type: 'GET_CAT',
    payload: data
  }
}

export const getRemoteCategory = () => dispatch => {
  return superagent.get(api)
  .then(response => {
    console.log('data', response.body);
    dispatch(getCategory(response.body))
  })
}
