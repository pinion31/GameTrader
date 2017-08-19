'use strict'

import React from 'react';
import GameList from './GameList';
import RequestList from './RequestList';
import Menu from './Menu';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router';
import GameBrowser from './GameBrowser';

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
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
