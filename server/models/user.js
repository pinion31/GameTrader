const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    city: String,
    state: String,
    requests: Object,
    games: Object,
  }
);

const User = mongoose.model('GameTraders', userSchema);

module.exports = User;
