"use strict";

import React, {Component} from 'react';
import {Media, Well} from 'react-bootstrap';

/* Presentational component used to display Game in GameBrowser and GameItem */
export const GameCard = (props) => {

  /**
 * retrieves owner of game from props to be presented in component
 */
  displayOwner() {
    if (this.props.owner) {
      return (
        <p className="owner-request-text">Owner: {this.props.owner}</p>
      );
    }
  }

  render() {
    return (
      <Well>
        <Media>
          <Media.Left>
            <img src={this.props.cover} alt={this.props.name} />
          </Media.Left>
          <Media.Body>
            {this.displayOwner()}
            <Media.Heading className="game-header">{this.props.name}</Media.Heading>
            <p className="summary">{this.props.summary}</p>
          </Media.Body>
        </Media>
      </Well>
    );
  }
}

export default GameCard;
