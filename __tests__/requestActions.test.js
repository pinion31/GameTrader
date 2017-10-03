import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {testRequest, storedRequest} from '../__mockData__/mockData';
import {addRequest, removeRequest, declineTrade, getUserRequests, clearUserRequests} from '../js/actions/requestActions';
import {GET_USER_REQUESTS, CLEAR_USER_REQUESTS,
  ADD_REQUEST, REMOVE_REQUEST, DECLINE_TRADE} from '../js/constants/actionTypes';

const mock = new MockAdapter(axios, {delayResponse: 0});

mock.onGet('/requests/getUserRequests').reply(200, [testRequest, storedRequest]);
mock.onPost('/requests/addRequest').reply(200, testRequest);
mock.onPost('/requests/removeRequest').reply(200, storedRequest);
mock.onPost('/trades/declineTrade').reply(200, testRequest);

let dispatchedAction;

const logger = (returnedAction) => {
  dispatchedAction = returnedAction;
};

describe('Add Request', () => {
  beforeEach((done) => {
    addRequest() (logger);
    setTimeout(done);
  });

  it('adds a request', () => {
    expect(dispatchedAction.type).toEqual(ADD_REQUEST);
    expect(dispatchedAction.payload).toEqual(testRequest);
  });

});

describe('Remove Request', () => {
  beforeEach((done) => {
    removeRequest() (logger);
    setTimeout(done);
  });

  it('removes a request', () => {
    expect(dispatchedAction.type).toEqual(REMOVE_REQUEST);
    expect(dispatchedAction.payload).toEqual(storedRequest);
  });

});

describe('Get User Requests', () => {
  beforeEach((done) => {
    getUserRequests() (logger);
    setTimeout(done);
  });

  it('gets user requests', () => {
    expect(dispatchedAction.type).toEqual(GET_USER_REQUESTS);
    expect(dispatchedAction.payload).toEqual([testRequest,storedRequest]);
  });

});

describe('Decline Trade', () => {
  beforeEach((done) => {
    declineTrade() (logger);
    setTimeout(done);
  });

  it('declines trade', () => {
    expect(dispatchedAction.type).toEqual(DECLINE_TRADE);
    expect(dispatchedAction.payload).toEqual(testRequest);
  });

});

describe('Clear User Requests', () => {
  let clearUserRequestAction;

  beforeEach(() => {
    clearUserRequestAction = clearUserRequests();
  });

  it('clears user requests', () => {
    expect(clearUserRequestAction.type).toEqual(CLEAR_USER_REQUESTS);
    expect(clearUserRequestAction.payload).toEqual([]);
  });

});