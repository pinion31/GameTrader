import React, {Component} from 'react';
import {Thumbnail, Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addGame, removeGame, completeTrade} from '../actions/gameActions';
import {removeRequest} from '../actions/requestActions';
import {OUTGOING, INCOMING, CANCEL_TRADE, ACCEPT_TRADE, DECLINE_TRADE, PENDING,
  ACCEPTED, DECLINED} from '../constants/requestStrings';

class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      statusMessage:'',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
    this.rejectTrade = this.rejectTrade.bind(this);
    this.getActionButtons = this.getActionButtons.bind(this);
    this.getStatusMessage = this.getStatusMessage.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  rejectTrade() {
    this.props.removeRequest({
      requestedGameId: this.props.requestedGame.id,
      offeredGameId: this.props.offeredGame.id,
     });

    //close modal after action
    this.toggleModal();
  }

  acceptTrade() {
    // sends info for backend process of transaction for trader
    this.props.completeTrade({
      offeredGame: this.props.offeredGame,
      requestedGame: this.props.requestedGame
    });

    this.props.removeRequest({
      requestedGameId: this.props.requestedGame.id,
      offeredGameId: this.props.offeredGame.id,
     });

    // close modal after action
    this.toggleModal();
  }

  getStatusMessage() {
    if (this.props.status === ACCEPTED) {
      return 'Congratulations! Your trade offer was accepted!';
    } else if (this.props.status === DECLINED) {
      return 'Unfortunately, your trade offer was declined';
    }
    else {
      return '';
    }
  }

  getActionButtons() {
    if (this.props.status === PENDING) {
      if (this.props.path === OUTGOING) {
        return (
          <Button bsStyle="danger" onClick={this.rejectTrade}>{CANCEL_TRADE}</Button>
        );
      }
      else if (this.props.path === INCOMING) {
        return (
          <div>
            <Button bsStyle="danger" onClick={this.rejectTrade}>{DECLINE_TRADE}</Button>
            <Button bsStyle="primary" onClick={this.acceptTrade}>{ACCEPT_TRADE}</Button>
          </div>
        );
      }
    } else if (this.props.status === ACCEPTED) {
        return (
          <Button bsStyle="danger" onClick={this.rejectTrade}>Remove</Button>
        );

    } else if (this.props.status === DECLINED) {
        return (
          <Button bsStyle="danger" onClick={this.rejectTrade}>Remove</Button>
        );
    }

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
                <h4>{this.getStatusMessage()}</h4>
                <h4>Your Request:</h4>
                 <Thumbnail src={this.props.requestedGame.cover} alt={this.props.requestedGame.name} />
                <p>Owner: {this.props.requestedGame.owner}</p>
                <p>Status:{this.props.status}</p>
                <h4>Your Offer:</h4>
                <Thumbnail src={this.props.offeredGame.cover} alt={this.props.offeredGame.name} />
            </Modal.Body>

            <Modal.Footer>
              {this.getActionButtons()}
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
    addGame,
    removeRequest,
    removeGame,
    completeTrade,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
