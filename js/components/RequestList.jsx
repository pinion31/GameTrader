import React, {Component} from 'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RequestItem from './RequestItem';
import {getUserRequests, clearUserRequests, addRequest, removeRequest} from '../actions/requestActions';

export class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: this.props.sessionUser,
    };
  }

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

  componentWillMount() {
    // clears out any requests (and DOM elements)
    // from previous session (from other users)
    // that do not belong to current user
    // this.props.clearUserRequests();
  }

  componentDidMount() {
    this.props.getUserRequests();
    this.setState({
      sessionUser: this.props.getSessionUser()
    });
  }

  render() {
    return (
      <Well>
        <Grid>
          <Row>
            <Col sm={6} xs={12} md={8}>
              <h1 className="section-header">My Requests</h1>
            </Col>
            <Col sm={6} xs={12} md={4}>
              <h3 className="welcome-message">{`Welcome, ${this.state.sessionUser}`}</h3>
            </Col>
          </Row>
          <Row>
            {this.props.requests.requests.map((request, key) => (
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
    addRequest,
    removeRequest,
    clearUserRequests,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
