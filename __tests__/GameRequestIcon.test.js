import React from 'react';
import {shallow} from 'enzyme';
import {Thumbnail} from 'react-bootstrap';
import {GameRequestIcon} from '../js/components/GameRequestIcon';

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

describe('GameRequestIcon', () => {

  const gameRequestIcon = shallow(<GameRequestIcon {...testProps} />);

  it('has a Thumbnail component with cover src and alt property', () => {
    expect(gameRequestIcon.find(Thumbnail).exists()).toBe(true);
    expect(gameRequestIcon.find(Thumbnail).props().src).toEqual(testProps.cover);
    expect(gameRequestIcon.find(Thumbnail).props().alt).toEqual(testProps.name);
  });

  it('has display title of game and has class `game-request-icon-caption`', () => {
    expect(gameRequestIcon.find('h5').text()).toEqual(testProps.name);
    expect(gameRequestIcon.find('h5').hasClass('game-request-icon-caption')).toBe(true);
  });
});
