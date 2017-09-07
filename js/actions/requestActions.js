import axios from 'axios';

export const addRequest = request => (
  (dispatch) => {
    axios.post('/requests/addRequest', request)
      .then((res) => {
        dispatch({type: 'ADD_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const removeRequest = request => (
  (dispatch) => {
    axios.post('/requests/removeRequest', request)
      .then((res) => {
        dispatch({type: 'REMOVE_REQUEST', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const declineTrade = request => (
  (dispatch) => {
    axios.post('/trades/declineTrade', request)
      .then((res) => {
        dispatch({type: 'DECLINE_TRADE', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const getUserRequests = () => (
  (dispatch) => {
    axios.get('/requests/getUserRequests')
      .then((res) => {
        dispatch({type: 'GET_USER_REQUESTS', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
