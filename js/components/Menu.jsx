import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Col, FormControl, FormGroup, Glyphicon, Button} from 'react-bootstrap';
import BrowserSearchBar from './BrowserSearchBar';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><span className="menu-logo">GameTrader</span></Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <BrowserSearchBar />
          <LinkContainer to="/AllGames">
            <NavItem className="nav-text">Browse Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/Dashboard">
            <NavItem className="nav-text">My Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/">
            <NavItem className="nav-text">Sign out</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>

    );
  }
}

export default Menu;
