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
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

GameSchema.pre('remove', function(next) {
  const User = mongoose.model('users');

  //User.remove({ games: this._id }, next);
  next();
  //console.log(this.owner);
  /*
  User.findById({_id: this.owner})
    .populate('games')
    .then(user => {
     // console.log(typeof user.games);
      Array.from(user.games).map((game, key) => {
        console.log(game._id);
        console.log(this._id);
        if (game._id.toString() === this._id.toString()) {
          console.log('1');
          user.games[key].remove()
            .then(() => { console.log('2.next');
              next();
            });
        }
      });
    });*/
 // User.remove({'$pull': {'games._id': this._id}});
//  console.log('removing games');
  //next();
});

const Game = mongoose.model('games', GameSchema);

module.exports = Game;

