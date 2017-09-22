import {ADD_GAME, REMOVE_GAME, GET_USER_GAMES, COMPLETE_TRADE, CLEAR_USER_GAMES} from '../constants/actionTypes';

export const gameReducer = (state = {games: []}, action) => {
  switch (action.type) {
    case ADD_GAME:
      // payload is the added game
      return {games: [...state.games, ...action.payload]};
    case REMOVE_GAME:
      return {games: [...action.payload]};
    case GET_USER_GAMES:
      // payload is collection of games retrieved from db
      return {games: [...action.payload]};
    case COMPLETE_TRADE:
      // payload is collection of games retrieved from db
      return {games: [...action.payload]};
    case CLEAR_USER_GAMES:
      // payload is empty set
      return {games: []};
    default:
      return state;
  }
};
