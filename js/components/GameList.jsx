'use strict'

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {Thumbnail, Modal, Grid, Row, Col, Well,
        Button, FormControl, FormGroup} from 'react-bootstrap';
import GameItem from './GameItem';
import {addGame} from '../actions/gameActions';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      searchTerm:"",
      list: []

    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
    this.queryGames = this.queryGames.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      list: [], //erases search result after every toggle
    });
  }

  queryGames() {
    fetch(`/findGame/${this.state.searchTerm}`)
      .then((res) => {
        res.json().then(result => {
         // console.dir(result);
          this.setState({
            list:JSON.parse(result),
          });
        });


    }).catch(err => {
      console.log(err);
    });


  }

  updateSearchTerm(e) {
    this.setState({
      searchTerm:e.target.value,
    })
  }

  handleOnClickAdd() {



    /*
    this.props.addGame([
      {
        name: 'Red Dead Redemption',
        id: 'Red Dead Redemption',
        description: 'Best Game Ever!'
      }]);*/
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
                <Col sm={2} xs={6} key={key}>
                  <GameItem
                    name={game.name}
                    description={game.description}
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
                      ref="searchTerm"
                      placeholder="Search For Games"
                    />
                  </FormGroup>
                </Col>
                <Col sm={1} xs={1}>
                  <Button bsStyle="primary" onClick={this.queryGames}>Search</Button>
                </Col>
              </Row>
              <Row>
                <Col sm={9} xs={12} md={7}>
                  <Well>
                    <Row>
                    {this.state.list.map((game) => (
                      <Col sm={4} xs={4} md={4} key={game.id}>
                        <Thumbnail>
                          <img src={game.cover} alt={game.name}/>
                        </Thumbnail>
                      </Col>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);

/*  <Thumbnail>
                        <img src={game.cover}/>
                      </Thumbnail>*/
