import React from 'react';
import {shallow} from 'enzyme';
import {Media, Well} from 'react-bootstrap';
import {GameCard} from '../js/components/GameCard';

const initialProps = {
  owner: 'chris',
  cover: 'https://images.igdb.com/igdb/image/upload/t_cover_small/fbwtoie90jibxgkrf6mx.jpg',
  name: 'Skyrim',
  summary: 'A Cool Game'
};

describe('GameCard', () => {
  const gameCard = shallow(<GameCard {...initialProps} />);

  it('has an owner named chris and class: owner-request-text', () => {
    expect(gameCard.find('p').at(0).text()).toEqual('Owner: chris');
    expect(gameCard.find('p').at(0).hasClass('owner-request-text')).toBe(true);
  });

  it('has a Media component', () => {
    expect(gameCard.find(Media).exists()).toBe(true);
  });

  it('has an image element with src url and alt property', () => {
    expect(gameCard.find('img').exists()).toBe(true);
    expect(gameCard.find('img').props().src)
      .toEqual('https://images.igdb.com/igdb/image/upload/t_cover_small/fbwtoie90jibxgkrf6mx.jpg');
    expect(gameCard.find('img').props().alt).toEqual(initialProps.name);
  });

  it('is encapsulated in a Well component', () => {
    expect(gameCard.find(Well).exists()).toBe(true);
  });

  it('has a Media Heading of `Skyrim` and class: `game-header`', () => {
    expect(gameCard.find(Media.Heading).exists()).toBe(true);
    expect(gameCard.find(Media.Heading).props().children).toEqual(initialProps.name);
    expect(gameCard.find(Media.Heading).hasClass('game-header')).toBe(true);
  });

  it('has a paragraph element with summary of `A Cool Game` and class: `summary`', () => {
    expect(gameCard.find('p').at(1).text()).toEqual(initialProps.summary);
    expect(gameCard.find('p').at(1).hasClass('summary')).toBe(true);
  });
});
