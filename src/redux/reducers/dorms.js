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
        data: action.payload.data.data.map((i) => (
          {
            ...i,
            region : {
              latitude :parseFloat(i.region.split(', ')[0]),
              longitude :parseFloat(i.region.split(', ')[1]),
            },
            roomSize : {
              width : i.roomWidth,
              length : i.roomLength,
            },
            facilities : i.facilities.split(', ').map((i) => (i) ),
            images : i.images.split(', ').map((i) => (`${apiUrl()}/${i}`) ),
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