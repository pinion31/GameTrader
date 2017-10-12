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

GameSchema.pre('remove', function (next) {
  var User = mongoose.model('users');

  //User.remove({games: this.id}, next);
  //User.remove({ games: this._id }, next);
  //next();
  //console.log(this.owner);
  //next();

  User.find({ id: this.id }).populate('games').then(function (user) {
    console.log('user is', user);
    next();
    /*
    Array.from(user.games).map((game, key) => {
      if (game._id.toString() === this._id.toString()) {
        console.log( user.games[key]._id);
        user.games[key]._id = null;
        user.save(() => {
          next();
        });
      }
    });*/
  });
});

var Game = mongoose.model('games', GameSchema);

module.exports = Game;
//# sourceMappingURL=game.js.map