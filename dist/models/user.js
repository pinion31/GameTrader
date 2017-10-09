'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var requestSchema = require('./requestSchema');

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  state: String,
  requests: [requestSchema],
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'games'
  }]
});

var User = mongoose.model('users', userSchema);

module.exports = User;
//# sourceMappingURL=user.js.map