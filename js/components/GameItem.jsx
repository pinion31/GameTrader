import React, {Component} from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {gameConsoles} from '../constants/gameConsoles';
import {removeGame} from '../actions/gameActions';
import GameCard from './GameCard';

class GameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      index: 0,
      direction: null
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  convertConsoleNumToConsoleName() {
    let publisher = '';

    gameConsoles.map((gameConsole) => {
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
          <img src={this.props.cover} alt={this.props.name} className="game-item" />
        </a>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Carousel
            activeIndex={this.state.index}
            direction={this.state.direction}
            onSelect={this.handleSelect}
          >
            {this.props.screenshots.map((screenshot, key) => (
              <Carousel.Item key={key}>
                <img width={669} height={320} src={screenshot} alt={this.props.name} />
              </Carousel.Item>
            ))
            }
          </Carousel>
          <GameCard
            cover={this.props.cover}
            name={this.props.name}
            summary={this.props.summary}
          />
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleOnClick}>Remove Game</Button>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeGame,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(GameItem);
