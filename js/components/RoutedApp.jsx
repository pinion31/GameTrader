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

const Main = () => (
  <div>
    <Menu/>
    <RequestList />
    <GameList />
  </div>
);

const Footer = () => (
  <div className="footer-style">
    <p>Copyright &copy; 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);
const RoutedApp = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/AllGames" component={GameBrowser} />
      <Route exact path="/Dashboard" component={Main} />
      <Route exact path="/Signup" component={SignUp} />
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
