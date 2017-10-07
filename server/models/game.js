const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  screenshots: Array,
  gameConsole: Number,
  cover: String,
  summary: String,
  id: Number,
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Game = mongoose.model('games', gameSchema);

module.exports = Game;

