import React, {Component} from 'react';
import {Thumbnail, Modal, Button, Media} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addGame, removeGame, completeTrade} from '../actions/gameActions';
import {removeRequest, declineTrade} from '../actions/requestActions';
import {OUTGOING, INCOMING, CANCEL_TRADE, ACCEPT_TRADE, DECLINE_TRADE_OFFER, PENDING,
  ACCEPTED, DECLINED, CANCELLED} from '../constants/requestStrings';
import GameCard from './GameCard';

class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      statusMessage: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
    this.declineTrade = this.declineTrade.bind(this);
    this.removeTrade = this.removeTrade.bind(this);
    this.getActionButtons = this.getActionButtons.bind(this);
    this.getStatusMessage = this.getStatusMessage.bind(this);
    this.setStatusBackgroundColor = this.setStatusBackgroundColor.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  removeTrade() {
    this.props.removeRequest({
      requestedGameId: this.props.requestedGame.id,
      offeredGameId: this.props.offeredGame.id,
     });

    //close modal after action
    this.toggleModal();
  }

  declineTrade(type) {
    this.props.declineTrade({
      type,
      offeredGame: this.props.offeredGame,
      requestedGame: this.props.requestedGame
    });
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
      return 'Your Trade Offer Was Accepted!';
    } else if (this.props.status === DECLINED) {
      return 'Sorry! Your Trade Offer Was Declined.';
    } else if (this.props.status === CANCELLED) {
      return `This Trade Offer Was Cancelled By ${this.props.requestedGame.owner}.`}
      else {
      return '';
    }
  }

  setStatusBackgroundColor(status) {
    if (status === PENDING) {
      return 'request-pending';
     } else if (status === ACCEPTED) {
      return 'request-accepted';
    } else if (status === DECLINED || status === CANCELLED) {
      return 'request-declined';
    }
  }

  getActionButtons() {
    if (this.props.status === PENDING) {
      if (this.props.path === OUTGOING) {
        return (
          <Button bsStyle="danger" onClick={() => {this.declineTrade('Cancelled')}}>{CANCEL_TRADE}</Button>
        );
      }
      else if (this.props.path === INCOMING) {
        return (
          <div className="trade-modal-buttons">
            <Button className="modal-buttons" bsStyle="danger" onClick={() => {this.declineTrade('Declined')}}>{DECLINE_TRADE_OFFER}</Button>
            <Button className="modal-buttons accept-button" onClick={this.acceptTrade}>{ACCEPT_TRADE}</Button>
          </div>
        );
      }
    } else if (this.props.status === ACCEPTED) {
        return (
          <Button bsStyle="danger" onClick={this.removeTrade}>Remove</Button>
        );

    } else if (this.props.status === DECLINED || this.props.status === CANCELLED) {
        return (
          <Button bsStyle="danger" onClick={this.removeTrade}>Remove</Button>
        );
    }
  }

  render() {
    return (
      <div className="request-image">
        <a onClick={this.toggleModal}>
          <img src={this.props.requestedGame.cover} alt={this.props.requestedGame.name} />
          <p className={this.setStatusBackgroundColor(this.props.status)}>{this.props.status}</p>
        </a>
        <Modal
            show={this.state.showModal}
            onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>
              {this.props.requestedGame.name}
              <p className={"status-text " + this.setStatusBackgroundColor(this.props.status)}>Status: {this.props.status}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="modal-message">{this.getStatusMessage()}</h2>
            <p className="owner-text">Owner: {this.props.requestedGame.owner}</p>
            <h3 className="modal-sub-header">Your Request</h3>

            <GameCard
              cover={this.props.requestedGame.cover}
              name={this.props.requestedGame.name}
              summary={this.props.requestedGame.summary}
            />
            <h3 className="modal-sub-header clear-fix">Your Offer</h3>
            <GameCard
              cover={this.props.offeredGame.cover}
              name={this.props.offeredGame.name}
              summary={this.props.offeredGame.summary}
            />
          </Modal.Body>
          <Modal.Footer>
            {this.getActionButtons()}
            <Button bsStyle="primary" onClick={this.toggleModal}>Close</Button>
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
    declineTrade,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
