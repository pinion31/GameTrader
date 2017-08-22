import {ADD_GAME, REMOVE_GAME} from '../constants/actionTypes';

export const gameReducer = (state={games:[]}, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {games:[...state.games, ...action.payload]};
    case REMOVE_GAME:
      let gameCollection = Array.from(state.games).filter(game => {
        if (action.payload.id != game.id) {
          return game;
        }
      });
      return {games:gameCollection};
    default:
      return state;
  }
};
