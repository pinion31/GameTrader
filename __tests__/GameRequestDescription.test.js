import React from 'react';
import {shallow} from 'enzyme';
import {GameRequestDescription} from '../js/components/GameRequestDescription';

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

  });

  it('has a Carousel with 5 screenshots', () => {

  });

  it('has a GameCard component with properties for Skyrim and owner: chris', () => {

  });


});