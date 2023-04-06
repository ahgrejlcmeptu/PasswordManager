module.exports = class UserDto {
  login;
  id;
  isAdmin;

  constructor(model) {
    this.login = model.login;
    this.id = model._id;
    this.isAdmin = model.isAdmin;
  }
}
