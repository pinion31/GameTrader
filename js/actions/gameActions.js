'use strict'

import axios from 'axios';

export const addGame = game => (
  (dispatch) => {
    axios.post('/addGame', game)
      .then((res) => {
        dispatch({type: 'ADD_GAME', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const removeGame = game => (
  {
    type: 'REMOVE_GAME',
    payload: game
  }
);

export const getUserGames = () => (
  (dispatch) => {
    axios.get('/getUserGames/chris')
      .then((res) => {
        dispatch({type: 'GET_USER_GAMES', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const getAllGames = () => (
  (dispatch) => {
    axios.get('/getAllGames')
      .then((res) => {
        dispatch({type: 'GET_ALL_GAMES', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
