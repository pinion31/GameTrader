import React, {Component} from 'react';
import 'whatwg-fetch';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{
        username: '',
        password: ''
      },
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    let loggedInUser = Object.assign({},this.state.user);
    loggedInUser[e.target.name] = e.target.value;

    this.setState({
      user: loggedInUser,
    });
  }

  handleOnClick() {
    /*fetch(`/loginUser/${this.state.user.username}`)
      .then((user) => {
        console.dir(user);
      });*/

    fetch('/loginUser', {
        method: 'POST',
        credentials: 'include', // need to include this for session to persist in other routes
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.user),
      }).then(res => {
          res.json().then(redir => {
            this.props.history.push(redir.redirect);
          });
      });
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
                onChange={this.handleOnChange}
              />
            </FormGroup>
          </Col>
           <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <FormGroup>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleOnChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} smOffset={3} xs={6} xsOffset={3}>
            <Button className="login-button request-accepted " bsStyle="primary" onClick={this.handleOnClick}>Log in</Button>
            <Button className="signup-button" bsStyle="primary" onClick={this.handleOnClick}>Sign Up</Button>
          </Col>
        </Row>


      </div>
    );
  }
}

export default Login;