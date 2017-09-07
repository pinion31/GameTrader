import {combineReducers} from 'redux';
import {gameReducer} from './gameReducer';
import {requestReducer} from './requestReducer';

export default combineReducers({games: gameReducer, requests: requestReducer});
