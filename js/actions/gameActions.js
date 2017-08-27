'use strict'

import axios from 'axios';

export const addGame = game => (
  (dispatch) => {
    axios.post('/addGame/chris', game)
      .then((res) => {
        dispatch({type: 'ADD_GAME', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const removeGame = game => (
  (dispatch) => {
    axios.post('/removeGame/chris', game)
      .then((res) => {
        dispatch({type: 'REMOVE_GAME', payload: res.data});
      }).catch((err) => {
        throw err;
      });
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

/*
export const getAllGames = () => (
  (dispatch) => {
    axios.get('/getAllGames')
      .then((res) => {
        dispatch({type: 'GET_ALL_GAMES', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);*/

export const completeTrade = (request) => (
  (dispatch) => {
    axios.post('/completeTrade', request)
      .then((res) => {
        dispatch({type: 'COMPLETE_TRADE', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
