import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {Modal, Grid, Row, Col, Well,
  Button, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import GameItem from './GameItem';
import {addGame, getUserGames, removeGame, clearUserGames} from '../actions/gameActions';
import {gameConsoles} from '../constants/gameConsoles';

export class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      searchTerm: '',
      searchList: [],
      selectedGame: {},
      selectedConsole: 0,
      searchTermMessage: '',
      consoleSearchMessage: '',
      gameSearchMessage: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
    this.queryGames = this.queryGames.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.highlightGame = this.highlightGame.bind(this);
    this.updateConsole = this.updateConsole.bind(this);
    this.verifySearchQuery = this.verifySearchQuery.bind(this);
    this.verifyClientDoesNotOwnGame = this.verifyClientDoesNotOwnGame.bind(this);
  }

  componentWillMount() {
    // clears out any game (and DOM elements)
    // from previous sessions (from other users)
    // that do not belong to current user
    this.props.clearUserGames();
  }

  componentDidMount() {
    this.props.getUserGames();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      searchList: [], // erases search result after every toggle
    });
  }

  verifySearchQuery() {
    if (this.state.searchTerm.length === 0) {
      this.setState({
        searchTermMessage: 'Please enter a game title to search.',
      });
      return false;
    }

    if (this.state.selectedConsole === 0) {
      this.setState({
        consoleSearchMessage: 'Please select a gaming console.',
      });
      return false;
    }
    return true;
  }

  queryGames() {
    this.setState({
      selectedGame: {},
    });

    if (this.verifySearchQuery()) {
      fetch(`/games/findGame/${this.state.selectedConsole}/${this.state.searchTerm}`)
        .then((res) => {
          res.json().then((result) => {
            if (result.length > 0) {
              try {
                // add Well only after search results have been returned
                ReactDOM.findDOMNode(this.refs['searchWell']).className = 'well';
              } catch(e) {
                throw e;
              }

              this.setState({
                searchList: JSON.parse(result),
              });
            } else {
              this.setState({
                gameSearchMessage: 'No games found. Please try another search term.',
              });
            }
          });
        }).catch((err) => {
          throw err;
        });
    }
  }

  updateSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
      searchTermMessage: '',
      gameSearchMessage: '',
    });
  }

  highlightGame(highlightedGame) {
    // unhighlights previously selected game
    this.state.searchList.map((game) => {
      ReactDOM.findDOMNode(this.refs[game.id]).style.backgroundColor = 'transparent';
    });
    ReactDOM.findDOMNode(this.refs[highlightedGame.id]).style.backgroundColor = '#46af2c';

    this.setState({
      selectedGame: highlightedGame,
      gameSearchMessage: '',
    });
  }

  verifyClientDoesNotOwnGame() {
    // checks to see if client already has game in their collection
    let doesNotOwnGame = true;
    Array.from(this.props.games.games).map((game) => {
      if (game.id.toString() === this.state.selectedGame.id.toString()) {
        this.setState({
          gameSearchMessage: 'This game already exists in your library.',
        });
        doesNotOwnGame = false;
      }
    });
    return doesNotOwnGame;
  }

  handleOnClickAdd() {
    if (this.verifyClientDoesNotOwnGame()) {
      this.props.addGame([
        {
          name: this.state.selectedGame.name,
          id: this.state.selectedGame.id,
          summary: this.state.selectedGame.summary,
          cover: this.state.selectedGame.cover,
          gameConsole: this.state.selectedGame.gameConsole,
          screenshots: this.state.selectedGame.screenshots,
        }]);
      this.toggleModal(); // close modal
    }
  }

  updateConsole(event) {
    this.setState({
      selectedConsole: parseInt(event.target.value, 10),
      consoleSearchMessage: '',
    });
  }

  render() {
    return (
      <div>
        <Well>
          <Grid>
            <Row>
              <Col sm={12} xs={12}>
                <Button bsSize="large" onClick={this.toggleModal} className="accept-button add-game-button">+ Add Game</Button>
                <h1 className="section-header">My Games</h1>
              </Col>
            </Row>
            <Row>
              {this.props.games.games.map(game => (
                <Col sm={2} xs={4} key={game.id}>
                  <div className="game-container">
                    <GameItem
                      name={game.name}
                      id={game.id}
                      summary={game.summary}
                      cover={game.cover}
                      gameConsole={game.gameConsole}
                      screenshots={game.screenshots}
                      mongoId={game._id}
                    />
                  </div>
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
            <Modal.Title>Find Game</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Row>
                <Col sm={10} xs={8} md={10}>
                  <FormGroup>
                    <FormControl
                      onChange={this.updateSearchTerm}
                      name="name"
                      type="text"
                      placeholder="Search For Games"
                    />
                  </FormGroup>
                  <HelpBlock>{this.state.searchTermMessage}</HelpBlock>
                </Col>
                <Col sm={1} xs={1}>
                  <Button bsStyle="primary" onClick={this.queryGames}>Search</Button>
                </Col>
              </Row>
              <Row>
                <Col sm={10} xs={9} md={10}>
                  <FormGroup controlId="formControlsSelect">
                    <FormControl
                      onChange={this.updateConsole}
                      componentClass="select"
                    >
                      <option value={0}>Select Console</option>
                      {gameConsoles.map(consoleNum => (
                        <option value={consoleNum.id} key={consoleNum.id}>
                          {consoleNum.name}
                        </option>
                      ))
                      }
                    </FormControl>
                    <HelpBlock>{this.state.consoleSearchMessage}</HelpBlock>
                    <HelpBlock>{this.state.gameSearchMessage}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} xs={12} md={12}>
                  <div ref="searchWell">
                    <Row>
                      {this.state.searchList.map(game => (
                        <Col sm={3} xs={6}>
                          <div className="game-container" key={game.id}>
                            <a onClick={() => { this.highlightGame(game); }} key={game.id}>
                              <img className="game-item" src={game.cover} alt={game.name} ref={game.id} max-width={90} max-height={128} />
                            </a>
                          </div>
                        </Col>
                      ))
                      }
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.toggleModal}>Close</Button>
            <Button className="accept-button addGame-button" onClick={this.handleOnClickAdd}>Add Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addGame,
    getUserGames,
    removeGame,
    clearUserGames,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
