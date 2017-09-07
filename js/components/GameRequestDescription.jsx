import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';
import GameCard from './GameCard';

class GameRequestDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.getScreenShots = this.getScreenShots.bind(this);
  }

  getScreenShots() {
    if (this.props.screenshots.length > 0) { // checks if screenshots available
      return (
        <Carousel
          activeIndex={this.state.index}
          direction={this.state.direction}
          onSelect={this.handleSelect}
        >
          {this.props.screenshots.map(screenshot => (
            <Carousel.Item key={this.props.id}>
              <img
                width={569}
                height={320}
                src={screenshot}
                alt={this.props.name}
                key={this.props.id}
              />
            </Carousel.Item>
          ))
          }
        </Carousel>
      );
    }
  }

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
        />
      </div>
    );
  }
}

export default GameRequestDescription;
