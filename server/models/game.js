const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  screenshots: Array,
  gameConsole: Number,
  cover: String,
  summary: String,
  id: Number,
  name: String,
  owner: {
    username: String,
    id: String
  }
});

const Game = mongoose.model('games', GameSchema);

module.exports = Game;

