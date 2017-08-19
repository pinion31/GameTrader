import React,{Component} from 'react';
import {Grid,Row,Col,Well} from 'react-bootstrap';

class RequestList extends Component {
  render() {
    return (
      <Well>
        <Grid>
          <Row>
            <Col sm={6} xs={12}>
              <h1>My Requests</h1>
            </Col>
            <Col sm={4} smOffset={2} xs={12}>

            </Col>
          </Row>
          <Row>

          </Row>
        </Grid>
      </Well>
    );
  }
}

export default RequestList;