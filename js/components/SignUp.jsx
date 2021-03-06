"use strict";

import React, {Component} from 'react';
import 'whatwg-fetch';
import {Row, Col, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap';

/** Component handles creation of new users**/
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: { // stores new user info in newUser obj to be submitted to db
        username: '',
        password1: '',
        password2: '',
        email: '',
        city: '',
        state: '',
      },
      usernameHelp: '',
      password1Help: '',
      password2Help: '',
      emailHelp: '',
      cityHelp: '',
      stateHelp: '',


    };

    this.handleChange = this.handleChange.bind(this);
    this.sendUserInfoToDB = this.sendUserInfoToDB.bind(this);
    this.validateSignUp = this.validateSignUp.bind(this);
  }

  /**
   * keeps user state updated as user enters username, password and other bio info
   * @param event - onChange event object passed from form
   */
  handleChange(event) {
    const {newUser} = this.state;
    const user = Object.assign({}, newUser);
    user[event.target.name] = event.target.value;

    this.setState({
      newUser: user,
      usernameHelp: '',
      password1Help: '',
      password2Help: '',
      emailHelp: '',
      cityHelp: '',
      stateHelp: '',
    });
  }

  /**
   * Client-side verification of sign up info; ensures user has entered valid info for all fields
   * @return {Boolean} - returns false if verification fails, true if passes
   */
  validateSignUp() {
    const {newUser} = this.state;

    // makes sure all fields are filled out with at least one characer
    Object.keys(newUser).map((field) => {
      const help = `${field}Help`;
      if (newUser[field].length === 0) {
        let fieldString;

        if (field.toString() === 'city') {
          fieldString = 'zip code';
        } else if (field.toString() !== 'password1' && field.toString() !== 'password2') {
          fieldString = field;
        } else {
          fieldString = 'password';
        }

        this.setState({
          [help]: `Please enter a valid ${fieldString}.`,
        });

        return false;
      }
    });

    if (newUser.username.length < 2 || newUser.username.split(' ').length > 1) {
      this.setState({
        usernameHelp: 'Username must be at least 2 characters and contain no spaces.',
      });
      return false;
    }

    if (newUser.password1.length < 6 || newUser.password1.split(' ').length > 1) {
      this.setState({
        password1Help: 'Password must be at least 6 characters and contain no spaces.',
      });
      return false;
    }

    if (newUser.password2.length < 6) {
      this.setState({
        password2Help: 'Password must be at least 6 characters.',
      });
      return false;
    }

    if (newUser.password2 !== newUser.password1) {
      this.setState({
        password2Help: 'Passwords must match.',
      });
      return false;
    }

    if (!newUser.email.match(/^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}$/)) {
      this.setState({
        emailHelp: 'Please enter a valid email.',
      });
      return false;
    }

    if (!newUser.city.match(/^[0-9]{5}$/)) {
      this.setState({
        cityHelp: 'Please enter a valid zip code.',
      });
      return false;
    }

    return true;
  }

  /**
   * If verification passes, make API POST call to server to submit new user info. Afterward, sets session
   * user to recently created user; redirects user to dashboard
   */
  sendUserInfoToDB() {
    const {newUser} = this.state;
    if (this.validateSignUp()) {
      fetch('/users/addUser', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
      }).then((res) => {
        if (res.ok) {
          res.json().then((result) => {
            if (result.validation !== 'valid') {
              this.setState({
                usernameHelp: result.validation,
              });
            } else {
              this.props.setSessionUser(newUser.username);
              this.props.history.push(result.redirect);
            }
          });
        }
      }).catch(err => `Error in sending data to server:${err.message}`);
    }
  }

  render() {
    const {usernameHelp, password1Help, password2Help, emailHelp} = this.state;
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
                onChange={this.handleChange}
              />
              <HelpBlock>{usernameHelp}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password1"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <HelpBlock>{password1Help}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password2"
                type="password"
                placeholder="Reenter Password"
                onChange={this.handleChange}
              />
              <HelpBlock>{password2Help}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="email"
                type="text"
                placeholder="Email"
                onChange={this.handleChange}
              />
              <HelpBlock>{emailHelp}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={2} smOffset={4} xs={4} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="city"
                type="text"
                placeholder="zip code"
                onChange={this.handleChange}
              />
            </FormGroup>
            <HelpBlock>{this.state.cityHelp}</HelpBlock>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
            <Button className="submit-new-user-button request-accepted" bsStyle="primary" onClick={this.sendUserInfoToDB}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignUp;
