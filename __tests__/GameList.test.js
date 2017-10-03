import React from 'react';
import {shallow, mount} from 'enzyme';
import {Modal, Row, Button, FormControl, HelpBlock} from 'react-bootstrap';
import {GameList} from '../js/components/GameList';
import {GameItem} from '../js/components/GameItem';
import {initialState, addedGame} from '../__mockData__/mockData';
import {addGame, getUserGames, removeGame, clearUserGames} from '../js/actions/gameActions';
import axios from 'axios';
import {Provider} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../js/reducers/rootReducer';
import thunk from 'redux-thunk';
import { fakeServer } from 'sinon';

const mock = new MockAdapter(axios, {delayResponse: 0});
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

mock.onGet('/games/getUserGames').reply(200, initialState);
mock.onPost('/games/addGame').reply(200, JSON.stringify(addedGame));

let server = fakeServer.create();
let gameList;

server.respondWith(
  'GET',
  '/games/findGame/29/sonic',
  [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify([addedGame])
  ]
);

const emptyProps = {
  addGame: () => {gameList.setProps({games: {games : [...initialState, addedGame]}});},
  getUserGames: () => {},
  removeGame: () => {},
  clearUserGames: () => {},
  games: {games: initialState},
};

const emptyState = {
  showModal: false,
  searchTerm: '',
  searchList: [],
  selectedGame: {},
  selectedConsole: 0,
  searchTermMessage: '',
  consoleSearchMessage: '',
  gameSearchMessage: '',
};

const loadedState = {
  showModal: false,
  searchTerm: '',
  searchList: [],
  selectedGame: addedGame,
  selectedConsole: 0,
  searchTermMessage: '',
  consoleSearchMessage: '',
  gameSearchMessage: '',
};
/*
describe('Mounted GameList', () => {
  let gameList;

  beforeEach((done) => {
    gameList = mount(
     <Provider store={store}>
        <GameList {...emptyProps} store={store} />
     </Provider>
      );


    gameList.find(FormControl).at(0).simulate
    ('change', {target: {name: 'searchTerm', value: 'sonic'}});

     gameList.find(FormControl).at(1).simulate
    ('change', {target: {name: 'selectedConsole', value: addedGame.gameConsole}});

    gameList.find(Button).at(1).simulate('click');

    server.respond();
    setTimeout(done);
  });

   describe('add Game', () => {
    beforeEach((done) => {
      gameList.setState({selectedGame: addedGame});
      //gameList.find(Button).at(3).simulate('click');
      console.log('button', gameList.find(Button).at(3));
      server.respond();
      setTimeout(done);
    });

    it('add new game', () => {
      console.log(gameList.props().children.props.games);
    });
  });

});*/

describe('GameList Functionality', () => {

  beforeEach((done) => {
    gameList = shallow(<GameList {...emptyProps} />);

    gameList.find(FormControl).at(0).simulate
    ('change', {target: {name: 'searchTerm', value: 'sonic'}});

     gameList.find(FormControl).at(1).simulate
    ('change', {target: {name: 'selectedConsole', value: addedGame.gameConsole}});

    gameList.find(Button).at(1).simulate('click');

    server.respond();
    setTimeout(done);
  });

  it('retrieves searchQuery results', () => {
    expect(gameList.state().searchList).toEqual([addedGame]);
  });

  it('renders query results', () => {
    expect(gameList.find('.game-item').exists()).toBe(true);
  });

  describe('add Game', () => {
    beforeEach((done) => {
      gameList.setState({selectedGame: addedGame});
      gameList.find(Button).at(3).simulate('click');
      server.respond();
      setTimeout(done);
    });

    it('add new game', () => {
      expect(gameList.find('.game-container').at(2).props().children.props.name).toEqual('Sonic Eraser');
    });
  });
});

