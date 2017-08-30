import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
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
           <LinkContainer to="/">
            <NavItem className="nav-text">My Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/Login">
            <NavItem className="nav-text">Sign In</NavItem>
          </LinkContainer>
          <NavItem className="nav-text">Sign out</NavItem>
        </Nav>
      </Navbar>

    );
  }
}

export default Menu;