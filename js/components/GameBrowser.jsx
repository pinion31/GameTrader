import React, {Component} from 'react';
import {Grid, Row, Col, Modal, Button, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import GameItem from './GameItem';

const mockGameCollection =
  [
    {
      name: 'Duke Nukem',
      id: '',
      description: 'this is a game'},
    {
      name: 'Fallout 4',
      id: '',
      description: 'this is a game'
    }
  ];

class GameBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
    };
  }

  toggleModal() {
    this.setState({
      showModal:!this.state.showModal,
    })
  }

  render() {
    return (
      <div>
        <Well>
          <Grid>
            <Row>
              <Col sm={6} xs={12}>
                <h1>Available Games</h1>
              </Col>
            </Row>
            <Row>
              {mockGameCollection.map((game, key) => (
                <Col sm={2} xs={6} key={key}>
                  <a onClick={this.toggleModal.bind(this)}>
                    <GameItem
                      name={game.name}
                      description={game.description}
                    />
                  </a>
                </Col>
              ))
              }
            </Row>
          </Grid>
        </Well>

        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>Trade Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            One fine body...
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this)}>
              Close
            </Button>
            <Button bsStyle="primary">Send Trade Request</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapPropstoState() {

}

export default GameBrowser;
