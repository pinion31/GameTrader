import React, {Component} from 'react';
import {Grid, Row, Col, Modal, Button, Well, FormGroup,
  FormControl, option, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import GameItem from './GameItem';

const mockGameCollection =
  {
    DukeNukem :
      {
        name: 'Duke Nukem',
        id: 'DukeNukem',
        description: 'this is a game'
      }
    ,
    Fallout4:
      {
        name: 'Fallout 4',
        id: 'Fallout4',
        description: 'this is a game'
      }
    ,
  };

const userMockCollection =
  {
    LeftForDead:
      {
        name: 'Left For Dead',
        id: 'LeftForDead',
        description: 'this is a game',
      },
    Skyrim:
      {
        name: 'Skyrim',
        id: 'Skyrim',
        description: 'this is a game'
      },
    WalkingDead:
      {
        name: 'Walking Dead',
        id: 'WalkingDead',
        description: 'this is a game'
      }

  };

class GameBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      requestedGame:{},
      gameOffer:[],
      selectedGame:{}
    };
  }

  toggleModal(game={}) {
    this.setState({
      showModal:!this.state.showModal,
      requestedGame: game,
    })
  }

  addGameToOffer() {
    let gamesToAdd = this.state.gameOffer;
    if (this.state.selectedGame) {
      gamesToAdd.push(this.state.selectedGame);
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

  updateSelected(event) {
    this.setState({
      selectedGame: userMockCollection[event.target.value],
    })
  }

  getRequestedGame() {
    if (mockGameCollection[this.state.requestedGame] !== undefined) {
      return <GameItem
        name={mockGameCollection[this.state.requestedGame].name}
        description={mockGameCollection[this.state.requestedGame].description}
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
              {Object.keys(mockGameCollection).map((game, key) => (
                <Col sm={2} xs={6} key={key}>
                  {/** activate modal**/}
                  <a onClick={this.toggleModal.bind(this, game)}>
                    <GameItem
                      name={mockGameCollection[game].name}
                      description={mockGameCollection[game].description}
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
          onHide={this.toggleModal.bind(this)}
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
                        name={game.name}
                        description={game.description}
                      />
                      <Button onClick={this.subtractGameFromOffer.bind(this, game)}>
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
                onChange={this.updateSelected.bind(this)}
                componentClass="select"
                placeholder="select">
                {Object.keys(userMockCollection).map(game => (
                  <option value={userMockCollection[game].id}>
                    {userMockCollection[game].name}
                  </option>
                ))
                }
              </FormControl>
                <Button onClick={this.addGameToOffer.bind(this)}>
                  Add Game
                </Button>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this)}>
              Close
            </Button>
            <Button bsStyle="primary">Send Trade Request</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapPropstoState() {

}

export default GameBrowser;
