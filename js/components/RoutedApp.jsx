'use strict'

import React from 'react';
import GameList from './GameList';
import RequestList from './RequestList';
import Menu from './Menu';
import GameBrowser from './GameBrowser';
import Login from './Login';
import SignUp from './SignUp';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router';

let sessionUser = 'Noodles';

const Main = () => (
  <div>
    <Menu/>
    <RequestList sessionUser={sessionUser} />
    <GameList />
  </div>
);

const setSessionUser = (user) => {
  sessionUser = user;
};

const getSessionUser = () => (
  sessionUser
);

const Footer = () => (
  <div className="footer-style">
    <p>Copyright &copy; 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);
const RoutedApp = () => (
  <div>
    <Switch>
      {/*<Route exact path="/" component={Login} />*/}
      <Route exact path="/" render={props => <Login setSessionUser={setSessionUser} getSessionUser={getSessionUser} {...props} />} />
      <Route exact path="/AllGames" component={GameBrowser} />
      <Route exact path="/Dashboard" component={Main} />
      <Route exact path="/Signup" component={SignUp} />
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
