import React, {Component} from 'react';
import {Thumbnail} from 'react-bootstrap';

class GameItem extends Component {
  render() {
    return (
      <Thumbnail src="" alt={this.props.name}>
        <h5>{this.props.name}</h5>
        <p>{this.props.description}</p>
      </Thumbnail>
    );
  }
}

export default GameItem;
