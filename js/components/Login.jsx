"use strict";

import React, {Component} from 'react';
import 'whatwg-fetch';
import {Row, Col, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap';

/* Component used to handle login of user*/
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { // login creds stored as user Obj to be sent to server
        username: '',
        password: ''
      },
      usernameHelp: '', // error message state
      passwordHelp: '', // error message state

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  /**
   * keeps user state updated as user enters username or password
   * @param e - onChange event object passed from form
   */

  handleOnChange(e) {
    const loggedInUser = Object.assign({}, this.state.user);
    loggedInUser[e.target.name] = e.target.value;

    this.setState({
      user: loggedInUser,
      usernameHelp: '',
      passwordHelp: '',
    });
  }

  /**
   * Client-side verification of login credentials; ensures user has entered some info for username and password
   * @return {Boolean} - returns false if verification fails, true if passes
   */
  validateLogin() {
    // if username is filled
    if (this.state.user.username.length === 0) {
      this.setState({
        usernameHelp: 'Please enter a username.',
      });
      return false;
      // if password field is filled
    } else if (this.state.user.password.length === 0) {
      this.setState({
        passwordHelp: 'Please enter a password.',
      });
      return false;
    }
    // if validation check passes, send credentials to server
    return true;
  }

  /**
   * Handles api call to server to authenication user
   * If auth successful, user is stored in session and user directed to dashboard.
   * Otherwise, error message returned
   */
  handleOnClick() {
    if (this.validateLogin()) {
      fetch('/users/loginUser', {
        method: 'POST',
        credentials: 'include', // need to include this for session to persist in other routes
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.user),
      }).then((res) => {
        if (res.ok) {
          res.json().then((redir) => {
            if (redir.validation === 'valid') {
              this.props.setSessionUser(this.state.user.username);
              this.props.history.push(redir.redirect);
            } else {
              this.setState({
                [redir.field]: redir.validation,
              });
            }
          });
        }
      });
    }
  }

  /**
   * Redirects to Signup Page if user click Sign up Button
   */
  goToSignUp() {
    this.props.history.push('/Signup');
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
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.handleOnChange}
              />
              <HelpBlock>{this.state.usernameHelp}</HelpBlock>
            </FormGroup>
          </Col>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleOnChange}
              />
              <HelpBlock>{this.state.passwordHelp}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <Button className="login-button request-accepted " bsStyle="primary" onClick={this.handleOnClick}>Log in</Button>
            <Button className="signup-button" bsStyle="primary" onClick={this.goToSignUp}>Sign Up</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
