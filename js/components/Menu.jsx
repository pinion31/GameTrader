"use strict";

import React, {Component} from 'react';
import 'whatwg-fetch';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


/**
 * Api call to logout user when clicking Signout on Menu bar
 */

const logout = () => {
  fetch('/logoutUser', {
    method: 'POST',
    credentials: 'include',
  });
};

/**
 * Presentational Component used to display menu bar for site
 */
export default const Menu = (props) => {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><span className="menu-logo">GameTrader</span></Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to="/AllGames">
            <NavItem className="nav-text">Browse Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/Dashboard">
            <NavItem className="nav-text">My Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/">
            <NavItem className="nav-text" onClick={logout}>Sign out</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

