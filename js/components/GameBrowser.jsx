'use strict'

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Modal, Button, Well, FormGroup,
  FormControl, option, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import GameRequestDescription from './GameRequestDescription';
// import GameRequestItem from './GameRequestItem';
import GameRequestIcon from './GameRequestIcon';
import GameItem from './GameItem';
import {getUserGames} from '../actions/gameActions';
import {addRequest} from '../actions/requestActions';

const userMockCollection =
  {
    LeftForDead:
      {
        name: 'Left For Dead',
        id: 'LeftForDead',
        summary: 'this is a game',
      },
    Skyrim:
      {
        name: 'Skyrim',
        id: 'Skyrim',
        summary: 'this is a game'
      },
    GTA4:
      {
        name: 'GTA 4',
        id: 'GTA4',
        summary: 'this is a game'
      }

  };

class GameBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      requestedGame: {},
      gameOffer: [],
      offeredGame: {},
      allGames: {}
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.addGameToOffer = this.addGameToOffer.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.getOfferedGameFromUserLib = this.getOfferedGameFromUserLib.bind(this);
  }

  toggleModal(game={}) {
    this.setState({
      showModal: !this.state.showModal,
      requestedGame: game,
    });
  }

  componentDidMount() {
    let retrievedGames = {};
    this.props.getUserGames();
    console.dir(this.props.userGames);

    //get all Games
    fetch('/getAllGames')
      .then(res => {
        if (res.ok) {
          res.json().
            then(games => {

              games.forEach(game => {
                let retrievedGame = {
                  [game.id]: {
                    name: game.name,
                    id: game.id,
                    summary: game.summary,
                    cover: game.cover,
                  }
                };
                retrievedGames = Object.assign({}, retrievedGames, retrievedGame);
              });

              this.setState({
                allGames: retrievedGames,
              });
            });
        }
      });
  }


  addGameToOffer() {
    let gamesToAdd = Array.from(this.state.gameOffer);

    if (this.state.offeredGame) {
      //1st line to offer multiple games
      //gamesToAdd.push(this.state.offeredGame);

      //for only one game offer per trade
      gamesToAdd[0] = this.state.offeredGame;
    }

    this.setState({
      gameOffer: gamesToAdd
    })
  }

  subtractGameFromOffer(gameToRemove) {
    let gameOffered = this.state.gameOffer.filter(game => {
      if (game.id != gameToRemove.id) {
        return game;
      }
    });

    this.setState({
      gameOffer: gameOffered
    });
  }

  getOfferedGameFromUserLib() {
    let offGame = {};

    this.props.userGames.games.map((game) => {
      if (game.id === this.state.offeredGame.id) {
        offGame = game;
      }
    });

    return offGame;
  }

  sendRequest() {
    this.props.addRequest([{
      status: 'pending',
      requestedGame: this.state.allGames[this.state.requestedGame],
      //offeredGame: this.state.allGames[this.state.offeredGame.id],
      offeredGame: this.getOfferedGameFromUserLib(),
    }]);

    let gameCollection = Object.assign({}, this.state.allGames);
    gameCollection[this.state.requestedGame].status = 'requested';

    // update allGame Collection and close modal
    this.setState({
      showModal: !this.state.showModal,
      allGames: gameCollection,
    });
  }

  updateSelected(event) {
    this.setState({
      offeredGame: this.state.allGames[event.target.value],
    });
  }

  getRequestedGame() {
    if (this.state.allGames[this.state.requestedGame] !== undefined) {
      return <GameRequestDescription
        name={this.state.allGames[this.state.requestedGame].name}
        summary={this.state.allGames[this.state.requestedGame].summary}
        cover={this.state.allGames[this.state.requestedGame].cover}
        key={this.state.allGames[this.state.requestedGame].id}
      />
    }
    return null;
  }

  render() {
    return (
      <div>
        <Well>
          <Grid>
            <Row>
              <Col sm={6} xs={12}>
                <h1>Available Games</h1>
              </Col>
            </Row>
            <Row>   {/** show all games available**/}
              {Object.keys(this.state.allGames).map((game, key) => (
                <Col sm={2} xs={6} key={key}>
                  <a onClick={this.toggleModal.bind(this, game)}>
                    <GameRequestIcon
                      name={this.state.allGames[game].name}
                      summary={this.state.allGames[game].summary}
                      status={'available'}
                      cover={this.state.allGames[game].cover}
                      key={key}
                    />
                  </a>
                </Col>
              ))
              }
            </Row>
          </Grid>
        </Well>

        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>Request Trade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Requested Game</h2>
            {this.getRequestedGame()}
            <h2>Your Offer</h2>{/**games to offer**/}
            <Well>
              <Grid>
                <Row>
                  {this.state.gameOffer.map((game, key) => (
                    <Col sm={2} xs={6} key={key}>
                      <GameItem
                        cover={game.cover}
                        name={game.name}
                      />
                      <Button
                        bsStyle="danger"
                        onClick={this.subtractGameFromOffer.bind(this, game)}
                      >
                        Remove
                      </Button>
                    </Col>
                  ))
                  }
                </Row>
              </Grid>
            </Well>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Game</ControlLabel>
              <FormControl
                onChange={this.updateSelected}
                componentClass="select"
                placeholder="select">
                {this.props.userGames.games.map(game => (
                  <option value={game.id}>
                    {game.name}
                  </option>
                ))
                }
              </FormControl>
                <Button bsStyle="primary" onClick={this.addGameToOffer}>
                  Add Game
                </Button>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal}>
              Close
            </Button>
            <Button
              bsStyle="primary"
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

/*
{Object.keys(this.state.allGames).map((game, key) => (
                <Col sm={2} xs={6} key={key}>
                  <a onClick={this.toggleModal.bind(this, game)}>
                    <GameRequestIcon
                      name={this.state.allGames[game].name}
                      summary={this.state.allGames[game].summary}
                      status={'available'}
                      cover={this.state.allGames[game].cover}
                    />
                  </a>
                </Col>
              ))
              }*/