describe('GameList Rendering', () => {

  //let gameList;

  beforeEach((done) => {
    gameList = shallow(<GameList {...emptyProps} />);

    server.respond();
    setTimeout(done);
  });

  it('updates searchTerm', () => {
    gameList.find(FormControl).at(0).simulate
    ('change', {target: {name: 'searchTerm', value: 'sonic'}});
    expect(gameList.state().searchTerm).toEqual('sonic');
    expect(gameList.state().searchTermMessage).toEqual('');
    expect(gameList.state().gameSearchMessage).toEqual('');
  });

  it('has a title called My Games with class `section-header`', () => {
    expect(gameList.find('h1').at(0).text()).toEqual('My Games');
    expect(gameList.find('h1').at(0).hasClass('section-header')).toBe(true);
  });

  it('has a container div for GameItems with class `game-container`', () => {
    expect(gameList.find('.game-container').exists()).toBe(true);
  });

  it('has a Button with label `+ Add Game`', () => {
    expect(gameList.find(Button).at(0).props().children).toEqual('+ Add Game');
  });

  it('is initialized with empty State', () => {
    expect(gameList.state()).toEqual(emptyState);
  });

  it('has 2 game elements in props', () => {
    expect(gameList.unrendered.props.games.games.length).toEqual(2);
  });

  it('renders 2 GameItems', () => {
    expect(gameList.find(Row).at(1).children().length).toEqual(2);
  });

  it('has a GameItem component with name: `Fallout 4`', () => {
    expect(gameList.find('Connect(GameItem)').at(0).props().name).toEqual('Fallout 4');
  });

  it('has a second GameItem component with name: `Super Mario Bros. 2`', () => {
    expect(gameList.find('Connect(GameItem)').at(1).props().name).toEqual('Super Mario Bros. 2');
  });

  it('has game console number:18 and id: 1067 listed for Super Mario Bros. 2', () => {
    expect(gameList.find('Connect(GameItem)').at(1).props().gameConsole).toEqual('18');
    expect(gameList.find('Connect(GameItem)').at(1).props().id).toEqual(1067);
  });

  it('has game console number:49 and id: 9630 listed for Fallout 4', () => {
    expect(gameList.find('Connect(GameItem)').at(0).props().gameConsole).toEqual('49');
    expect(gameList.find('Connect(GameItem)').at(0).props().id).toEqual(9630);
  });

  describe('Modal', () => {
    it('is a Modal', () => {
      expect(gameList.find(Modal).exists()).toBe(true);
    });

    it('is titled Find Game', () => {
      expect(gameList.find(Modal.Title).props().children).toEqual('Find Game');
    });

    it('has a FormControl element with placeholder `Search For Games`', () => {
      expect(gameList.find(FormControl).at(0).props().placeholder).toEqual('Search For Games');
    });

    it('initializes a HelpBlock with empty string', () => {
      expect(gameList.find(HelpBlock).at(0).props().children).toEqual(emptyState.searchTerm);
    });

    it('has a Button with tag `Search`', () => {
      expect(gameList.find(Button).at(1).props().children).toEqual('Search');
    });

    describe('Game Console Dropdown', () => {
      it('has a default value of `Select Console`', () => {
        expect(gameList.find(FormControl).at(1).props().children[0].props.children).toEqual('Select Console');
      });

      it('has 28 options excluding default value', () => {
        expect(gameList.find(FormControl).at(1).props().children[1].length).toEqual(28);
      });

      it('initializes a HelpBlock with empty string', () => {
        expect(gameList.find(HelpBlock).at(1).props().children).toEqual(emptyState.consoleSearchMessage);
      });

      it('initializes a second HelpBlock with empty string', () => {
        expect(gameList.find(HelpBlock).at(2).props().children).toEqual(emptyState.gameSearchMessage);
      });
    });

    describe('Modal.Footer', () => {
      it('has a Button labeled `Close`', () => {
        expect(gameList.find(Button).at(2).props().children).toEqual('Close');
      });

      it('has a Button labeled `Add Game` with classes, accept-button and addGame-button ', () => {
        expect(gameList.find(Button).at(3).props().children).toEqual('Add Game');
        expect(gameList.find(Button).at(3).hasClass('accept-button')).toBe(true);
        expect(gameList.find(Button).at(3).hasClass('addGame-button')).toBe(true);
      });
    });
  });
});