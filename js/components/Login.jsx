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
          <Button bsStyle="primary" onClick={this.handleOnClick}>Sign in</Button>
        </Row>


      </Grid>
    );
  }
}

export default Login;