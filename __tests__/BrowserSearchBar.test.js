import React from 'react';
import {shallow} from 'enzyme';
import {Modal, Row, Button, FormControl, HelpBlock} from 'react-bootstrap';
import {BrowserSearchBar} from '../js/components/BrowserSearchBar';

const emptyState = {
  searchTerm: '',
};

describe('BrowserSearchBar',()=> {
  const searchBar = shallow(<BrowserSearchBar />);

  it('has an initial state with empty string for searchTerm', () => {
    expect(searchBar.state().searchTerm).toEqual(emptyState.searchTerm);
  });

  it('has a div with class `nav-search`', () => {
    expect(searchBar.find('div').at(0).hasClass('nav-search')).toBe(true);
  });

  it('has a Button', () => {
    expect(searchBar.find(Button).exists()).toBe(true);
  });

  it('has a Button labeled with search glyphicon', () => {
    expect(searchBar.find(Button).children().props().glyph).toEqual('search');
  });

  it('has a FormControl component with placeholder `Search Games', () => {
    expect(searchBar.find(FormControl).exists()).toBe(true);
    expect(searchBar.find(FormControl).at(0).props().placeholder).toEqual('Search Games');
  });

   it('has a FormControl with name:`name` and type:`text`', () => {
    expect(searchBar.find(FormControl).at(0).props().name).toEqual('name');
    expect(searchBar.find(FormControl).at(0).props().type).toEqual('text');
  });



});