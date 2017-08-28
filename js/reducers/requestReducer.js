import {ADD_REQUEST, REMOVE_REQUEST, GET_USER_REQUESTS, DECLINE_TRADE} from '../constants/actionTypes';

// ******* ADD REQUEST ****//
export const requestReducer = (state = {requests: []}, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {requests: [...state.requests, ...action.payload]};
    case REMOVE_REQUEST:
      return {requests: [...action.payload]};
    case GET_USER_REQUESTS:
      return {requests: [...action.payload]};
    case DECLINE_TRADE:
      return {requests: [...action.payload]};
    default:
      return state;
  }
};
