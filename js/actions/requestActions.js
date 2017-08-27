'use strict'

import axios from 'axios';

export const addRequest = request => (
  (dispatch) => {
    console.dir(request);
    axios.post('/addRequest', request)
      .then((res) => {
        dispatch({type: 'ADD_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }

  /*
  {
    type: 'ADD_REQUEST',
    payload: request
  }*/
);

export const removeRequest = request => (
  (dispatch) => {
    axios.post('/removeRequest', request)
      .then((res) => {
        dispatch({type: 'REMOVE_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      })
  }
/*
  {
    type: 'REMOVE_REQUEST',
    payload: request
  }*/
);

export const getUserRequests = () => (
  (dispatch) => {
    axios.get('/getUserRequests')
      .then((res) => {
        dispatch({type: 'GET_USER_REQUESTS', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
