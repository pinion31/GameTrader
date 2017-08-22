'use strict'

import React, {Component} from 'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import RequestItem from './RequestItem';


class RequestList extends Component {
  render() {
    return (
      <Well>
        <Grid>
          <Row>
            <Col sm={6} xs={12}>
              <h1>My Requests</h1>
            </Col>
          </Row>
          <Row>
            {this.props.requests.requests.map((request, key) => {
              if (request.status) {
                return (
                  <Col sm={2} xs={6} key={key}>
                    <RequestItem
                      owner={'me'}
                      status={request.status}
                      requestedGame={request.requestedGame}
                      imageLink={'pic here'}
                      offeredGame={request.offeredGame}
                    />
                  </Col>
                );
              }
            })
            }
          </Row>
        </Grid>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    requests: state.requests
  };
}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps)(RequestList);
