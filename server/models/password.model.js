const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true},
  url: {type: String},
  password: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Password', schema);
