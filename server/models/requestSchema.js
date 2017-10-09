const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Game = require('./game');

const RequestSchema = new Schema({
  path: String,
  status: String,
  offeredGame: Object,
  requestedGame: Object,
});

module.exports = RequestSchema;
