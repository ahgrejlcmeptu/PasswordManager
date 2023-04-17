module.exports = class UserDto {
  login;
  email;
  status;
  id;
  isAdmin;

  constructor(model) {
    this.login = model.login;
    this.email = model.email;
    this.status = model.status;
    this.id = model._id;
    this.isAdmin = model.isAdmin;
  }
}
