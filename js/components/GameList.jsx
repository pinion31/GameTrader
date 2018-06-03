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

/**
* Component used to display users current games and add new currently owned games via search Modal
*/
export class GameList extends Component {
  constructor(props) {
    super(props);
    this.shouldUpdate = false;
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

  /**
   * Used for optimizing render of games
   */

  shouldComponentUpdate(newProps, newState) {
    if (this.props.games.games.length !== newProps.games.games.length) {
      return true;
    } else {
      this.props.games.games.forEach((game, key) => {
        if (!this.shouldUpdate && game.id !== newProps.games.games[key].id) {
          this.shouldUpdate = true;
        }
      });
    }
    return this.shouldUpdate;
  }

  /**
   * Upon component mounting, makes api call to retrieve user games and stored as prop, games
   */
  componentDidMount() {
    this.props.getUserGames();
  }

  /**
   * Used to toggle modal (modal used to search for games to add to user lib)
   * on/off state stored in showModal
   */

  toggleModal() {
    const {showModal} = this.state;
    this.shouldUpdate = true;
    this.setState({
      showModal: !showModal,
      searchList: [], // set empty state here to erase search results after every toggle
    });
  }

  /**
   * Verifies input from user; User must enter a searchTerm for game search and must select a game console
   * @return {Boolean} - true if verification passes or false with error message if not
   */

  verifySearchQuery() {
    const {searchTerm, selectedConsole} = this.state;

    if (searchTerm.length === 0) {
      this.setState({
        searchTermMessage: 'Please enter a game title to search.',
      });
      return false;
    }

    if (selectedConsole === 0) {
      this.setState({
        consoleSearchMessage: 'Please select a gaming console.',
      });
      return false;
    }
    return true;
  }

  /**
   * Makes api call with search criteria (game name and console). This function is used when
   * user wants to add a currently owned game to their library.
   * Results are stored in this.state.searchList or error message if no games found
   */

  queryGames() {
    const {selectedConsole, searchTerm} = this.state;

    this.setState({
      selectedGame: {},
    });

    if (this.verifySearchQuery()) {
      fetch(`/games/findGame/${selectedConsole}/${searchTerm}`)
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

  /**
   * keeps searchTerm state updated as user enters search input
   * @param e - onChange event object passed from form
   */

  updateSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
      searchTermMessage: '',
      gameSearchMessage: '',
    });
  }

  /**
   * Presentational function used to highlight game from game search results in modal
   * Highlighted game will be current candidate to add to user lib
   * Candidate game is stored in state as selectedGame
   * @param {Object} candidate game to add to lib
   */

  highlightGame(highlightedGame) {
    const {searchList} = this.state;
    // unhighlights previously selected game
    searchList.map((game) => {
      ReactDOM.findDOMNode(this.refs[game.id]).style.backgroundColor = 'transparent';
    });
    ReactDOM.findDOMNode(this.refs[highlightedGame.id]).style.backgroundColor = '#46af2c';

    this.setState({
      selectedGame: highlightedGame,
      gameSearchMessage: '',
    });
  }

  /**
   *  checks to see if user is trying to add game already in their collection
   * @return {Boolean} false if user owns game; true otherwise
   */
  verifyClientDoesNotOwnGame() {
    const {selectedGame} = this.state;
    let doesNotOwnGame = true;

    Array.from(this.props.games.games).map((game) => {
      if (game.id) {
        if (game.id.toString() === selectedGame.id.toString()) {
          this.setState({
            gameSearchMessage: 'This game already exists in your library.',
          });
          doesNotOwnGame = false;
        }
      }
    });
    return doesNotOwnGame;
  }

  /**
   * Adds currently selected Game to user library to be used in game trades and closes modal
   * Verifys user does not already own game before adding
   * Makes api call and sends game info to db via prop func, addGame.
   */
  handleOnClickAdd() {
    const {selectedGame} = this.state;
    if (this.verifyClientDoesNotOwnGame()) {
      this.props.addGame([
        {
          name: selectedGame.name,
          id: selectedGame.id,
          summary: selectedGame.summary,
          cover: selectedGame.cover,
          gameConsole: selectedGame.gameConsole,
          screenshots: selectedGame.screenshots,
        }]);
      this.toggleModal(); // closes modal
    }
  }

  /**
   * Before searching for game to add to lib, user must select console. This func updates selectedConsole based
   * on drop-down. Selectedconsole is then used to filter games via console
   * @param event {Event} - onChange event object
   */
  updateConsole(event) {
    this.setState({
      selectedConsole: parseInt(event.target.value, 10),
      consoleSearchMessage: '',
    });
  }

  render() {
    const {
      showModal,
      searchList,
      searchTermMessage,
      selectedGame,
      gameSearchMessage,
      consoleSearchMessage,
    } = this.state;

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

      {/* This modal used to search for games to add to user lib*/}
        <Modal
          show={showModal}
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
                  <HelpBlock>{searchTermMessage}</HelpBlock>
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
                    <HelpBlock>{consoleSearchMessage}</HelpBlock>
                    <HelpBlock>{gameSearchMessage}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} xs={12} md={12}>
                  <div ref="searchWell">
                    <Row>
                      {searchList.map(game => (
                        <Col sm={3} xs={6} key={game.id}>
                          <div className="game-container">
                            <a onClick={() => { this.highlightGame(game); }}>
                              <img className="game-item" src={game.cover} alt={game.name} ref={game.id} />
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
            { selectedGame.id &&
              <Button className="accept-button addGame-button" onClick={this.handleOnClickAdd}>Add Game</Button>
            }
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
