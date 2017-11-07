"use strict";

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Modal, Button, Well, FormGroup,
  FormControl, option, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import Menu from './Menu';
import GameRequestDescription from './GameRequestDescription';
import GameRequestIcon from './GameRequestIcon';
import {getUserGames} from '../actions/gameActions';
import {addRequest} from '../actions/requestActions';
import GameCard from './GameCard';
import BrowserSearchBar from './BrowserSearchBar';

/**
  Displays selection of games that user might want to trade for
*/
export class GameBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      requestedGame: {},
      gameOffer: [],
      offeredGame: {},
      allGames: {},
      requestErrorMessage: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.addGameToOffer = this.addGameToOffer.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.fetchGames = this.fetchGames.bind(this);
  }

  /**
   * Used for optimizing render of games
   */

  shouldComponentUpdate(newProps, newState) {
    let shouldUpdate = false;

    if (Object.keys(this.state.allGames).length !== Object.keys(newState).length) {
      return true;
    } else {
      Object.keys(this.state.allGames).forEach((game, key) => {
        if (!shouldUpdate && game.id !== newState[key].id) {
          shouldUpdate = true;
          this.props.clearUserGames();
        }
      });
    }

    return shouldUpdate;
  }

  /**
   * Retrieves user's game library before component mounted
   */
  componentWillMount() {
    this.props.getUserGames();
  }

  componentDidMount() {
    this.fetchGames('nofilter');
  }

   /**
   * After user clicks on desired game in game browser, modal opens and this function presents the desired game
   * in format of GameRequestDescription component within modal
   * @return GameRequestDescription component or null if requestedGame is not found in allGames lib
   */
  getRequestedGame() {
    if (this.state.allGames[this.state.requestedGame] !== undefined) {
      return (<GameRequestDescription
        name={this.state.allGames[this.state.requestedGame].name}
        summary={this.state.allGames[this.state.requestedGame].summary}
        cover={this.state.allGames[this.state.requestedGame].cover}
        key={this.state.allGames[this.state.requestedGame].id}
        screenshots={this.state.allGames[this.state.requestedGame].screenshots}
        owner={this.state.allGames[this.state.requestedGame].owner.username}
      />);
    }
    return null;
  }

  /**
   * After user has selected game to offer and game to receive in trade, this function sends off
   * request to db via props func, addRequest. It also updates the requestedGame status to 'requested'
   *
   */
  sendRequest() {
    if (this.state.gameOffer[0]) {
      this.props.addRequest([{
        status: 'Pending',
        requestedGame: this.state.allGames[this.state.requestedGame],
        offeredGame: this.state.gameOffer[0],
        path: 'outgoing',
      }]);

      const gameCollection = Object.assign({}, this.state.allGames);
      gameCollection[this.state.requestedGame].status = 'requested';

      // update allGame Collection and close modal
      this.setState({
        showModal: !this.state.showModal,
        allGames: gameCollection,
      });
    } else {
      this.setState({
        requestErrorMessage: 'Please select a game to offer'
      });
    }
  }
  /**
   * During trade creation, this function adds game from user library to be offered in trade
   * Iterates over user games to find game user has selected and adds to gamesToAdd
   * this.state.gameOffer state is set from gamesToAdd
   * gamesToAdd is an array to allow for option to offer multiple games at once in future version of app
   * @param event - onChange click event passed from form
   */

  addGameToOffer(event) {
    const gamesToAdd = Array.from(this.state.gameOffer);

    // for only one game offer per trade
    this.props.userGames.games.map((game) => {
      if (game.id.toString() === event.target.value) {
        gamesToAdd[0] = game;
      }
    });

    this.setState({
      gameOffer: gamesToAdd,
      requestErrorMessage: '',
    });
  }

  /**
   * Callback func passed to BrowserSearchBar as prop; it is called when search button clicked within BrowserSearchBar
   * Makes api call to get games library then creates array of games that is compiled in retrievedGames
   * retrievedGames is then stored in this.state.retrievedGames after retrieval is done
   * @param filter - String used as regex to filter out games by name
   */

  fetchGames(filter) {
    let retrievedGames = {};
    const searchFilter = filter.length === 0 ? 'nofilter' : filter;

    // get all Games
    fetch(`/games/getAllGames/${searchFilter}`, {
      method: 'GET',
      headers: {'Content-Type': 'text/html'},
      credentials: 'include', // need for session info to persist
    }).then((res) => {
      if (res.ok) {
        res.json()
          .then((games) => {
            games.forEach((game) => {
              const retrievedGame = {
                [game.id]: {
                  name: game.name,
                  id: game.id,
                  summary: game.summary,
                  cover: game.cover,
                  owner: game.owner,
                  gameConsole: game.gameConsole,
                  screenshots: game.screenshots,
                }
              };
              retrievedGames = Object.assign({}, retrievedGames, retrievedGame);
            });

            this.setState({
              allGames: retrievedGames,
            });
          });
      }
    }).catch((err) => {
      throw err;
    });
  }

  /**
   * toggles modal which is used to search for new games to add to user's library
   * User can select only one game at a time as candidate to add to library.
   * This game is held in state as requestedGame
   * @param game - default obj is empty state
   */

  toggleModal(game = {}) {
    this.setState({
      showModal: !this.state.showModal,
      requestedGame: game,
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <Well>
          <Grid>
            <Row>
              <Col sm={6} xs={12} md={8}>
                <h1 className="section-header">Available Games</h1>
              </Col>
              <Col sm={6} xs={12} md={4}>
                <BrowserSearchBar fetchGames={this.fetchGames} />
              </Col>
            </Row>
            <Row className="game-browser">
              {Object.keys(this.state.allGames).map((game, key) => (
                <Col sm={2} xs={4} key={key}>
                  <div className="game-container">
                    <a onClick={this.toggleModal.bind(this, game)}>
                      <GameRequestIcon
                        name={this.state.allGames[game].name}
                        summary={this.state.allGames[game].summary}
                        status={'available'}
                        cover={this.state.allGames[game].cover}
                      />
                    </a>
                  </div>
                </Col>
              ))
              }
            </Row>
          </Grid>
        </Well>

        {/* This Modal used for creation of trade proposal*/}
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>Request Trade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="modal-sub-header">Requested Game</h2>
            {this.getRequestedGame()}
            <h2 className="modal-sub-header">Your Offer</h2>
            {this.state.gameOffer.map((game, key) => (
              <GameCard
                cover={game.cover}
                name={game.name}
                summary={game.summary}
                key={key}
              />
            ))
            }
            <FormGroup controlId="formControlsSelect">
              <FormControl
                onChange={this.addGameToOffer}
                componentClass="select"
                placeholder="select"
              >
                <option>Select Game</option>
                {this.props.userGames.games.map(game => (
                  <option value={game.id} key={game.id}>
                    {game.name}
                  </option>
                ))
                }
              </FormControl>
              <HelpBlock>{this.state.requestErrorMessage}</HelpBlock>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.toggleModal}>
              Close
            </Button>
            <Button
              className="accept-button"
              onClick={this.sendRequest}
            >
              Send Trade Request
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapPropstoState(state) {
  return {
    userGames: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addRequest,
    getUserGames,
  }, dispatch);
}

export default connect(mapPropstoState, mapDispatchToProps)(GameBrowser);
