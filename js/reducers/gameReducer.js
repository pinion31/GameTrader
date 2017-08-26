import {ADD_GAME, REMOVE_GAME, GET_USER_GAMES} from '../constants/actionTypes';

export const gameReducer = (state={games:[]}, action) => {
  switch (action.type) {
    case ADD_GAME:
      // payload is the added game
      return {games:[...state.games, ...action.payload]};
    case REMOVE_GAME:
      let gameCollection = Array.from(state.games).filter(game => {
        if (action.payload.id != game.id) {
          return game;
        }
      });
      return {games:gameCollection};
    case GET_USER_GAMES:
      // payload is collection of games retrieved from db
      return {games:[...action.payload]};
    default:
      return state;
  }
};
