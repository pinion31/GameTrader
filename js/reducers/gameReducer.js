import {ADD_GAME} from '../constants/actionTypes';
import {addGame} from '../actions/gameActions';

//******* ADD GAME ****//
export const gameReducer = (state={games:[]}, action) => {
  switch (action.type) {
    case ADD_GAME:
      let gamesList = state.games.concat(action.payload);
      return {games:gamesList};
      //return {games:[{name:'test'}]};
    default:
      return {games:[state.games]};
  }
};




