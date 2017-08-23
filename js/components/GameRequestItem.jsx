import React, {Component} from 'react';
import {Thumbnail} from 'react-bootstrap';

class GameRequestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div>
        <Thumbnail src="" alt={this.props.name}>
          <h5>{this.props.name}</h5>
          <h5>{this.props.status}</h5>
        </Thumbnail>
      </div>
    );
  }
}

export default GameRequestItem;
