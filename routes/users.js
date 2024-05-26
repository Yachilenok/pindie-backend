const usersRouter = require("express").Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  checkEmptyNameAndEmail,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendCreatedUser,
  sendUpdatedUser,
  sendDeleteUser,
  sendMe,
  sendUserById,
} = require("../controllers/users");
const { checkAuth } = require("../middlewares/auth");

usersRouter.get("/users", findAllUsers, sendAllUsers);

usersRouter.get("/me", checkAuth, sendMe);

usersRouter.get("/users/:id", findUserById, sendUserById);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendCreatedUser
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUpdatedUser
);

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendDeleteUser);

module.exports = usersRouter;
