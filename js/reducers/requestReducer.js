import {ADD_REQUEST, REMOVE_REQUEST} from '../constants/actionTypes';

// ******* ADD REQUEST ****//
export const requestReducer = (state={requests:[]}, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {requests:[...state.requests,...action.payload]};
    case REMOVE_REQUEST:
      let remainingRequests = Array.from(state.requests).filter(request => {
        if (request.requestedGame.id != action.payload.requestToRemove.id) {
          return request;
        }
      });
      return {requests:remainingRequests};
    default:
      return state;
  }
};
