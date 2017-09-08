import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router';
import GameList from './GameList';
import RequestList from './RequestList';
import Menu from './Menu';
import GameBrowser from './GameBrowser';
import Login from './Login';
import SignUp from './SignUp';


let sessionUser = 'Noodles';

// callback method to set username for welcome message
const setSessionUser = (user) => {
  sessionUser = user;
};

// retrieves username for welcome message
const getSessionUser = () => (
  sessionUser
);

const Main = () => (
  <div>
    <Menu />
    <RequestList sessionUser={sessionUser} getSessionUser={ getSessionUser } />
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
      <Route exact path="/" render={props => <Login setSessionUser={setSessionUser} {...props} />} />
      <Route exact path="/AllGames" component={GameBrowser} />
      <Route exact path="/Dashboard" component={Main} />
      <Route exact path="/Signup" render={props => <SignUp setSessionUser={setSessionUser} {...props} />} />
    </Switch>
    <Footer />
  </div>
);

export default RoutedApp;
