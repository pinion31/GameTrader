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
    <RequestList />
    <GameList />
  </div>
);

const Footer = () => (
  <div>
    <p>Copyright 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);
const RoutedApp = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/AllGames" component={GameBrowser} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Signup" component={SignUp} />
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
