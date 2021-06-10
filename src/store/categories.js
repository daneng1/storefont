import superagent from 'superagent';

let list = [];

const api = 'https://danengel-api-server.herokuapp.com/category';

export default function categoryReducer (state = list, action) {
  let { type, payload } = action;

  switch(type) {
    case 'SELECT_CATEGORY':
      let activeCat = state.map((cat) => {
        if (cat.name === payload) {
          return {...cat, active: true};
        } else {
          return {...cat, active: false}
        }
      });
        return activeCat;

    case 'RESET':
      return state.map((cat) => {
        return {...cat, active:false}
      });

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

export const getCategory = data => {
  return {
    type: 'GET',
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

export const putRemoteCategory = (data) => dispatch => {
  return superagent.put(`${api/data._id}`).send(data)
  .then(response => {
    console.log('data', response.body);
    dispatch(selectCat(response.body))
  })
}

export const resetRemoteCategory = (data) => dispatch => {
  return superagent.put(`${api/data._id}`).send(data)
  .then(response => {
    console.log('data', response.body);
    dispatch(reset(response.body))
  })
}