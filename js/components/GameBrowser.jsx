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
    this.addGameToOffer = this.addGameToOffer.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.getOfferedGameFromUserLib = this.getOfferedGameFromUserLib.bind(this);
  }

  toggleModal(game= {}) {
    this.setState({
      showModal: !this.state.showModal,
      requestedGame: game,
    });
  }

  componentDidMount() {
    let retrievedGames = {};
    this.props.getUserGames();

    //get all Games
    fetch('/getAllGames', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include', // need for session info to persist
    }).then(res => {
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
                    owner: game.owner,
                    gameConsole: game.gameConsole,
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
    });
  }

  // keep function for future feature (offering multiple games at once in trade)
  getOfferedGameFromUserLib() {
    let offGame = {};

    //console.dir(this.props.userGames.games);
   //console.log(game.id);
   // console.log(this.state.offeredGame.id);

    this.props.userGames.games.map((game) => {
      if (game.id === this.state.offeredGame.id) {
        offGame = game;
      }
    });
    return offGame;
  }

  sendRequest() {
    this.props.addRequest([{
      status: 'Pending',
      requestedGame: this.state.allGames[this.state.requestedGame],
      offeredGame: this.state.gameOffer[0],
      path: 'outgoing',
    }]);

    let gameCollection = Object.assign({}, this.state.allGames);
    gameCollection[this.state.requestedGame].status = 'requested';

    // update allGame Collection and close modal
    this.setState({
      showModal: !this.state.showModal,
      allGames: gameCollection,
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
                        key={key}
                      />
                    </Col>
                  ))
                  }
                </Row>
              </Grid>
            </Well>
            <FormGroup controlId="formControlsSelect">
              <FormControl
                onChange={this.addGameToOffer}
                componentClass="select"
                placeholder="select">
                <option>Select Game</option>
                {this.props.userGames.games.map(game => (
                  <option value={game.id}>
                    {game.name}
                  </option>
                ))
                }
              </FormControl>
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
              }

    <Button
                        bsStyle="danger"
                        onClick={this.subtractGameFromOffer.bind(this, game)}
                      >
                        Remove
                      </Button>

              */