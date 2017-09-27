import React from 'react';
import {shallow} from 'enzyme';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import RequestItem from '../js/components/RequestItem';
import {RequestList} from '../js/components/RequestList';

const defaultState = {
  sessionUser: 'chris'
};

const defaultProps = {
    getUserRequests: () => {},
    addRequest: () => {},
    removeRequest: () => {},
    clearUserRequests: () => {},
    sessionUser: 'chris',
    requests: {
      requests: [
        {
            "path" : "outgoing",
            "offeredGame" : {
                "name" : "Assassin's Creed III",
                "id" : 1266,
                "summary" : "The American Colonies, 1775. A brave young warrior fights to save his homeland. But what begins as a struggle over territory turns into an extraordinary journey that will transform him into a Master Assassin—and will forever change the destiny of a nation. \n \nYou are Connor, warrior son of a Native American mother and British father. As the colonies draw closer to revolution, you will dedicate your life to the freedom of your clan –becoming the spark that ignites the revolution into full blaze. Your crusade will take you through blood-soaked battlefields to crowded city streets, to perilous wilderness and beyond. You will not only witness history—you will make it. \nWelcome to an entirely new chapter in the Assassin’s Creed saga.",
                "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/esr2k3gudxkwyvnxz2ur.jpg",
                "gameConsole" : "12",
                "screenshots" : [
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/fjsea0ufemtie04czf9m.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/nyy6injtxg9grtmuoa1m.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/ccfvfvn8w5ucmtaw9uu2.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/mazwxafpn4trr1egmj7j.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/lwbc2mifimzfmyxt6r56.jpg"
                ],
                "owner" : "sonic123"
            },
            "requestedGame" : {
                "status" : "requested",
                "screenshots" : [
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/f3fc6zqdew83zu4dgwdf.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/cfb4kvjf2ygttbreazar.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/oornljaohheldfdli4tx.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/e9wm1jbpfbaflmvvldio.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/jonqwskjocnykh9s6gug.jpg"
                ],
                "gameConsole" : "49",
                "owner" : "christopher",
                "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/fbwtoie90jibxgkrf6mx.jpg",
                "summary" : "Skyrim special edition is a remaster of the classic from 2011. Now with upgraded visuals along with Xbox One and PS4 Releases. \n \nSkyrim reimagines and revolutionises the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose. \n \nLIVE ANOTHER LIFE, IN ANOTHER WORLD \nPlay any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realised like never before. \n \nALL NEW GRAPHICS AND GAMEPLAY ENGINE \nSkyrim’s new game engine brings to life a complete virtual world with rolling clouds, rugged mountains, bustling cities, lush fields, and ancient dungeons. \n \nYOU ARE WHAT YOU PLAY \nChoose from hundreds of weapons, spells, and abilities. The new character system allows you to play any way you want and define yourself through your actions. \n \nDRAGON RETURN \nBattle ancient dragons like you’ve never seen. As Dragonborn, learn their secrets and harness their power for yourself.",
                "id" : 19457,
                "name" : "The Elder Scrolls V: Skyrim Special Edition"
            },
            "status" : "Pending"
        },
        {
            "path" : "outgoing",
            "offeredGame" : {
                "name" : "Batman: Arkham Knight",
                "id" : 5503,
                "summary" : "Batman: Arkham Knight brings the award-winning Arkham trilogy from Rocksteady Studios to its epic conclusion. Developed exclusively for New-Gen platforms, Batman: Arkham Knight introduces Rocksteady's uniquely designed version of the Batmobile. The highly anticipated addition of this legendary vehicle, combined with the acclaimed gameplay of the Arkham series, offers gamers the ultimate and complete Batman experience as they tear through the streets and soar across the skyline of the entirety of Gotham City. In this explosive finale, Batman faces the ultimate threat against the city that he is sworn to protect, as Scarecrow returns to unite the super criminals of Gotham and destroy the Batman forever.",
                "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/fl5andebb8iyamhyeu0o.jpg",
                "gameConsole" : "49",
                "screenshots" : [
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/hbojfbsnbb78z3hylgb7.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/icbnh9stxg40u6pkt0kx.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/wmjd1zlobwg78zzurywo.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/ypn0ijplzdch62wkxooz.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/hftgwict0ynjc2bilthk.jpg"
                ],
                "owner" : "sonic123"
            },
            "requestedGame" : {
                "status" : "requested",
                "screenshots" : [
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/c9xalka7stjkx4mes7kp.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/whddwtc2bwjpgbokeywn.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/mmogczn9mfakkb0qjijk.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/xegpfnsvlyeld0zkjnrc.jpg",
                    "https://images.igdb.com/igdb/image/upload/t_screenshot_med/gn7mnuls0gtq6doutjny.jpg"
                ],
                "gameConsole" : "49",
                "owner" : "christopher",
                "cover" : "https://images.igdb.com/igdb/image/upload/t_cover_small/tvqctso5qxkvfwmq0n1m.jpg",
                "summary" : "Developed by the creators of Grand Theft Auto V and Red Dead Redemption, Red Dead Redemption 2 is an epic tale of life in America’s unforgiving heartland. The game's vast and atmospheric world will also provide the foundation for a brand new online multiplayer experience.",
                "id" : 25076,
                "name" : "Red Dead Redemption 2"
            },
            "status" : "Pending"
        }
    ]
  },
};
//expect(requestList.find(Well)
describe('RequestList', () => {

  const requestList = shallow(<RequestList {...defaultProps} />);

  it('initializes to default state', () => {
    expect(requestList.state()).toEqual(defaultState);
  })
  it('is encapsulated in a Well component', () => {
    expect(requestList.find(Well).exists()).toBe(true);
  });

  it('has a title called My Requests and class: section-header', () => {
    expect(requestList.find('h1').props().children).toEqual('My Requests');
    expect(requestList.find('h1').hasClass('section-header')).toBe(true);
  });

  it('has a welcome title message for user, christopher with class: welcome-message', () => {
    expect(requestList.find('h3').props().children).toEqual(`Welcome, ${defaultState.sessionUser}`);
    expect(requestList.find('h3').hasClass('welcome-message')).toBe(true);
  });

  it('has two RequestItems', () => {
    expect(requestList.find(RequestItem).at(0).exists()).toBe(true);
    expect(requestList.find(RequestItem).at(1).exists()).toBe(true);
  });

  it('has a RequestItem with requestedGame: Skyrim, path: OUTGOING, status: PENDING, offeredGame: Assassins Creed III', () => {
    expect(requestList.find(RequestItem).at(0).props().requestedGame).toEqual(defaultProps.requests.requests[0].requestedGame);
    expect(requestList.find(RequestItem).at(0).props().offeredGame).toEqual(defaultProps.requests.requests[0].offeredGame);
    expect(requestList.find(RequestItem).at(0).props().path).toEqual(defaultProps.requests.requests[0].path);
    expect(requestList.find(RequestItem).at(0).props().status).toEqual(defaultProps.requests.requests[0].status);
  });

  it('has another RequestItem with requestedGame: Red Dead Redemption 2, path: OUTGOING, status: PENDING, and offeredGame: Batman: Arkham Knight', () => {
    expect(requestList.find(RequestItem).at(1).props().requestedGame).toEqual(defaultProps.requests.requests[1].requestedGame);
    expect(requestList.find(RequestItem).at(1).props().offeredGame).toEqual(defaultProps.requests.requests[1].offeredGame);
    expect(requestList.find(RequestItem).at(1).props().path).toEqual(defaultProps.requests.requests[1].path);
    expect(requestList.find(RequestItem).at(1).props().status).toEqual(defaultProps.requests.requests[1].status);
  });
});
