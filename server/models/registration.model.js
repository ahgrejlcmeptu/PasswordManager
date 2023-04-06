const {Schema, model} = require('mongoose');

const schema = new Schema({
  activationLink: {type: String, required: true},
})

module.exports = model('Registration', schema);
