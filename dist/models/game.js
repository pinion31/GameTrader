'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
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

var Game = mongoose.model('games', GameSchema);

module.exports = Game;
//# sourceMappingURL=game.js.map