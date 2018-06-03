import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';
import GameCard from './GameCard';

/* Presentation wrapper component to display Game Request information  via GameCard and Carousel*/

export class GameRequestDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.getScreenShots = this.getScreenShots.bind(this);
  }

  /**
   * Retrieves screenshots for game from props
   * @return Carousel {Component} - Bootstrap component to display screenshots
   */
  getScreenShots() {
    const {direction, index} = this.state;

    if (this.props.screenshots.length > 0) { // checks if screenshots available
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          {this.props.screenshots.map(screenshot => (
            <Carousel.Item key={this.props.id}>
              <img
                width={569}
                height={320}
                src={screenshot}
                alt={this.props.name}
              />
            </Carousel.Item>
          ))
          }
        </Carousel>
      );
    }
  }

  /**
   * Used to handle Carousel display of game screenshots
   * @param e - onClick Event
   * @param {direction - String
   */
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <div>
        {this.getScreenShots()}
        <GameCard
          cover={this.props.cover}
          name={this.props.name}
          summary={this.props.summary}
          owner={this.props.owner}
          key={this.props.id}
        />
      </div>
    );
  }
}

export default GameRequestDescription;
