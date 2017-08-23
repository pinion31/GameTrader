import React, {Component} from 'react';
import {Thumbnail, Modal, Button} from 'react-bootstrap';

class GameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.toggleModal}>
          <Thumbnail src="" alt={this.props.name}>
            <h5>{this.props.name}</h5>
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
            <p>{this.props.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GameItem;
