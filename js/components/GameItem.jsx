import React, {Component} from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeGame} from '../actions/gameActions';
import GameCard from './GameCard';

/** Presentational component used in GameList to display Game
* Game is initially displayed as icon using cover art. Click on it will toggle modal
* that displays more details such as description and screenshots
*/
export class GameItem extends Component {
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

  /**
   * Used to handle Carousel display of game images
   * @param e - onClick Event
   * @param {direction - String
   */
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  /**
   * Used to toggle modal which displays info about game passed as prop
   * on/off state stored in showModal
   */
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  /**
  * Wrapper function used to remove game from user lib via prop func and toggles modal off
  * Uses mongoId to find game to remove on db
  */

  handleOnClick() {
    this.props.removeGame({
      mongoId: this.props.mongoId,
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
