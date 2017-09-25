import React, {Component} from 'react';
import {Thumbnail} from 'react-bootstrap';

export class GameRequestIcon extends Component {
  render() {
    return (
      <div>
        <Thumbnail src={this.props.cover} alt={this.props.name}>
          <h5 className="game-request-icon-caption">{this.props.name}</h5>
        </Thumbnail>
      </div>
    );
  }
}

export default GameRequestIcon;
