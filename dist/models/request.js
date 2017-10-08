'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');

var requestSchema = new Schema({
  path: String,
  status: String,
  offeredGame: String,
  requestedGame: String
});

var Request = mongoose.model('requests', requestSchema);

module.exports = Request;
//# sourceMappingURL=request.js.map