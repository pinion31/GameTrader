import React, {Component} from 'react';
import {Thumbnail, Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addGame} from '../actions/gameActions';
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
      name: this.props.requestedGame,
      id: this.props.requestedGame,
      description: 'accepted game'
    }]);

    this.props.removeRequest({
      requestToRemove: this.props.requestedGame,
     });

    //close modal after action
    this.toggleModal();

  }

  render() {
    return (
      <div>
        <a onClick={this.toggleModal}>
          <Thumbnail src="" alt={this.props.requestedGame}>
            <h5>{this.props.status}</h5>
          </Thumbnail>
        </a>
        <Modal
            show={this.state.showModal}
            onHide={this.toggleModal}
        >
            <Modal.Header>
              <Modal.Title>{this.props.requestedGame}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h5>{this.props.status}</h5>
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
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
