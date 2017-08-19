import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import RoutedApp from './components/RoutedApp';
import rootReducer from './reducers/rootReducer';
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
    <RoutedApp />
  </Provider>,
  document.getElementById('app'),
);

store.dispatch(addGame([{ name: 'Left For Dead', id: ''},{ name: 'Skyrim', id: ''}]));
store.dispatch(addGame([{ name: 'GTA 4', id: ''}]));

if (module.hot) {
  module.hot.accept();
}
