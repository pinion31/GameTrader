import {ADD_GAME} from '../constants/actionTypes';
import {addGame} from '../actions/gameActions';

//******* ADD GAME ****//
export const gameReducer = (state={games:[]}, action) => {
  switch (action.type) {
    case ADD_GAME:
      console.log('adding game from reducer');
      return {games:[...state.games, ...action.payload]};
    default:
      return state;
  }
};
