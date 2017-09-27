import React from 'react';
import {shallow} from 'enzyme';
import {SignUp} from '../js/components/SignUp';
import {Row, Col, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap';

const emptyState = {
  newUser: {
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

describe('SignUp', () => {
  const signup = shallow(<SignUp />);

  it('initializes to empty State', () => {
    expect(signup.state()).toEqual(emptyState);
  });

  describe('Title Graphic', () => {
    it('has a div container with class, `signup-page-image`', () => {
      expect(signup.find('div').at(1).hasClass('signup-page-image')).toBe(true);
    });

    it('has a landing page title of `GameTrader` with class `signup-title`', () => {
      expect(signup.find('h1').text()).toEqual('GameTrader');
      expect(signup.find('h1').hasClass('signup-title')).toBe(true);
    });

    it('has a landing page subtitle of `Trade Your Games With Others and Game On.` with class `signup-subtitle`', () => {
      expect(signup.find('h2').text()).toEqual('Trade Your Games With Others and Game On.');
      expect(signup.find('h2').hasClass('signup-subtitle')).toBe(true);
    });
  });

   describe('username field', () => {
    it('has a placeholder, `Username`', ()=> {
      expect(signup.find(FormControl).at(0).props().placeholder).toEqual('Username');
    });

    it('is of type: text', ()=> {
      expect(signup.find(FormControl).at(0).props().type).toEqual('text');
    })

    it('has name property of `username`', ()=> {
      expect(signup.find(FormControl).at(0).props().name).toEqual('username');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(signup.find(HelpBlock).at(0).exists()).toBe(true);
      expect(signup.find(HelpBlock).at(0).props().children).toEqual(emptyState.usernameHelp);
    });
  });

   describe('password field', () => {
    it('has a placeholder, `Password`', ()=> {
      expect(signup.find(FormControl).at(1).props().placeholder).toEqual('Password');
    });

    it('is of type: password', ()=> {
      expect(signup.find(FormControl).at(1).props().type).toEqual('password');
    })

    it('has name property of `password1`', ()=> {
      expect(signup.find(FormControl).at(1).props().name).toEqual('password1');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(signup.find(HelpBlock).at(1).exists()).toBe(true);
      expect(signup.find(HelpBlock).at(1).props().children).toEqual(emptyState.password1Help);
    });
  });

  describe('2nd password field', () => {
    it('has a placeholder, `Password`', ()=> {
      expect(signup.find(FormControl).at(2).props().placeholder).toEqual('Reenter Password');
    });

    it('is of type: password', ()=> {
      expect(signup.find(FormControl).at(2).props().type).toEqual('password');
    })

    it('has name property of `password2`', ()=> {
      expect(signup.find(FormControl).at(2).props().name).toEqual('password2');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(signup.find(HelpBlock).at(2).exists()).toBe(true);
      expect(signup.find(HelpBlock).at(2).props().children).toEqual(emptyState.password2Help);
    });
  });

  describe('email field', () => {
    it('has a placeholder, `Email`', ()=> {
      expect(signup.find(FormControl).at(3).props().placeholder).toEqual('Email');
    });

    it('is of type: text', ()=> {
      expect(signup.find(FormControl).at(3).props().type).toEqual('text');
    })

    it('has name property of `password2`', ()=> {
      expect(signup.find(FormControl).at(3).props().name).toEqual('email');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(signup.find(HelpBlock).at(3).exists()).toBe(true);
      expect(signup.find(HelpBlock).at(3).props().children).toEqual(emptyState.emailHelp);
    });
  });

  describe('zip code field', () => {
    it('has a placeholder, `zip code`', ()=> {
      expect(signup.find(FormControl).at(4).props().placeholder).toEqual('zip code');
    });

    it('is of type: text', ()=> {
      expect(signup.find(FormControl).at(4).props().type).toEqual('text');
    })

    it('has name property of `city`', ()=> {
      expect(signup.find(FormControl).at(4).props().name).toEqual('city');
    })

    it('has a HelpBlock component with empty message', () => {
      expect(signup.find(HelpBlock).at(4).exists()).toBe(true);
      expect(signup.find(HelpBlock).at(4).props().children).toEqual(emptyState.emailHelp);
    });
  });

  describe('Submit Button', () => {
    it('has a label of `Submit', () => {
      expect(signup.find(Button).at(0).props().children).toEqual('Submit');
    });

    it('has classes: submit-new-user-button and request-accepted', () => {
      expect(signup.find(Button).at(0).hasClass('submit-new-user-button')).toBe(true);
      expect(signup.find(Button).at(0).hasClass('request-accepted')).toBe(true);
    });

  });
});
