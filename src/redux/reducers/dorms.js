import * as types from './../types';
import apiUrl from '../../utils/apiUrl'
const initialState = {
  loading: false,
  data: [],
  error: null
}

export default function dorms(state = initialState, action) {
  switch (action.type) {
    case types.GET_DORMS:
      return {
        ...state,
        loading: true,      
      };
    case types.GET_DORMS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: action.payload.data.map((i) => (
          {
            ...i,
            region : {
              latitude : parseFloat(i.lat),
              longitude : parseFloat(i.long)
            },
            roomSize : {
              width : i.width,
              length : i.length,
            },
            image : i.image.map((i) => (`${apiUrl()}public/images/${i}`))

            
          }
        ))
      };
    case types.GET_DORMS_REJECTED:
      return {
        ...state,
        loading: false,
        error: payload.message
      };

    case types.ADD_DORM:
      return {
        ...state,
        loading: true
      };
    case types.ADD_DORM_FULFILLED:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_DORM_REJECTED:
      return {
        ...state,
        loading: false,
        error: payload.message
      };
    default:
      return state
  }
}