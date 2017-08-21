import {ADD_REQUEST, REMOVE_REQUEST} from '../constants/actionTypes';

// ******* ADD REQUEST ****//
export const requestReducer = (state={requests:[]}, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {requests:[...state.requests,...action.payload]};
    case REMOVE_REQUEST:
      let remainingRequests = Array.from(state.requests);

      remainingRequests = remainingRequests.filter(request => {
        if (request.requestedGame != action.payload.requestToRemove) {
          return request;
        }
      });

      //if (remainingRequests[0].status === undefined) {return{requests:[]}};


      return {requests:[remainingRequests]};
    default:
      return state;
  }
};
