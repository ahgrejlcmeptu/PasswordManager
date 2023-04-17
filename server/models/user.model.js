const {Schema, model} = require('mongoose');

const schema = new Schema({
  login: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  status: {type: String},
  isAdmin: {type: Boolean}
})

module.exports = model('User', schema);
