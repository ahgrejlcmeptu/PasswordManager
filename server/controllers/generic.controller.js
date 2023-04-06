const genericCrud = (model, {
  get = '',
  getAll = ''
} = {}) => ({
  async getAll({params: {id}}, res) {
    try {
      let items = await model.find();
      items = items.filter(i => {
        if (i.user.toString() === id) {
          return i
        }
      })
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async create({body}, res) {
    try {
      const item = new model(body);
      const newItem = await item.save();
      return res.status(200).send({status: "OK", message: "Пароль создан", item: newItem});
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async update({params: {id}, body}, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, {new: true});
      return res.status(200).send({status: "OK", message: "Пароль изменен", item});
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async delete({params: {id}, body}, res) {
    try {
      await model.findByIdAndDelete(id);
      return res.status(200).send({status: "OK", message: "Пароль удален"});
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
});

module.exports = genericCrud;
