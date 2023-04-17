const bcrypt = require('bcrypt');

const {User} = require("../models");
const {Registration} = require("../models");
const TokenService = require('../services/token.service');
const UserDto = require('../dtos/user.dto');

module.exports = {
  async registration({body, params}, res) {
    const {id} = params
    const {login, email, password} = body

    try {
      const registration = await Registration.findOne({activationLink: id})
      if (!registration) {
        return res.status(403).send({
          message: "Ключ не существует"
        });
      }

      const user = await User.findOne({login})
      const mail = await User.findOne({email})

      if (user) {
        return res.status(403).send({
          message: "Login уже существует"
        });
      }
      if (mail) {
        return res.status(403).send({
          message: "E-mail уже существует"
        });
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const createsUser = await new User({login, email, status: 'active', password: hashPassword});
      await createsUser.save();

      const userDto = new UserDto(createsUser)
      const tokens = TokenService.generateTokens({...userDto})
      await TokenService.saveToken(userDto.id, tokens.refreshToken)
      await Registration.findByIdAndDelete(registration._id.toString());

      return res.status(200).send({
        message: "Пользователь успешно создан, а ключ удален",
        user: {...tokens, ...userDto}
      });
    } catch (e) {
      console.log(e)
    }
  },
  async login({body: {login, password}}, res) {
    try {
      const foundUser = await User.findOne({login});

      if (!foundUser) {
        return res.status(403).send({
          message: "Неверный логин или пароль"
        });
      }
      if (foundUser.status === 'blocked') {
        return res.status(403).send({
          message: "Пользователь заблокирован"
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

      if (!isPasswordCorrect) {
        return res.status(403).send({
          message: "Неверный логин или пароль"
        });
      }

      const userDto = new UserDto(foundUser);
      const tokens = TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return res.status(200).send({
        message: "Вход! Успех!",
        user: {...tokens, ...userDto}
      });
    } catch (e) {
      console.log(e)
    }
  },
  async logout({body: {refreshToken}}, res) {
    try {
      await TokenService.removeToken(refreshToken)

      return res.status(200).send({
        message: 'Выход! Успех!'
      })

    } catch (e) {
      console.log(e)
    }
  },
  async refreshToken({body: {refreshToken}}, res) {
    if (!refreshToken) {
      return res.status(403).send({
        message: 'Отказано в доступе'
      })
    }

    const currentToken = await TokenService.findToken(refreshToken)

    if (!currentToken) {
      return res.status(403).send({
        message: 'Отказано в доступе'
      })
    }

    const validateToken = TokenService.validateRefreshToken(refreshToken)
    if (!validateToken) {
      return res.status(403).send({
        message: 'Отказано в доступе'
      })
    }

    const userDto = new UserDto(validateToken)
    const {accessToken} = TokenService.generateTokens({...userDto})

    return res.status(200).send({accessToken})

  },

  async getAll(req, res) {
    try {
      let items = await User.find();
      items = items.map(item => {
        const userDto = new UserDto(item);
        return {
          ...userDto,
        }
      })
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send({
        message: 'Ошибка ' + err
      });
    }
  },
  async FirstRegistration({body, params}, res) {
    const {login, email, password} = body

    try {
      const hashPassword = await bcrypt.hash(password, 3);
      const createsUser = await new User({login, email, password: hashPassword, isAdmin: true, status: 'active'});
      await createsUser.save();

      const userDto = new UserDto(createsUser)
      const tokens = TokenService.generateTokens({...userDto})
      await TokenService.saveToken(userDto.id, tokens.refreshToken)

      return res.status(200).send({
        message: "Пользователь успешно создан",
        user: {...tokens, ...userDto}
      });

    } catch (e) {
      console.log(e)
    }
  },
}
