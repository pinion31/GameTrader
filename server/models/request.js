const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Game = require('./game');

const requestSchema = new Schema({
  path: String,
  status: String,
  offeredGame: String,
  requestedGame: String,
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
