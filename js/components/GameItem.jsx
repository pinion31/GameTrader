import React, {Component} from 'react';
import {Thumbnail, Modal, Button} from 'react-bootstrap';
import {gameConsoles} from '../constants/gameConsoles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeGame} from '../actions/gameActions';

class GameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  convertConsoleNumToConsoleName(id) {
    let publisher = '';

    gameConsoles.map(gameConsole => {
      if (gameConsole.id.toString() === this.props.gameConsole) {
       publisher = gameConsole.name;
      }
    });
    return publisher;
  }

  handleOnClick() {
    this.props.removeGame({
      id: this.props.id,
    });

    this.toggleModal();
  }

  render() {
    return (
      <div>
        <a onClick={this.toggleModal}>
          <Thumbnail src={this.props.cover} alt={this.props.name}>
          </Thumbnail>
        </a>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>{this.props.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.props.summary}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleOnClick}>Remove Game</Button>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeGame,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameItem);
