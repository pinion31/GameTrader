import React from 'react';
import {shallow} from 'enzyme';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Menu} from '../js/components/Menu';

describe('Menu', () =>{
  const menu = shallow(<Menu />);

  it('has a Navbar component', () => {
    expect(menu.find(Navbar).exists()).toBe(true);
  });

  describe('Nav component', () => {
    it('has a Navbar Header component', () => {
      expect(menu.find(Navbar.Header).exists()).toBe(true);
    });

    it('has a Navbar Brand title of  GameTrader and class: menu-logo', () => {
      expect(menu.find('span').props().children).toEqual('GameTrader');
      expect(menu.find('span').hasClass('menu-logo')).toBe(true);
    });

    it('has a LinkContainer pointing to /AllGames', () => {
      expect(menu.find(LinkContainer).at(0).props().to).toEqual('/AllGames');
    });

    it('has a NavItem with class: nav-text and content:Browse Games', () => {
      expect(menu.find(NavItem).at(0).hasClass('nav-text')).toBe(true);
      expect(menu.find(NavItem).at(0).props().children).toEqual('Browse Games');
    });

    it('has a LinkContainer pointing to /Dashboard', () => {
      expect(menu.find(LinkContainer).at(1).props().to).toEqual('/Dashboard');
    });

    it('has a NavItem with class: nav-text and content:My Games', () => {
      expect(menu.find(NavItem).at(1).hasClass('nav-text')).toBe(true);
      expect(menu.find(NavItem).at(1).props().children).toEqual('My Games');
    });

    it('has a LinkContainer pointing to /', () => {
      expect(menu.find(LinkContainer).at(2).props().to).toEqual('/');
    });

    it('has a NavItem with class: nav-text and content:Sign out', () => {
      expect(menu.find(NavItem).at(2).hasClass('nav-text')).toBe(true);
      expect(menu.find(NavItem).at(2).props().children).toEqual('Sign out');
    });
  });
});
