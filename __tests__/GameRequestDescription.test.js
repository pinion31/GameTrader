import React from 'react';
import {shallow} from 'enzyme';
import {Carousel} from 'react-bootstrap';
import {GameRequestDescription} from '../js/components/GameRequestDescription';
import {GameCard} from '../js/components/GameCard';

const emptyState = {
  index: 0,
  direction: null
};

const testProps = {
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
  name: 'The Elder Scrolls V: Skyrim Special Edition',
  owner: 'chris'
};

describe('GameRequestDescription', () => {
  const gameReqDes = shallow(<GameRequestDescription {...testProps} />);

  it('initalizes an empty state', () => {
    expect(gameReqDes.state()).toEqual(emptyState);
  });

  it('has a Carousel with 5 screenshots', () => {
    expect(gameReqDes.find(Carousel).exists()).toBe(true);
    expect(gameReqDes.find(Carousel.Item).at(0).props().children.props.src).toEqual(testProps.screenshots[0]);
    expect(gameReqDes.find(Carousel.Item).at(1).props().children.props.src).toEqual(testProps.screenshots[1]);
    expect(gameReqDes.find(Carousel.Item).at(2).props().children.props.src).toEqual(testProps.screenshots[2]);
    expect(gameReqDes.find(Carousel.Item).at(3).props().children.props.src).toEqual(testProps.screenshots[3]);
    expect(gameReqDes.find(Carousel.Item).at(4).props().children.props.src).toEqual(testProps.screenshots[4]);
  });

  it('has a GameCard component with properties for Skyrim and owner: chris', () => {
    expect(gameReqDes.find(GameCard).exists()).toBe(true);
    expect(gameReqDes.find(GameCard).props().cover).toEqual(testProps.cover);
    expect(gameReqDes.find(GameCard).props().name).toEqual(testProps.name);
    expect(gameReqDes.find(GameCard).props().summary).toEqual(testProps.summary);
    expect(gameReqDes.find(GameCard).props().owner).toEqual(testProps.owner);
  });
});
