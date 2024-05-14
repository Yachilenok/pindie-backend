const users = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({});
  next();
};

const findUserById = async (req, res, next) => {
  console.log(`GET /users/${req.params.id}`);

  try {
    req.users = await users.findById(req.params.id);
    next();
  } catch (err) {
    req.status(400).json({ message: "Пользователи не найден" });
  }
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: "Не удалось создать пользователя" });
  }
};

const updateUser = async (req, res, next) => {
  console.log(`PUT /users/${req.params.id}`);
  try {
    console.log(req.body);
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: "Не удалось обновить пользователя" });
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (req.body.username || !req.body.email) {
    res.status(400).send({ message: "Введите имя и email" });
  }
};

const deleteUser = async (req, res, next) => {
  console.log(`DELETE /users/${req.params.id}`);
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (err) {
    res.status(400).json({ message: "Не удалось удалить пользователя" });
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Пользователь с таким email уже существует" })
      );
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message:
          "Нельзя удалять пользователей или добавлять больше одного пользователя",
      })
    );
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  checkEmptyNameAndEmail,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  checkIfUsersAreSafe,
  hashPassword,
};
