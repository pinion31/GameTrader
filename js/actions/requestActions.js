'use strict'

import axios from 'axios';

export const addRequest = request => (
  (dispatch) => {
    axios.post('/addRequest', request)
      .then((res) => {
        dispatch({type: 'ADD_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const removeRequest = request => (
  (dispatch) => {
    axios.post('/removeRequest', request)
      .then((res) => {
        dispatch({type: 'REMOVE_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }

);

export const declineTrade = request => (
  (dispatch) => {
    console.dir(request);
    axios.post('/declineTrade', request)
      .then((res) => {
        console.dir(res.data);
        dispatch({type: 'DECLINE_TRADE', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
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
