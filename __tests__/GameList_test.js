import {renderComponent, expect} from './test_helper';
import {Button, Modal, Thumbnail} from 'react-bootstrap';
import React from 'react';
import GameList from '../js/components/GameList';
import GameItem from '../js/components/GameItem';
import sinon from 'sinon';
import TestUtils, {renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType, findRenderedDOMComponentWithTag, findRenderedComponentWithType} from 'react-addons-test-utils';
//import * as TestUtils from 'react-addons-test-utils';
import chaiHaveReactComponent from 'chai-have-react-component';
import {addGame, getUserGames, removeGame, clearUserGames} from '../js/actions/gameActions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../js/reducers/rootReducer';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {mount} from 'enzyme';
require("mocha-as-promised")();


chai.use(chaiAsPromised);

const mock = new MockAdapter(axios, {delayResponse: 0});
let currentStore;

describe('GameList', () => {
  let component;

  let initialState = {games : {games: [
   {
    owner: 'nicole',
    gameConsole: '49',
    id: 9631,
    screenshots: [
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/whhptvhci1bdoqolofjo.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/acrxfc2grr69wfbql8ax.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/ufocunt4ze1rjomybg2h.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/twgwp1xobnae4kbky2hw.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/xqhildldpukjvj9gcfmt.jpg"
                ],
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_small/g82nr1m9xqr8wnp0xdrn.jpg',
    name: 'Fallout 3',
    summary: 'Bethesda Game Studios'
  }
  ]}, requests: {requests:[]}
  };

  let mockGame = {
    owner: 'chris',
    gameConsole: '49',
    id: 9630,
    screenshots:
     [
      'https://images.igdb.com/igdb/image/upload/t_screenshot_med/whhptvhci1bdoqolofjo.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_med/acrxfc2grr69wfbql8ax.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_med/ufocunt4ze1rjomybg2h.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_med/twgwp1xobnae4kbky2hw.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_med/xqhildldpukjvj9gcfmt.jpg'
      ],
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_small/g82nr1m9xqr8wnp0xdrn.jpg',
    name: 'Fallout 4',
    summary: 'Bethesda Game Studios'
  };

  mock.onGet('/games/getUserGames').reply(200, [mockGame]);

  beforeEach(function()  {
    const middleware = applyMiddleware(thunk);

    const store = createStore(rootReducer, middleware);
    currentStore = store;

    const mountedGameList = <GameList/>;

    component = renderIntoDocument(
      <Provider store={store}>
        {mountedGameList}
      </Provider>);

  });

  afterEach(() => {
   // mock.restore();
  });


  it('contains a Button component', () => {
    const button = findRenderedDOMComponentWithTag(component, 'button');
    expect(button).to.be.ok;
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

  it('loads user games with one game called Fallout 4', () => {
      setTimeout(() => {
        expect(currentStore.getState().games.games).to.deep.equal([mockGame]);
      }, 1000);
    });

  it('has one gameItem', () => {
     setTimeout(() => {
        expect(findRenderedDOMComponentWithClass(component, 'game-item')).to.be.ok;
    }, 1000);
  });

   it('adds game to user library', () => {
    setTimeout(() => {
      addGame([addGame]);
      console.log('newstore', currentStore.getState().games.games);
      //const acceptButton = findRenderedDOMComponentWithClass(component, 'accept-button');
      const acceptButton = findRenderedDOMComponentWithClass(component, 'game-item');
      console.log(acceptButton);
      //Simulate.click(acceptButton);
      //console.log(mountedGameList);
    }, 1000);
    });
});