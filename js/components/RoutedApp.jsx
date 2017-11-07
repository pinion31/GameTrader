"use strict";

import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router';
import GameList from './GameList';
import RequestList from './RequestList';
import Menu from './Menu';
import GameBrowser from './GameBrowser';
import Login from './Login';
import SignUp from './SignUp';


// var to store user name for welcome message
let sessionUser = '';

/**
 * Callback method to set username for welcome message on dashboard; passed to Login component as prop
 */

const setSessionUser = (user) => {
  sessionUser = user;
};

/**
 * callback method to retrieve username for welcome message on dashboard; passed to RequestList component as prop
 @return {String} sessionUser
 */

const getSessionUser = () => (
  sessionUser
);

/**
 * Dashboard component that combines Menu, RequestList and GameList components to build user dashboard
 * @return {Component} returns combined component
 */
const Main = () => (
  <div>
    <Menu />
    <RequestList sessionUser={sessionUser} getSessionUser={ getSessionUser } />
    <GameList />
  </div>
);

/**
 * Footer component to be display at bottom of pages
 */
const Footer = () => (
  <div className="footer-style">
    <p>Copyright &copy; 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);

/**
 * React-Router component for client-side routing
 */
const RoutedApp = () => (
  <div>
    <Switch>
      <Route exact path="/" render={props => <Login setSessionUser={setSessionUser} {...props} />} />
      <Route exact path="/AllGames" component={GameBrowser} />
      <Route exact path="/Dashboard" component={Main} />
      <Route exact path="/Signup" render={props => <SignUp setSessionUser={setSessionUser} {...props} />} />
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
