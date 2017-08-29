'use strict'

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {Thumbnail, Modal, Grid, Row, Col, Well,
  Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import GameItem from './GameItem';
import {addGame, getUserGames, removeGame } from '../actions/gameActions';
import {gameConsoles} from '../constants/gameConsoles';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      searchTerm: '',
      searchList: [],
      selectedGame: {},
      selectedConsole: 59,

    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
    this.queryGames = this.queryGames.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.highlightGame = this.highlightGame.bind(this);
    this.updateConsole = this.updateConsole.bind(this);
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

  queryGames() {
    this.setState({
      selectedGame: {},
    });

    fetch(`/findGame/${this.state.selectedConsole}/${this.state.searchTerm}`)
      .then((res) => {
        res.json().then((result) => {
          this.setState({
            searchList: JSON.parse(result),
          });
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  updateSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  highlightGame(highlightedGame){

    // unhighlights previously selected game
    this.state.searchList.map(game => {
      ReactDOM.findDOMNode(this.refs[game.id]).style.backgroundColor = 'transparent';
    });
    ReactDOM.findDOMNode(this.refs[highlightedGame.id]).style.backgroundColor = 'lightblue';

    this.setState({
      selectedGame: highlightedGame,
    });
  }

  handleOnClickAdd() {
    this.props.addGame([
      {
        name: this.state.selectedGame.name,
        id: this.state.selectedGame.id,
        summary: this.state.selectedGame.summary,
        cover: this.state.selectedGame.cover,
        gameConsole: this.state.selectedGame.gameConsole,
        screenshots: this.state.selectedGame.screenshots
      }]);
    this.toggleModal(); // close modal
  }

  updateConsole(event) {
    this.setState({
      selectedConsole: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Well>
          <Grid>
            <Row>
              <Col sm={6} xs={12}>
                <h1>My Games</h1>
              </Col>
              <Col sm={4} smOffset={2} xs={12}>
                <Button onClick={this.toggleModal} bsStyle="primary">+ Add Game</Button>
              </Col>
            </Row>
            <Row>
              {this.props.games.games.map((game, key) => (
                <Col sm={2} xs={6} key={game.id}>
                  <GameItem
                    name={game.name}
                    id={game.id}
                    summary={game.summary}
                    cover={game.cover}
                    gameConsole={game.gameConsole}
                    screenshots={game.screenshots}
                  />
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
            <Grid>
              <Row>
                <Col sm={7} xs={9} md={6}>
                  <FormGroup>
                    <FormControl
                      onChange={this.updateSearchTerm}
                      name="name"
                      type="text"
                      placeholder="Search For Games"
                    />
                  </FormGroup>
                </Col>
                <Col sm={1} xs={1}>
                  <Button bsStyle="primary" onClick={this.queryGames}>Search</Button>
                </Col>
              </Row>
              <Row>
                <Col sm={7} xs={9} md={6}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select Console</ControlLabel>
                    <FormControl
                      onChange={this.updateConsole}
                      componentClass="select">
                      {gameConsoles.map(consoleNum => (
                        <option value={consoleNum.id} key={consoleNum.id}>
                          {consoleNum.name}
                        </option>
                      ))
                      }
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={9} xs={12} md={7}>
                  <Well>
                    <Row>
                      {this.state.searchList.map(game => (
                        <a onClick={()=> {this.highlightGame(game)}} key={game.id}>
                          <Col sm={4} xs={4} md={4}>
                            <Thumbnail ref={game.id}>
                              <img src={game.cover} alt={game.name} />
                            </Thumbnail>
                          </Col>
                        </a>
                      ))
                      }
                    </Row>
                  </Well>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.toggleModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleOnClickAdd}>Add Game</Button>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
