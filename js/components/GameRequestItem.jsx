import React, {Component} from 'react';

class GameRequestItem extends Component {
  render() {
    return (
      <div>
        <Thumbnail src={this.props.cover} alt={this.props.name}>
          <h5>{this.props.name}</h5>
          <h5>{this.props.status}</h5>
        </Thumbnail>
      </div>
    );
  }
}

export default GameRequestItem;
