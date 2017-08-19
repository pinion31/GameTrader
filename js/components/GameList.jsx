'use strict'

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import GameItem from './GameItem';
import {addGame} from '../actions/gameActions';

class GameList extends Component {

  handleOnClickAdd() {
    this.props.addGame([
      {
        name: 'Red Dead Redemption',
        id: '',
        description: 'Best Game Ever!'
      }]);
  }

  render() {
    return (
      <Well>
        <Grid>
          <Row>
            <Col sm={6} xs={12}>
              <h1>My Games</h1>
            </Col>
            <Col sm={4} smOffset={2} xs={12}>
              <Button onClick={this.handleOnClickAdd.bind(this)} bsStyle="primary">+ Add Game</Button>
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
    addGame: addGame,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
