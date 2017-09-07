const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
                requests: null,
                games: null
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

router.post('/logoutUser', (req) => {
  console.log('logged out user all');
  req.session.destroy();
});

module.exports = router;
