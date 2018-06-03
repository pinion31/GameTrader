"use strict";

import React, {Component} from 'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RequestItem from './RequestItem';
import {getUserRequests} from '../actions/requestActions';

/* Component displays user requests in dashboard. User request are displayed as RequestItem components*/
export class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: this.props.sessionUser,
    };
  }

  /**
   * optimizes render method of component to only render when changes are made
   */
  shouldComponentUpdate(newProps, newState) {
    let shouldUpdate = false;

    if (this.props.requests.requests.length !== newProps.requests.requests.length) {
      return true;
    } else {
      this.props.requests.requests.forEach((request, key) => {
        if (!shouldUpdate && request.status !== newProps.requests.requests[key].status) {
          shouldUpdate = true;
        } else if (request.requestedGame.id !== newProps.requests.requests[key].requestedGame.id ||
            request.offeredGame.id !== newProps.requests.requests[key].offeredGame.id)  {
            shouldUpdate = true;
        }
      });
    }
    return shouldUpdate;
  }

  /**
   * After component mounting, makes API call to get user requests from db. Also, retrieves session info to store in
   * this.state.sessionUser
   */
  componentDidMount() {
    this.props.getUserRequests();
    this.setState({
      sessionUser: this.props.getSessionUser()
    });
  }

  render() {
    const {sessionUser} = this.state;
    const {requests} = this.props;
    return (
      <Well>
        <Grid>
          <Row>
            <Col sm={6} xs={12} md={8}>
              <h1 className="section-header">My Requests</h1>
            </Col>
            <Col sm={6} xs={12} md={4}>
              <h3 className="welcome-message">{`Welcome, ${sessionUser}`}</h3>
            </Col>
          </Row>
          <Row>
            {requests.requests.map((request, key) => (
              <Col sm={2} xs={6} key={key}>
                <RequestItem
                  status={request.status}
                  requestedGame={request.requestedGame}
                  imageLink={'pic here'}
                  offeredGame={request.offeredGame}
                  path={request.path}
                />
              </Col>
            ))
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
  return bindActionCreators({
    getUserRequests,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
