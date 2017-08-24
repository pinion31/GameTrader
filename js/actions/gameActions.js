'use strict'

import axios from 'axios';

export const addGame = game => {
  return (dispatch) => {
    axios.post('/addGame', game)
      .then(res => {
        dispatch({type:'ADD_GAME', payload: res.data});
      })
      .catch(err => {
        console.log('error dispatching');
        throw err;
      });
  }

/*
  return {
    type: 'ADD_GAME',
    payload: game
  }*/
};

export const removeGame = game => (
  {
    type: 'REMOVE_GAME',
    payload: game
  }
);
