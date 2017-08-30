import React, {Component} from 'react';
import {Media, Well} from 'react-bootstrap';

class GameCard extends Component {
  render() {
    return (
      <Well>
        <Media>
          <Media.Left>
            <img src={this.props.cover} alt={this.props.name} />
          </Media.Left>
          <Media.Body>
            <Media.Heading className="game-header">{this.props.name}</Media.Heading>
            <p className="summary">{this.props.summary}</p>
          </Media.Body>
        </Media>
      </Well>
    );
  }
}

export default GameCard;