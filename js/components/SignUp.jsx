import React, {Component} from 'react';
import {connect} from 'react-redux';
import bindActionCreators from 'redux';
import 'whatwg-fetch';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        username: '',
        password: '',
        email: '',
        city: '',
        state: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendUserInfoToDB = this.sendUserInfoToDB.bind(this);
  }

  handleChange(event) {
    const user = Object.assign({}, this.state.newUser);
    user[event.target.name] = event.target.value;

    this.setState({
      newUser: user,
    });
  }

  sendUserInfoToDB() {
    fetch('/addUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.newUser),
    }).then((res) => {
      if (res.ok) {
        console.log('user added');
      }
    }).catch(err => `Error in sending data to server:${err.message}`);
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12} xs={12}>
            <div className="signup-page-image">
              <h1 className="signup-title">GameTrader</h1>
              <h2 className="signup-subtitle">Trade Your Games With Others and Game On.</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
           <Col sm={2} smOffset={0} xs={2} xsOffset={0}>
            <FormGroup>
              <FormControl
                name="state"
                type="text"
                placeholder="state"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Button bsStyle="primary" onClick={this.sendUserInfoToDB}>
            Submit
          </Button>
        </Row>
      </div>
    );
  }
}

 /*
function mapStateToProps() {

}

          <Col sm={12} xs={12}>
           <img src="./media/controllers.jpg" />
          </Col>

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addUser*/

export default SignUp;