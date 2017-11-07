"use strict";

import React, {Component} from 'react';
import {Media, Well} from 'react-bootstrap';

/* Presentational component used to display Game in GameBrowser and GameItem */
const GameCard = (props) => {

  /**
 * retrieves owner of game from props to be presented in component
 */
  const displayOwner = () => {
    if (props.owner) {
      return (
        <p className="owner-request-text">Owner: {props.owner}</p>
      );
    }
  };

  return (
    <Well>
      <Media>
        <Media.Left>
          <img src={props.cover} alt={props.name} />
        </Media.Left>
        <Media.Body>
          {displayOwner()}
          <Media.Heading className="game-header">{props.name}</Media.Heading>
          <p className="summary">{props.summary}</p>
        </Media.Body>
      </Media>
    </Well>
  );
};

export default GameCard;
