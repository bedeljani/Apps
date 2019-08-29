import axios from 'axios';
import * as types from './../types';

import apiUrl from '../../utils/apiUrl'
export const getDorms = () => ({
  type: "GET_DORMS",
  payload: axios.get(`${apiUrl()}dorms`)
  // payload: axios({
  //   method: 'GET',
  //   url: `${apiUrl()}dorms`
//  })
})

// export const addDorm = (value, token) => ({
//     type: types.ADD_DORM,
//     payload: axios.post(`${apiUrl()}/kosts`, value, {
//       headers: { Authorization: "Bearer " + token, 'Content-Type' : 'multipart/form-data' }
//   })
//   })

// export const updateDorm = (value, id) => ({
//     type: types.UPDATE_DORM,
//     payload: axios({
//         method: 'PATCH',
//         url: `https://reqres.in/api/user/${id}`,
//         data : {
//             value
//         }
        
//       })
// });

// export const removeDorm =  id => ({
//     type: types.REMOVE_DORM,
//     payload: axios({
//         method: 'DELETE',
//         url: `https://reqres.in/api/user/${id}`,
//       })
// });
