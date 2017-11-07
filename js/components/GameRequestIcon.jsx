"use strict";

import React from 'react';
import {Thumbnail} from 'react-bootstrap';

/* Presentational Component used to display Game Requests via Thumbnail
*/
const GameRequestIcon = (props) => {
  return (
    <div>
      <Thumbnail src={props.cover} alt={props.name}>
        <h5 className="game-request-icon-caption">{props.name}</h5>
      </Thumbnail>
    </div>
  );
};

export default GameRequestIcon;
