"use strict";

import React from 'react';
import {Thumbnail} from 'react-bootstrap';

/* Presentational Component used to display Game Requests via Thumbnail
*/
export const GameRequestIcon = (props) => {
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
