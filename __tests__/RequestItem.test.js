import React from 'react';
import {shallow} from 'enzyme';
import {Modal, Button} from 'react-bootstrap';
import {OUTGOING, INCOMING, CANCEL_TRADE, ACCEPT_TRADE, DECLINE_TRADE_OFFER, PENDING,
  ACCEPTED, DECLINED, CANCELLED} from '../js/constants/requestStrings';
import {RequestItem} from '../js/components/RequestItem';
import GameCard from '../js/components/GameCard';

const emptyState = {
  showModal: false,
  statusMessage: '',
};

let fnResults = '';
let fnResultsTrade = '';

const emptyProps = {
  removeRequest: (gameInfo) => {fnResults = gameInfo;},
  completeTrade: (gameInfo) => {fnResultsTrade = gameInfo;},
  declineTrade: (type) => { fnResults = type; },
  requestedGame: {
        "name" : "Super Mario Bros. 2",
        "id" : 1067,
        "summary" : "Mario’s back! Bigger and badder than before! This time it’s a fierce action-packed battle to free the land of Subcon from the curse of the evil Wart. It’s up to you, along with Mario, Luigi, Toad and the Princess, to fight your way through bizarre multi-level worlds and find him! This time you’ve got a brand new kind of power - plucking power - and now anything you find can be a weapon. But beware! You’ve never seen creatures like these! Shyguys and Tweeters! Ninji and Beezos! And you’ve never had an adventure like this! Only cunning and speed can save you now…",
        "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/lijdlxlmuqcvfo0kjxwf.jpg",
        "gameConsole" : "18",
        "screenshots" : [
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sfmt9d8ypy6faiw8p2dh.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/xol2bpcqijtzsnrowdfi.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/t7hiojluiquzemr5te5o.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/bnz1z2mxetqqp3t2ljyy.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/pigk3dresfrg6hbryhnr.jpg"
        ],
        "owner" : "christopher"
  },
  offeredGame:  {
        "owner" : "christopher",
        "screenshots" : [
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/whhptvhci1bdoqolofjo.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/acrxfc2grr69wfbql8ax.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/ufocunt4ze1rjomybg2h.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/twgwp1xobnae4kbky2hw.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/xqhildldpukjvj9gcfmt.jpg"
        ],
        "gameConsole" : "49",
        "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/g82nr1m9xqr8wnp0xdrn.jpg",
        "summary" : "Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.",
        "id" : 9630,
        "name" : "Fallout 4"
  }
};
//expect(requestItem.state())
describe('RequestItem', () => {

  let requestItem = shallow(<RequestItem {...emptyProps} />);

  it('initializes with empty state', () => {
    expect(requestItem.state()).toEqual(emptyState);
  });

  it('has a container div with class: request-image', () => {
    expect(requestItem.find('div').at(0).hasClass('request-image')).toBe(true);
  });

  it('displays a image showing cover of requested game, Super Mario Bros 2 and alt property', () => {
    expect(requestItem.find('img').props().src).toEqual(emptyProps.requestedGame.cover);
    expect(requestItem.find('img').props().alt).toEqual(emptyProps.requestedGame.name);
  });

  describe('Modal', () => {
    it('is a Modal', () => {
      expect(requestItem.find(Modal).exists()).toBe(true);
    });

    it('has a Modal title showing name of requested Game, Super Mario Bros. 2', () => {
      expect(requestItem.find(Modal.Title).props().children[0]).toEqual(emptyProps.requestedGame.name);
    });

    describe('Modal Body', () => {
      it('has text displaying chris as owner of requested game and class:owner-text', () => {
        expect(requestItem.find('p').at(2).props().children[0]).toEqual('Owner: ');
        expect(requestItem.find('p').at(2).props().children[1]).toEqual('christopher');
        expect(requestItem.find('p').at(2).hasClass('owner-text')).toBe(true);
      });

      it('has title, Your Request with class: modal-sub-header', () => {
        expect(requestItem.find('h3').at(0).props().children).toEqual('Your Request');
        expect(requestItem.find('h3').at(0).hasClass('modal-sub-header')).toBe(true);
      });

      it('has 2 GameCards: one with requestedGame properties and one with offeredGame properties', () => {
        expect(requestItem.find(GameCard).length).toEqual(2);
        expect(requestItem.find(GameCard).at(0).props().cover).toEqual(emptyProps.requestedGame.cover);
        expect(requestItem.find(GameCard).at(0).props().name).toEqual(emptyProps.requestedGame.name);
        expect(requestItem.find(GameCard).at(0).props().summary).toEqual(emptyProps.requestedGame.summary);
        expect(requestItem.find(GameCard).at(1).props().cover).toEqual(emptyProps.offeredGame.cover);
        expect(requestItem.find(GameCard).at(1).props().name).toEqual(emptyProps.offeredGame.name);
        expect(requestItem.find(GameCard).at(1).props().summary).toEqual(emptyProps.offeredGame.summary);
      });

      it('has title, Your Offer with classes: modal-sub-header and clear-fix', () => {
        expect(requestItem.find('h3').at(1).props().children).toEqual('Your Offer');
        expect(requestItem.find('h3').at(1).hasClass('modal-sub-header')).toBe(true);
        expect(requestItem.find('h3').at(1).hasClass('clear-fix')).toBe(true);
      });
    });
});

  describe('RequestItem with PENDING Status and INCOMING Path', () => {

    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={INCOMING}
       status={PENDING} />);
    });

    it('displays status of pending below Modal title and has class: status-text', () => {
      expect(requestItem.find('p').at(1).props().children[0]).toEqual('Status: ');
      expect(requestItem.find('p').at(1).props().children[1]).toEqual(PENDING);
      expect(requestItem.find('p').at(1).hasClass('status-text')).toBe(true);
    });

    it('displays a status message of Pending and className corresponding to status', () => {
      expect(requestItem.find('p').at(0).props().children).toEqual(PENDING);
      expect(requestItem.find('p').at(0).hasClass('request-pending')).toBe(true);
    });

    describe('Modal Body', () => {
      it('has a title message showing status message: Pending and class:`modal-message`', () => {
        expect(requestItem.find('h2').at(0).props().children).toEqual('');
        expect(requestItem.find('h2').at(0).hasClass('modal-message')).toBe(true);
      });
    });

    describe('Modal Footer', () => {

      it('has a container div with class, trade-modal-buttons', () => {
        expect(requestItem.find('div').at(1).hasClass('trade-modal-buttons')).toBe(true);

      });

      it('has a Button labelled `Accept Trade`and class: modal-buttons', () => {
        expect(requestItem.find(Button).at(1).props().children).toEqual(ACCEPT_TRADE);
        expect(requestItem.find(Button).at(1).hasClass('modal-buttons')).toBe(true);
      });

      it('has a Button labelled `Decline Trade` and classes: modal-buttons and accept-button', () => {
        expect(requestItem.find(Button).at(0).props().children).toEqual(DECLINE_TRADE_OFFER);
        expect(requestItem.find(Button).at(0).hasClass('modal-buttons')).toBe(true);
      });

      it('has a Button labeled `close`', () => {
        expect(requestItem.find(Button).at(2).props().children).toEqual('Close');
      });
    });
  });

  describe('RequestItem with PENDING Status and OUTGOING Path', () => {

    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={OUTGOING}
       status={PENDING} />);
    });

    it('displays status of pending below Modal title and has class: status-text', () => {
      expect(requestItem.find('p').at(1).props().children[0]).toEqual('Status: ');
      expect(requestItem.find('p').at(1).props().children[1]).toEqual(PENDING);
      expect(requestItem.find('p').at(1).hasClass('status-text')).toBe(true);
    });

    it('displays a status message of Pending and className corresponding to status', () => {
      expect(requestItem.find('p').at(0).props().children).toEqual(PENDING);
      expect(requestItem.find('p').at(0).hasClass('request-pending')).toBe(true);
    });

    describe('Modal Body', () => {
      it('has a title message showing status message: Pending and class:`modal-message`', () => {
        expect(requestItem.find('h2').at(0).props().children).toEqual('');
        expect(requestItem.find('h2').at(0).hasClass('modal-message')).toBe(true);
      });
    });

    describe('Modal Footer', () => {
      it('has a Button labelled `Cancel Trade`', () => {
        expect(requestItem.find(Button).at(0).props().children).toEqual(CANCEL_TRADE);
      });

      it('has a Button labeled `close`', () => {
        expect(requestItem.find(Button).at(1).props().children).toEqual('Close');
      });
    });
  });

  describe('RequestItem with ACCEPTED Status and INCOMING Path', () => {

    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={INCOMING}
       status={ACCEPTED} />);
    });

    it('displays status of Accepted below Modal title and has class: status-text', () => {
      expect(requestItem.find('p').at(1).props().children[0]).toEqual('Status: ');
      expect(requestItem.find('p').at(1).props().children[1]).toEqual(ACCEPTED);
      expect(requestItem.find('p').at(1).hasClass('status-text')).toBe(true);
    });

    it('displays a status message of Accepted and className corresponding to status', () => {
      expect(requestItem.find('p').at(0).props().children).toEqual(ACCEPTED);
      expect(requestItem.find('p').at(0).hasClass('request-accepted')).toBe(true);
    });

    describe('Modal Body', () => {
      it('has a title message showing status message: Accepted and class:`modal-message`', () => {
        expect(requestItem.find('h2').at(0).props().children).toEqual('Your Trade Offer Was Accepted!');
        expect(requestItem.find('h2').at(0).hasClass('modal-message')).toBe(true);
      });
    });

    describe('Modal Footer', () => {
      it('has a Button labelled `Remove`', () => {
        expect(requestItem.find(Button).at(0).props().children).toEqual('Remove');
      });

      it('has a Button labeled `close`', () => {
        expect(requestItem.find(Button).at(1).props().children).toEqual('Close');
      });
    });
  });

  describe('RequestItem with DECLINED Status and INCOMING Path', () => {

    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={INCOMING}
       status={DECLINED} />);
    });

    it('displays status of DECLINED below Modal title and has class: status-text', () => {
      expect(requestItem.find('p').at(1).props().children[0]).toEqual('Status: ');
      expect(requestItem.find('p').at(1).props().children[1]).toEqual(DECLINED);
      expect(requestItem.find('p').at(1).hasClass('status-text')).toBe(true);
    });

    it('displays a status message of DECLINED and className corresponding to status', () => {
      expect(requestItem.find('p').at(0).props().children).toEqual(DECLINED);
      expect(requestItem.find('p').at(0).hasClass('request-declined')).toBe(true);
    });

    describe('Modal Body', () => {
      it('has a title message showing status message: DECLINED and class:`modal-message`', () => {
        expect(requestItem.find('h2').at(0).props().children).toEqual('Sorry! Your Trade Offer Was Declined.');
        expect(requestItem.find('h2').at(0).hasClass('modal-message')).toBe(true);
      });
    });

    describe('Modal Footer', () => {
      it('has a Button labelled `Remove`', () => {
        expect(requestItem.find(Button).at(0).props().children).toEqual('Remove');
      });

      it('has a Button labeled `close`', () => {
        expect(requestItem.find(Button).at(1).props().children).toEqual('Close');
      });
    });
  });

  describe('RequestItem with CANCELLED Status and OUTGOING Path', () => {

    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={OUTGOING}
       status={CANCELLED} />);
    });

    it('displays status of CANCELLED below Modal title and has class: status-text', () => {
      expect(requestItem.find('p').at(1).props().children[0]).toEqual('Status: ');
      expect(requestItem.find('p').at(1).props().children[1]).toEqual(CANCELLED);
      expect(requestItem.find('p').at(1).hasClass('status-text')).toBe(true);
    });

    it('displays a status message of CANCELLED and className corresponding to status', () => {
      expect(requestItem.find('p').at(0).props().children).toEqual(CANCELLED);
      expect(requestItem.find('p').at(0).hasClass('request-declined')).toBe(true);
    });

    describe('Modal Body', () => {
      it('has a title message showing status message: CANCELLED and class:`modal-message`', () => {
        expect(requestItem.find('h2').at(0).props().children).toEqual('This Trade Offer Was Cancelled By christopher.');
        expect(requestItem.find('h2').at(0).hasClass('modal-message')).toBe(true);
      });
    });

    describe('Modal Footer', () => {
      it('has a Button labelled `Remove`', () => {
        expect(requestItem.find(Button).at(0).props().children).toEqual('Remove');
      });

      it('has a Button labeled `close`', () => {
        expect(requestItem.find(Button).at(1).props().children).toEqual('Close');
      });
    });
  });

  describe('removeTrade', () => {
    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={INCOMING}
        status={DECLINED} />);
      requestItem.find(Button).at(0).simulate('click');
    });

    it('removes Request', () => {
      expect(fnResults).toEqual({
        requestedGameId: emptyProps.requestedGame.id,
        offeredGameId: emptyProps.offeredGame.id,
      });
      expect(requestItem.state().showModal).toEqual(true);
    });
  });

  describe('declineTrade', () => {
    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={OUTGOING}
        status={PENDING} />);
      requestItem.find(Button).at(0).simulate('click');
    });

    it('declines Trade', () => {
      expect(fnResults).toEqual({
        type: 'Cancelled',
        offeredGame: emptyProps.offeredGame,
        requestedGame: emptyProps.requestedGame,
      });
    });
  });

  describe('acceptTrade', () => {
    beforeEach(() => {
      requestItem = shallow(<RequestItem {...emptyProps} path={INCOMING}
       status={PENDING} />);
      requestItem.find(Button).at(1).simulate('click');
    });

    it('accepts Trade', () => {
      expect(fnResultsTrade).toEqual({
        offeredGame: emptyProps.offeredGame,
        requestedGame: emptyProps.requestedGame,
      });

      expect(fnResults).toEqual({
        requestedGameId: emptyProps.requestedGame.id,
        offeredGameId: emptyProps.offeredGame.id,
      });
      expect(requestItem.state().showModal).toEqual(true);
    });
  });
});
