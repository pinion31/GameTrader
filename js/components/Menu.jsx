import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>GameTrader</Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to="/AllGames">
            <NavItem>Browse Games</NavItem>
          </LinkContainer>
           <LinkContainer to="/">
            <NavItem>My Games</NavItem>
          </LinkContainer>
          <LinkContainer to="/Login">
            <NavItem>Sign In</NavItem>
          </LinkContainer>
          <NavItem>Sign out</NavItem>
        </Nav>
      </Navbar>

    );
  }
}

export default Menu;