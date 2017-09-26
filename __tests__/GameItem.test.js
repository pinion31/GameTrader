import React from 'react';
import {shallow} from 'enzyme';
import {Modal, Button, Carousel} from 'react-bootstrap';
import {GameItem} from '../js/components/GameItem';
import GameCard from '../js/components/GameCard';

const emptyState = {
  showModal: false,
  index: 0,
  direction: null
};

const emptyProps = {
  removeGame: () => {},
  screenshots:  [
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/f3fc6zqdew83zu4dgwdf.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/cfb4kvjf2ygttbreazar.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/oornljaohheldfdli4tx.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/e9wm1jbpfbaflmvvldio.jpg",
            "https://images.igdb.com/igdb/image/upload/t_screenshot_med/jonqwskjocnykh9s6gug.jpg"
        ],
  gameConsole: 49,
  cover: 'https://images.igdb.com/igdb/image/upload/t_cover_small/fbwtoie90jibxgkrf6mx.jpg',
  summary: 'Skyrim special edition is a remaster of the classic from 2011',
  id: 19457,
  name: 'The Elder Scrolls V: Skyrim Special Edition'
}

describe('GameItem', () => {
  const gameItem = shallow(<GameItem {...emptyProps}/>);

  it('is an image displaying a cover, has an alt tag and has class:`game-item`', () => {
    expect(gameItem.find('img').at(0).props().src).toEqual(emptyProps.cover);
    expect(gameItem.find('img').at(0).props().alt).toEqual(emptyProps.name);
    expect(gameItem.find('img').at(0).hasClass('game-item')).toBe(true);
  });

  describe('Modal', () => {
    it('has a Modal', () => {
      expect(gameItem.find(Modal).exists()).toBe(true);
    });

    it('has a Carousel with 5 screenshots', () => {
       expect(gameItem.find(Carousel).exists()).toBe(true);
       expect(gameItem.find(Carousel.Item).length).toEqual(5);
       expect(gameItem.find(Carousel.Item).at(0).props().children.props.src).toEqual(emptyProps.screenshots[0]);
       expect(gameItem.find(Carousel.Item).at(1).props().children.props.src).toEqual(emptyProps.screenshots[1]);
       expect(gameItem.find(Carousel.Item).at(2).props().children.props.src).toEqual(emptyProps.screenshots[2]);
       expect(gameItem.find(Carousel.Item).at(3).props().children.props.src).toEqual(emptyProps.screenshots[3]);
       expect(gameItem.find(Carousel.Item).at(4).props().children.props.src).toEqual(emptyProps.screenshots[4]);
    });

    it('has a GameCard with cover url, name: Skyrim and summary', () => {
      expect(gameItem.find(GameCard).exists()).toBe(true);
      expect(gameItem.find(GameCard).at(0).props().cover).toEqual(emptyProps.cover);
      expect(gameItem.find(GameCard).at(0).props().name).toEqual(emptyProps.name);
      expect(gameItem.find(GameCard).at(0).props().summary).toEqual(emptyProps.summary);
    });

    describe('Footer', () => {
      it('has a Button labeled `Remove Game`', () => {
        expect(gameItem.find(Button).at(0).exists()).toBe(true);
        expect(gameItem.find(Button).at(0).props().children).toEqual('Remove Game');
      });

      it('has a Button labeled `Close`', () => {
        expect(gameItem.find(Button).at(1).exists()).toBe(true);
        expect(gameItem.find(Button).at(1).props().children).toEqual('Close');
      });
    });
  });

});