import rootReducer from '../js/reducers/rootReducer';
import {Skyrim, Fallout4, testRequest, storedRequest} from '../__mockData__/mockData';
import {ADD_GAME, REMOVE_GAME, GET_USER_GAMES, COMPLETE_TRADE, CLEAR_USER_GAMES,
ADD_REQUEST, REMOVE_REQUEST, GET_USER_REQUESTS, DECLINE_TRADE, CLEAR_USER_REQUESTS} from '../js/constants/actionTypes';



describe('root reducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer({}, {})).toEqual({games: {games: []}, requests: {requests: []}});
  });

  describe('gameReducer', () => {
    it('adds Game to empty state', () => {
      expect(rootReducer({games: {games: []}}, {type: ADD_GAME, payload: Skyrim})).toEqual({games: {games: [Skyrim]}, requests: {requests: []}});
    });

    it('adds Game to non-empty state', () => {
      expect(rootReducer({games: {games: [Fallout4]}}, {type: ADD_GAME, payload: Skyrim})).toEqual({games: {games: [Fallout4, Skyrim]}, requests: {requests: []}});
    });

    it('removes Game from state', () => {
      expect(rootReducer({games: {games: [Skyrim, Fallout4]}}, {type: REMOVE_GAME, payload: Skyrim})).toEqual({games: {games: [Skyrim]}, requests: {requests: []}});
    });

    it('completes trade', () => {
      expect(rootReducer({games: {games: []}}, {type: COMPLETE_TRADE, payload: [Skyrim]})).toEqual({games: {games: [Skyrim]}, requests: {requests: []}});
    });

    it('retrieves user games from state', () => {
      expect(rootReducer({games: {games: []}}, {type: GET_USER_GAMES, payload: [Skyrim, Fallout4]})).toEqual({games: {games: [Skyrim, Fallout4]}, requests: {requests: []}});
    });

    it('clears user games', () => {
      expect(rootReducer({games: {games: [Skyrim, Fallout4]}}, {type: CLEAR_USER_GAMES, payload: {}})).toEqual({games: {games: []}, requests: {requests: []}});
    });
  });

  describe('requestReducer', () => {
    it('adds request to empty state', () => {
      expect(rootReducer({requests: {requests: []}}, {type: ADD_REQUEST, payload: testRequest})).toEqual({games: {games: []}, requests: {requests: [testRequest]}});
    });

    it('adds request to non-empty state', () => {
      expect(rootReducer({requests: {requests: [storedRequest]}}, {type: ADD_REQUEST, payload: testRequest})).toEqual({games: {games: []}, requests: {requests: [storedRequest, testRequest]}});
    });

    it('removes request from state', () => {
      expect(rootReducer({requests: {requests: [storedRequest, testRequest]}}, {type: REMOVE_REQUEST, payload: testRequest})).toEqual({games: {games: []}, requests: {requests: [testRequest]}});
    });

    it('declines trade', () => {
      expect(rootReducer({requests: {requests: []}}, {type: DECLINE_TRADE, payload: testRequest})).toEqual({games: {games: []}, requests: {requests: [testRequest]}});
    });

    it('retrieves requests from state', () => {
      expect(rootReducer({requests: {requests: []}}, {type: GET_USER_REQUESTS, payload: [storedRequest, testRequest]})).toEqual({games: {games: []}, requests: {requests: [storedRequest, testRequest]}});
    });

    it('clears user requests', () => {
      expect(rootReducer({requests: {requests: [storedRequest, testRequest]}}, {type: CLEAR_USER_REQUESTS, payload: {}})).toEqual({games: {games: []}, requests: {requests: []}});
    });
  });
});
