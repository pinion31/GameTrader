import React, {Component} from 'react';
import {Thumbnail,Grid, Row, Col, Well, Media, Carousel} from 'react-bootstrap';
import GameCard from './GameCard';

class GameRequestDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  /*render() {
    return (
      <Grid>
        <Row>
          <Col sm={4} xs={4} md={2}>
            <Thumbnail src={this.props.cover} alt={this.props.name}>
              {this.props.screenshots.map((screenshot) => (
                <img src={screenshot} alt={this.props.name} />
              ))
              }
              <h4>{this.props.name}</h4>
            </Thumbnail>
          </Col>
          <Col sm={4} xs={8} md={4}>
            <Well>
              <p>{this.props.summary}</p>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }*/

  render() {
    return (
      <div>
        <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
          {this.props.screenshots.map((screenshot) => (
            <Carousel.Item key={this.props.id}>
              <img width={569} height={320} src={screenshot} alt={this.props.name} key={this.props.id} />
            </Carousel.Item>
          ))
          }
        </Carousel>
        <GameCard
          cover={this.props.cover}
          name={this.props.name}
          summary={this.props.summary}
        />
      </div>
    );
  }
}

export default GameRequestDescription;
