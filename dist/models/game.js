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
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

/*
GameSchema.pre('remove', function(next) {
  const User = mongoose.model('users');
  User.find({id: this.id})
    .populate('games')
    .then(user => {
      next();
    });
});*/

var Game = mongoose.model('games', GameSchema);

module.exports = Game;
//# sourceMappingURL=game.js.map