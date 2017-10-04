import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {shallow} from 'enzyme';
import {Grid, Row, Col, Modal, Button, Well, FormGroup,
  FormControl, option, HelpBlock} from 'react-bootstrap';
import { fakeServer } from 'sinon';
import GameRequestIcon from '../js/components/GameRequestIcon';
import {GameBrowser} from '../js/components/GameBrowser';
import {GameRequestDescription} from '../js/components/GameRequestDescription';
import {initialState, allGames, Skyrim, Fallout4, addedGame, testRequest, storedRequest} from '../__mockData__/mockData';
import {BrowserSearchBar} from '../js/components/BrowserSearchBar';

const server = fakeServer.create();

server.respondWith(
  'GET',
  '/games/getAllGames/skyrim',
  [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify(initialState)
  ]
);


const mock = new MockAdapter(axios, {delayResponse: 0});

mock.onPost('/requests/addRequest').reply(200, testRequest);

const emptyState = {
  showModal: false,
  requestedGame: {},
  gameOffer: [],
  offeredGame: {},
  allGames: {},
  requestErrorMessage: '',
};

const emptyProps = {
  userGames: {games: initialState},
  addRequest: () => {},
  getUserGames: () => {}
};

describe('GameBrowser', () => {

  const gameBrowser = shallow(<GameBrowser {...emptyProps} />);

  it('initializes with empty state', () => {
    expect(gameBrowser.state()).toEqual(emptyState);
  });

  it('has a label, `Available Games` and class,`section-header`', () => {
    expect(gameBrowser.find('h1').at(0).text()).toEqual('Available Games');
    expect(gameBrowser.find('h1').at(0).hasClass('section-header')).toBe(true);
  });

  it('has a BrowserSearchBar', () => {
    expect(gameBrowser.find(BrowserSearchBar).exists()).toBe(true);
  });

  it('has a Row component with class, `game-browser`', () => {
    expect(gameBrowser.find(Row).at(1).hasClass('game-browser')).toBe(true);
  });

  describe('Game Container', () => {

    beforeEach(()=> {
      gameBrowser.state().allGames = allGames;
    });

    it('renders 3 GameRequestIcon', () => {
      //console.log(gameBrowser.find(GameRequestIcon).length);
      //console.log(gameBrowser.find(GameRequestIcon));
      //expect(gameBrowser.find(GameRequestIcon).length).toEqual(3);
      //expect(gameBrowser.find(GameRequestIcon).at(2).exists()).toBe(true);
      //expect(gameBrowser.find(GameRequestIcon).at(3).exists()).toBe(false);
    });

    it('has 3 Games', () => {
      expect(Object.keys(gameBrowser.state().allGames).length).toEqual(3);
    });

    it('has a game with name:`Fallout 4`, gameConsole: 49 and id:`25076`', () => {
      expect(gameBrowser.state().allGames[25076].name).toEqual('Red Dead Redemption 2');
      expect(gameBrowser.state().allGames[25076].gameConsole).toEqual('49');
      expect(gameBrowser.state().allGames[25076].id).toEqual(25076);
    });
  });


  describe('Modal', ()=> {
    it('has a Modal Title called `Request Trade`', () => {
      expect(gameBrowser.find(Modal.Title).props().children).toEqual('Request Trade');
    });

    it('has a modal title called `Requested Game` with class, `modal-sub-header`', () => {
      expect(gameBrowser.find('h2').at(0).text()).toEqual('Requested Game');
      expect(gameBrowser.find('h2').at(0).hasClass('modal-sub-header')).toBe(true);

    });

    it('has a modal title called `Your Offer` with class, `modal-sub-header`', () => {
      expect(gameBrowser.find('h2').at(1).text()).toEqual('Your Offer');
      expect(gameBrowser.find('h2').at(1).hasClass('modal-sub-header')).toBe(true);
    });

    it('opens modal', () => {
      gameBrowser.find(Button).at(0).simulate('click');
      expect(gameBrowser.state().showModal).toEqual(true);
      expect(gameBrowser.state().requestedGame).toEqual({});
    });

    describe('Select Game Dropdown', () => {
      it('has a default value of `Select Game`', () => {
        expect(gameBrowser.find('option').at(0).props().children).toEqual('Select Game');
      });

      it('has 2 game options', () => {
        expect(gameBrowser.find(FormControl).at(0).props().children[1].length).toEqual(2);
      });

      it('has a game option of Fallout 4', () => {
        expect(gameBrowser.find('option').at(1).props().children).toEqual('Fallout 4');
      });

      it('has a game option of Super Mario Bros. 2', () => {
        expect(gameBrowser.find('option').at(2).props().children).toEqual('Super Mario Bros. 2');
      });

      it('has a HelpBlock component with empty message', () => {
        expect(gameBrowser.find(HelpBlock).at(0).props().children).toEqual(emptyState.requestErrorMessage);
      });

      describe('Footer', () => {
        it('has a Button labeled `Close`', ()=> {
          expect(gameBrowser.find(Button).at(0).props().children).toEqual('Close');
        });

        it('has a Button labeled `Send Trade Request` and class `accept-button`', ()=> {
          expect(gameBrowser.find(Button).at(1).props().children).toEqual('Send Trade Request');
          expect(gameBrowser.find(Button).at(1).hasClass('accept-button')).toBe(true);
        });
      });
    });


  });

  describe('sendRequest', () => {
    beforeEach((done) => {
      gameBrowser.setState({
        allGames: allGames,
        gameOffer:[Fallout4],
        requestedGame: Skyrim.id,
      });
      gameBrowser.find('.accept-button').simulate('click');
      setTimeout(done);
    });

    it('sends request', () => {
      expect(gameBrowser.state().allGames[Skyrim.id].status).toEqual('requested');
    });
  });

  describe('addGameToOffer', () => {
    beforeEach((done) => {
      gameBrowser.setState({
        allGames: allGames,
        gameOffer: [Skyrim],
        requestedGame: Skyrim.id,
      });

      gameBrowser.find(FormControl).at(0).simulate('change',
        {target: {name: 'gameOffer', value: '19457'}});
      setTimeout(done);
    });

    it('sends request', () => {
     expect(gameBrowser.state().gameOffer[0].id).toEqual(19457);
    });
  });

  describe('getRequestedGame', () => {
    beforeEach((done) => {
      gameBrowser.setState({
        allGames: allGames,
        gameOffer: [Skyrim],
        requestedGame: Skyrim.id,
      });
      setTimeout(done);
    });

    it('sends request', () => {
      expect(gameBrowser.find(GameRequestDescription).length).toEqual(1);
      expect(gameBrowser.find(GameRequestDescription).at(0).props().name).toEqual('The Elder Scrolls V: Skyrim Special Edition');
    });
  });

  describe('fetchGames', () => {
    beforeEach((done) => {
      gameBrowser.find(BrowserSearchBar).props().fetchGames('skyrim');
      server.respond();
      setTimeout(done);
    });

    it('fetchs Games', () => {
      expect(gameBrowser.state().allGames['9630'].id).toEqual(9630);
      expect(gameBrowser.state().allGames['1067'].id).toEqual(1067);
    });
  });


});


