import React, {Component} from 'react';
import {Thumbnail,Grid, Row, Col, Well} from 'react-bootstrap';

class GameRequestDescription extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4} xs={4} md={2}>
            <Thumbnail src={this.props.cover} alt={this.props.name}>
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
  }
}

export default GameRequestDescription;
