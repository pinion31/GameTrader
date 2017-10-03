import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {ADD_GAME, REMOVE_GAME,
  GET_USER_GAMES, COMPLETE_TRADE, CLEAR_USER_GAMES} from '../js/constants/actionTypes';

import {initialState, addedGame, Fallout4, Mario2} from '../__mockData__/mockData';
import {addGame, getUserGames, removeGame, clearUserGames, completeTrade} from '../js/actions/gameActions';


const mock = new MockAdapter(axios, {delayResponse: 0});

mock.onGet('/games/getUserGames').reply(200, initialState);
mock.onPost('/games/addGame').reply(200, addedGame);
mock.onPost('/games/removeGame').reply(200, Mario2);
mock.onPost('/trades/completeTrade').reply(200, Fallout4);

let dispatchedAction;

const logger = (returnedAction) => {
  dispatchedAction = returnedAction;
};

describe('Get User Games', () => {
  beforeEach((done) => {
    getUserGames() (logger);
    setTimeout(done);
  });

  it('retrieves user games', () => {
    expect(dispatchedAction.type).toEqual(GET_USER_GAMES);
    expect(dispatchedAction.payload).toEqual(initialState);
  });
});

describe('Add Game', () => {
  beforeEach((done) => {
    addGame(addedGame) (logger);
    setTimeout(done);
  });

  it('adds game', () => {
    expect(dispatchedAction.type).toEqual(ADD_GAME);
    expect(dispatchedAction.payload).toEqual(addedGame);
  });
});

describe('Remove Game', () => {
  beforeEach((done) => {
    removeGame(Fallout4) (logger);
    setTimeout(done);
  });

  it('removes game', () => {
    expect(dispatchedAction.type).toEqual(REMOVE_GAME);
    expect(dispatchedAction.payload).toEqual(Mario2);
  });
});

describe('Clear User Games', () => {
  let clearedGameAction;

  beforeEach(() => {
    clearedGameAction = clearUserGames();
  });

  it('clears user games', () => {
    expect(clearedGameAction.type).toEqual(CLEAR_USER_GAMES);
    expect(clearedGameAction.payload).toEqual([]);
  });
});

describe('Complete Trade', () => {
  beforeEach((done) => {
    completeTrade() (logger);
    setTimeout(done);
  });

  it('completes the trade', () => {
    expect(dispatchedAction.type).toEqual(COMPLETE_TRADE);
    expect(dispatchedAction.payload).toEqual(Fallout4);
  });
});