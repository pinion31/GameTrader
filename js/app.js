import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import RoutedApp from './components/RoutedApp';
import rootReducer from './reducers/rootReducer';
import {BrowserRouter} from 'react-router-dom';
import {addGame} from './actions/gameActions';

//import '../sass/style.scss';

const middleware = applyMiddleware(logger);
const store = createStore(rootReducer, middleware);

//initial State
/*
user : {id: {}, password:{}, sessionId:{}, games:{}, offers:{}, }

game = {id:"", name:"",description:""};

*/

//store.dispatch(addGame({games:{{name:'Left For Dead', id:''}, {name:'Skyrim', id:''}}}));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

store.dispatch(addGame([
  {
    name: 'Left For Dead',
    id: 'Left For Dead',
    description: 'this is a game'},
  {
    name: 'Skyrim',
    id: 'Skyrim',
    description: 'this is a game'
  }]));

store.dispatch(addGame([
  {
    name: 'GTA 4',
    id: 'GTA 4',
    description: 'this is a game'
  }]));

if (module.hot) {
  module.hot.accept();
}
