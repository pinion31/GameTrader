'use strict'

import axios from 'axios';

export const addGame = game => (
  (dispatch) => {
    axios.post('/games/addGame', game)
      .then((res) => {
        dispatch({type: 'ADD_GAME', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const removeGame = game => (
  (dispatch) => {
    axios.post('/games/removeGame', game)
      .then((res) => {
        dispatch({type: 'REMOVE_GAME', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const getUserGames = () => (
  (dispatch) => {
    axios.get('/games/getUserGames')
      .then((res) => {
        dispatch({type: 'GET_USER_GAMES', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const completeTrade = (request) => (
  (dispatch) => {
    axios.post('/trades/completeTrade', request)
      .then((res) => {
        dispatch({type: 'COMPLETE_TRADE', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
