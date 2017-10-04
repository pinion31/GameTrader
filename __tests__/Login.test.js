import React from 'react';
import {shallow} from 'enzyme';
import {Row, Col, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap';
import {Login} from '../js/components/Login';
import { fakeServer } from 'sinon';

const server = fakeServer.create();

server.respondWith(
  'POST',
  '/users/loginUser',
  [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify({validation: 'valid'})
  ]
);

let userAccepted = 'failure';

const emptyProps = {
  setSessionUser: () => {userAccepted ='success';}
};


const emptyState = {
  user: {
    username: '',
    password: ''
  },
  usernameHelp: '',
  passwordHelp: '',
};

describe('Login', () => {
  const login = shallow(<Login {...emptyProps} />);

  it('initializes component with empty state', () => {
    expect(login.state()).toEqual(emptyState);
  });

  describe('Title Graphic', () => {
    it('has a div container with class, `signup-page-image`', () => {
      expect(login.find('div').at(1).hasClass('signup-page-image')).toBe(true);
    });

    it('has a landing page title of `GameTrader` with class `signup-title`', () => {
      expect(login.find('h1').text()).toEqual('GameTrader');
      expect(login.find('h1').hasClass('signup-title')).toBe(true);
    });

    it('has a landing page subtitle of `Trade Your Games With Others and Game On.` with class `signup-subtitle`', () => {
      expect(login.find('h2').text()).toEqual('Trade Your Games With Others and Game On.');
      expect(login.find('h2').hasClass('signup-subtitle')).toBe(true);
    });
  });

  describe('username field', () => {
    it('has a placeholder, `Username`', ()=> {
      expect(login.find(FormControl).at(0).props().placeholder).toEqual('Username');
    });

    it('is of type: text', ()=> {
      expect(login.find(FormControl).at(0).props().type).toEqual('text');
    })

    it('has name property of `username`', ()=> {
      expect(login.find(FormControl).at(0).props().name).toEqual('username');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(login.find(HelpBlock).at(0).exists()).toBe(true);
      expect(login.find(HelpBlock).at(0).props().children).toEqual(emptyState.usernameHelp);
    });
  });

  describe('password field', () => {
    it('has a placeholder, `Password`', ()=> {
      expect(login.find(FormControl).at(1).props().placeholder).toEqual('Password');
    });

    it('is of type: password', ()=> {
      expect(login.find(FormControl).at(1).props().type).toEqual('password');
    })

    it('has name property of `password`', ()=> {
      expect(login.find(FormControl).at(1).props().name).toEqual('password');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(login.find(HelpBlock).at(1).exists()).toBe(true);
      expect(login.find(HelpBlock).at(1).props().children).toEqual(emptyState.passwordHelp);
    });
  });

  describe('Login Button', () => {
    it('has a label of `Log in', () => {
      expect(login.find(Button).at(0).props().children).toEqual('Log in');
    });

    it('has classes: login-button and request-accepted', () => {
      expect(login.find(Button).at(0).hasClass('login-button')).toBe(true);
      expect(login.find(Button).at(0).hasClass('request-accepted')).toBe(true);
    });

    describe('Login with fields', () => {

      beforeEach((done) => {
        login.setState({ user: {username:'test', password:'test'}});
        login.find(Button).at(0).simulate('click');
        server.respond();
        setTimeout(done);
      });

      it('sends login information', () => {
        expect(userAccepted).toEqual('success');
      });

      afterEach(() => {
        userAccepted = 'failure';
      });
    });

    describe('Login without user field', () => {

      beforeEach((done) => {
        login.setState({ user: {username:'', password:''}});
        login.find(Button).at(0).simulate('click');
        server.respond();
        setTimeout(done);
      });

      it('sends login information', () => {
        expect(userAccepted).toEqual('failure');
        expect(login.state().usernameHelp).toEqual('Please enter a username.');
      });
    });

    describe('Login without password field', () => {

      beforeEach((done) => {
        login.setState({ user: {username:'test', password:''}});
        login.find(Button).at(0).simulate('click');
        server.respond();
        setTimeout(done);
      });

      it('sends login information', () => {
        expect(userAccepted).toEqual('failure');
        expect(login.state().passwordHelp).toEqual('Please enter a password.');
      });
    });
  });

  describe('signup-subtitle Button', () => {
    it('has a label of `Sign Up', () => {
      expect(login.find(Button).at(1).props().children).toEqual('Sign Up');
    });

    it('has classes: signup-button', () => {
      expect(login.find(Button).at(1).hasClass('signup-button')).toBe(true);
    });
  });


});