'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * logs in User
 * input: {user: {username: String, password: String}}
 * output: { redirect: String, field: String, validation: String,}
 *  if successful auth, user is sent to route contained in redirect String. Otherwise, error type sent back in field String
 *  validation String indicates where auth was successful or sends back error message type
 */
router.post('/loginUser', (req, res) => {
  // strips out trailing spaces after username
  const usernameStripped = req.body.username.split(' ')[0];

  User.findOne({username: usernameStripped})
    .then((user) => {
      if (user) {
        // decrypt password
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (match) {
            // session check
            if (typeof req.session.user === 'undefined') {
              req.session.user = usernameStripped;
              req.session.save((err) => {
                if (err) {
                  throw err;
                } else {
                  res.json({
                    redirect: '/Dashboard',
                    validation: 'valid',
                  });
                }
              });
            } else if (req.session.user != usernameStripped) {
              req.session.user = usernameStripped;
              req.session.save((err) => {
                if (err) {
                  throw err;
                } else {
                  res.json({
                    redirect: '/Dashboard',
                    validation: 'valid',
                  });
                }
              });
            } else {
              res.json({
                redirect: '/Dashboard',
                validation: 'valid',
              });
            }
          } else {
            res.json({
              field: 'passwordHelp',
              validation: 'Invalid Password',
            });
          }
        });
      } else {
        res.json({
          field: 'usernameHelp',
          validation: 'Invalid Username',
        });
      }
    });
});

/**
 * Adds new User to db
 * input:{
    newUser: {
      username: String,
      password1: String,
      password2: String,
      email: String,
      city: String,
      state: String,
    }
  }
 * output: {
    redirect: String (route to redirect to if adding user is successful),
    validation: String (indicates if user add is successful)
    }
 */
router.post('/addUser', (req, res) => {
  // strips out trailing spaces after username
  const usernameStripped = req.body.username.split(' ')[0];

  User.findOne({username: usernameStripped})
    .then((result) => {
      if (!result) {
        req.session.user = usernameStripped;
        req.session.save((err) => {
          if (err) { throw err; }
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password1, salt, (err, hash) => {
            // Store hash in your password DB.
            const user = new User(
              {
                username: usernameStripped,
                password: hash,
                email: req.body.email,
                city: req.body.city,
                state: req.body.state,
                requests: [],
                games: []
              }
            );

            user.save((err) => {
              if (err) { throw err; }
            });

            res.json({
              validation: 'valid',
              redirect: '/Dashboard'
            });
          });
        });
      } else {
        res.json({validation: 'User already exists.'});
      }
    });
});

/**
 * logs out user and destroys current session
 */
router.post('/logoutUser', (req) => {
  req.session.destroy();
});

module.exports = router;
