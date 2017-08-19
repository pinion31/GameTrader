"use strict"

import React, {Component} from 'react';
import {connect} from 'react-redux';

class GameList extends Component {
 /* constructor(props) {
    super(props);
    this.state = {
      games: this.props.games,
    };
  }

  componentDidMount() {
    this.setState({
      games: this.props.games,
    });
  }*/

  render() {
    console.dir(this.props.games.games);
    const list = this.props.games.games.map((game, key) => (
      <h1 key={key}>{game.name}</h1>

      ));

    return (
    <div>
    {list}
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(mapStateToProps)(GameList);
