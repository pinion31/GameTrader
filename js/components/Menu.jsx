import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem>GameTrader</NavItem>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to="/AllGames">
            <NavItem>Browse Games</NavItem>
          </LinkContainer>
           <LinkContainer to="/">
            <NavItem>My Games</NavItem>
          </LinkContainer>
          <NavItem>Sign out</NavItem>
        </Nav>
      </Navbar>

    );
  }
}

export default Menu;