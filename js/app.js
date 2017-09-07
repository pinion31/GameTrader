import React from 'react';
import ReactDOM from 'react-dom';
// import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import RoutedApp from './components/RoutedApp';
import rootReducer from './reducers/rootReducer';
import '../sass/style.scss';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
