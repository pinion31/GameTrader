const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    city: String,
    state: String,
    requests: [ {
      type:Schema.Types.ObjectId,
      ref: 'requests'
    }],
    games: [{
      type: Schema.Types.ObjectId,
      ref: 'games'
    }]
  }
);

const User = mongoose.model('users', userSchema);

module.exports = User;
