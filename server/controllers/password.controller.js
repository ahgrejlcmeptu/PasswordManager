const {Password} = require("../models");
const genericCrud = require("./generic.controller")

// const relations = {
//   get: 'category',
//   getAll: 'category'
// }

module.exports = {
  ...genericCrud(Password)
}
