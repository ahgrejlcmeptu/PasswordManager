const {Registration} = require("../models");
const genericCrud = require("./generic.controller")
const uuid = require('uuid');

// const relations = {
//   get: 'category',
//   getAll: 'category'
// }

module.exports = {
  async getAll(req, res) {
    try {
      let items = await Registration.find();
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async create(req, res) {
    try {
      const activationLink = uuid.v4();
      const item = new Registration({activationLink});

      const newItem = await item.save();
      return res.status(200).send({status: "OK", message: "Регистрационный ключ создан", item: newItem});
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async delete({params: {id}, body}, res) {
    try {
      await Registration.findByIdAndDelete(id);
      return res.status(200).send({status: "OK", message: "Регистрационный ключ удален"});
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
}
