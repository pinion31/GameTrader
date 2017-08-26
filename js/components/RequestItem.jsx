import React, {Component} from 'react';
import {Thumbnail, Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addGame, removeGame} from '../actions/gameActions';
import {removeRequest} from '../actions/requestActions';

class RequestItem extends Component {
   constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

  this.toggleModal = this.toggleModal.bind(this);
  this.acceptTrade = this.acceptTrade.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  acceptTrade() {
    this.props.addGame([
    {
      name: this.props.requestedGame.name,
      id: this.props.requestedGame.id,
      summary: this.props.requestedGame.summary,
      cover: this.props.requestedGame.cover,
      gameConsole: this.props.requestedGame.gameConsole
    }]);

    this.props.removeRequest({
      requestToRemove: this.props.requestedGame,
     });

    //removed offered game from user's library
    this.props.removeGame({
      id:this.props.offeredGame.id,

    });

    //close modal after action
    this.toggleModal();

  }

  render() {
    return (
      <div>
        <a onClick={this.toggleModal}>
          <Thumbnail src={this.props.requestedGame.cover} alt={this.props.requestedGame.name}>
            <p>Status:{this.props.status}</p>
            <p>{this.props.requestedGame.name}</p>
          </Thumbnail>
        </a>
        <Modal
            show={this.state.showModal}
            onHide={this.toggleModal}
        >
            <Modal.Header>
              <Modal.Title>{this.props.requestedGame.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Your Request:</h4>
                <Thumbnail src={this.props.requestedGame.cover} alt={this.props.requestedGame.name} />
                <p>Owner: Big Queen</p>
                <p>Status:{this.props.status}</p>
                <h4>Your Offer:</h4>
                <Thumbnail src={this.props.offeredGame.cover} alt={this.props.offeredGame.name} />
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.toggleModal}>Close</Button>
              <Button bsStyle="primary" onClick={this.acceptTrade}>Accept Trade</Button>
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
    addGame,
    removeRequest,
    removeGame,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
