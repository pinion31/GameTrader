import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <h1>GameTrader</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="name"
                type="text"
                placeholder="Username"
              />
            </FormGroup>
          </Col>
           <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
              />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;