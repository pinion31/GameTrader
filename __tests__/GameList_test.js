import {renderComponent, expect} from './test_helper';
import React from 'react';
import GameList from '../js/components/GameList';
import GameItem from '../js/components/GameItem';
import sinon from 'sinon';
import TestUtils, {renderIntoDocument, findRenderedDOMComponentWithClass} from 'react-addons-test-utils';
import chaiHaveReactComponent from 'chai-have-react-component';
import {addGame, getUserGames, removeGame, clearUserGames} from '../js/actions/gameActions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../js/reducers/rootReducer';
import thunk from 'redux-thunk';
import chai from 'chai';
import chaiJquery from 'chai-jquery';
import _$ from 'jquery';

const ReactTestRenderer = require('react-test-renderer');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

chai.use(chaiHaveReactComponent);

describe('GameList', () => {
  let componentClass;
  //let stubComponentDidMount;
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

    /*
    stubComponentDidMount = sinon.stub(GameList, 'componentDidMount').returns({
      type: 'GET_USER_GAMES', payload: [mockGame],
    });*/

    const middleware = applyMiddleware(thunk);

      /*
    stubComponentDidMount = stubComponentMethod(GameList, 'componentDidMount').returns({
      type: 'GET_USER_GAMES', payload: [],
    });*/

/*
    renderer = ReactTestRenderer.create(
      <Provider store={createStore(reducers, middleware)}>
        <GameList />
      </Provider>
    );*/

    componentClass = renderIntoDocument(
      <Provider store={createStore(reducers, middleware)}>
        <GameList />
      </Provider>);

  });

  afterEach(() => {
    //stubComponentDidMount.restore();
  });

  /*
  it('shows a title of My Games', () => {
    expect(componentClass.find('h1')).to.exist;
  });*/

  /*
  it('shows a game lib containing Fallout 4', () => {
    // expect(componentClass).to.have.class('game-item');
  });*/

  it('contains class name called section-header', () => {
    const sectionHeader = findRenderedDOMComponentWithClass(componentClass, 'section-header');
    expect(sectionHeader).to.be.ok;
  });



});