'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  state: String,
  requests: Object,
  games: Object
});

var User = mongoose.model('GameTraders', userSchema);

module.exports = User;
//# sourceMappingURL=user.js.map