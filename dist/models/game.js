'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
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

var Game = mongoose.model('games', gameSchema);

module.exports = Game;
//# sourceMappingURL=game.js.map