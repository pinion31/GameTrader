import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class SignUp extends Component {
  render() {
    return (
      <Grid>
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
        </Row>
        <Row>
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
        <Row>
           <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password"
                type="password"
                placeholder="Reenter Password"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
           <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="email"
                type="text"
                placeholder="Email"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={3} xs={4} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="city"
                type="text"
                placeholder="city"
              />
            </FormGroup>
          </Col>
           <Col sm={2} smOffset={0} xs={2} xsOffset={0}>
            <FormGroup>
              <FormControl
                name="state"
                type="text"
                placeholder="state"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Game Console</ControlLabel>
              <FormControl
                componentClass="select">
                <option value="Wii">Nintendo Wii</option>
                <option value="Wii">Nintendo Switch</option>
                <option value="PS4">Playstation 2</option>
                <option value="PS3">Playstation 3</option>
                <option value="PS4">Playstation 4</option>
                <option value="Xbox">Xbox</option>
                <option value="Xbox360">Xbox 360</option>
                <option value="XboxOne">Xbox One</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SignUp;