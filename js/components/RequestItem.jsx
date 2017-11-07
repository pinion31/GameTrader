"use strict";

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeTrade} from '../actions/gameActions';
import {removeRequest, declineTrade} from '../actions/requestActions';
import {OUTGOING, INCOMING, CANCEL_TRADE, ACCEPT_TRADE, DECLINE_TRADE_OFFER, PENDING,
  ACCEPTED, DECLINED, CANCELLED} from '../constants/requestStrings';
import GameCard from './GameCard';

/** Component used to display Game Request within RequestList */
export class RequestItem extends Component {
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

  /**
   * returns status message for user within modal depending on trade status after action taken by other user
   * Message will inform user if trade was accepted, cancelled, or declined
   * @return {String} - Message informing user of trade status
   */
  getStatusMessage() {
    if (this.props.status === ACCEPTED) {
      return 'Your Trade Offer Was Accepted!';
    } else if (this.props.status === DECLINED) {
      return 'Sorry! Your Trade Offer Was Declined.';
    } else if (this.props.status === CANCELLED) {
      return `This Trade Offer Was Cancelled By ${this.props.requestedGame.owner.username}.`;
    }
    return '';
  }

  /**
   * Dynamically sets action buttons for user depending trade status (ex. User can accept trade
   * only if initial trader has not reconsidered and cancelled trader. In that case, Accept Trade button
   * will not be available. Instead, remove button will only be available)
   * @return {Button} - returns Button component depending on possible actions (ex. Accept trade, cancel trade)
   */
  getActionButtons() {
    if (this.props.status === PENDING) {
      if (this.props.path === OUTGOING) {
        return (
          <Button bsStyle="danger" onClick={() => { this.declineTrade('Cancelled'); }}>{CANCEL_TRADE}</Button>
        );
      } else if (this.props.path === INCOMING) {
        return (
          <div className="trade-modal-buttons">
            <Button className="modal-buttons" bsStyle="danger" onClick={() => { this.declineTrade('Declined'); }}>{DECLINE_TRADE_OFFER}</Button>
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

  /**
   * set background color of RequestItem component to indicate status of trade
   * Green = Accepted, Red = Declined or Cancelled, Yellow= Pending
   * @param {String} status - game trade status
   * @return {String} returns string to be used as css class to set color of background
   */
  setStatusBackgroundColor(status) {
    if (status === PENDING) {
      return 'request-pending';
    } else if (status === ACCEPTED) {
      return 'request-accepted';
    } else if (status === DECLINED || status === CANCELLED) {
      return 'request-declined';
    }
  }

  /**
   * Toggles Modals. State of modal stored in showModal
   */
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  /**
  * Makes API call to eemoves Game Request from user Requests after trade has been resolved
  * (other user either accepted or declined trade). Also, toggles modal off and removes Request from render
  */
  removeTrade() {
    this.props.removeRequest({
      requestedGameId: this.props.requestedGame.id,
      offeredGameId: this.props.offeredGame.id,
    });

    // close modal after action
    this.toggleModal();
  }

  /**
  * Makes API call to decline trade via props func and update in db. Req status also updated for other user.
  * @param {String} type - status of trade
  */
  declineTrade(type) {
    this.props.declineTrade({
      type,
      offeredGame: this.props.offeredGame,
      requestedGame: this.props.requestedGame
    });
  }

  /**
  * Makes API call to accept trade via prop func and update in db. Request is then removed from db and render
  * since it has been resolved but not removed from other user request lib. Modal is also toggled off.
  */
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

  render() {
    return (
      <div className="request-image">
        <a onClick={this.toggleModal}>
          <img src={this.props.requestedGame.cover} alt={this.props.requestedGame.name} />
          <p className={this.setStatusBackgroundColor(this.props.status)}>{this.props.status}</p>
        </a>

      {/* Modal used to display Trade Req info */}
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>
              {this.props.requestedGame.name}
              <p className={'status-text ' + this.setStatusBackgroundColor(this.props.status)}>Status: {this.props.status}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="modal-message">{this.getStatusMessage()}</h2>
            <p className="owner-text">Owner: {this.props.requestedGame.owner.username}</p>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeRequest,
    completeTrade,
    declineTrade,
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(RequestItem);
