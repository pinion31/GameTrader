'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');

var RequestSchema = new Schema({
  path: String,
  status: String,
  offeredGame: Object,
  requestedGame: Object
});

module.exports = RequestSchema;
//# sourceMappingURL=requestSchema.js.map