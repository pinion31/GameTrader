import {renderComponent, expect} from './test_helper';
import {Button, Modal, Thumbnail} from 'react-bootstrap';
import React from 'react';
import GameList from '../js/components/GameList';
import GameItem from '../js/components/GameItem';
import sinon from 'sinon';
import TestUtils, {renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType, findRenderedDOMComponentWithTag} from 'react-addons-test-utils';
//import * as TestUtils from 'react-addons-test-utils';
import chaiHaveReactComponent from 'chai-have-react-component';
import {addGame, getUserGames, removeGame, clearUserGames} from '../js/actions/gameActions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../js/reducers/rootReducer';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

describe('GameList', () => {
  let component;
  let preComponent;
  let stubComponentDidMount;
  let getUserGamesStub;
  //let renderer;

  let mockGame = {
    owner: 'chris',
    gameConsole: '49',
    id: 9630,
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_small/g82nr1m9xqr8wnp0xdrn.jpg',
    name: 'Fallout 4',
    summary: 'Bethesda Game Studios'
  };

  beforeEach(() => {

    mock.onGet('/games/getUserGames').reply(200, [mockGame]);

    const middleware = applyMiddleware(thunk);
    component = renderIntoDocument(
      <Provider store={createStore(reducers, middleware)}>
        <GameList />
      </Provider>);
  });

  afterEach(() => {
    mock.restore();
  });

  it('contains a Button component', () => {
    const button = findRenderedDOMComponentWithTag(component, 'button');
    expect(button).to.be.ok;
    //expect(component.find('.accept-button').length).to.equal(1);
  });

   it('contains classnames,accept-button and add-game-button', () => {
    const acceptButton = findRenderedDOMComponentWithClass(component, 'accept-button');
    const addGameButton = findRenderedDOMComponentWithClass(component, 'add-game-button');
    expect(acceptButton).to.be.ok;
    expect(addGameButton).to.be.ok;
  });

  it('contains class name called section-header', () => {
    const sectionHeader = findRenderedDOMComponentWithClass(component, 'section-header');
    expect(sectionHeader).to.be.ok;
  });

  it('contains one component of type GameItem', () => {
    setTimeout(() => console.log(component.store.getState()), 5000);
    console.log(component.props);
    const gameItem = findRenderedDOMComponentWithClass(component, 'game-item');

    expect(gameItem).to.be.ok;
  });



});