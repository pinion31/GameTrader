import {ADD_GAME} from '../constants/actionTypes';
import {addGame} from '../actions/gameActions';

//******* ADD GAME ****//
export const gameReducer = (state={games:{}}, action) => {
  switch (action.type) {
    case ADD_GAME:
      var newGames = state.games === {}?[...action.payload]:[...state.games, ...action.payload];
      return {games:newGames};
      //return {games:[...state.games, ...action.payload]};
      //return {games:[{name:'test'}]};
    default:
      return {games:[state.games]};
  }
};
