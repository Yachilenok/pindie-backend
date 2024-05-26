const gamesRouter = require("express").Router();

const {
  findAllGames,
  createGame,
  updateGame,
  findGameById,
  checkEmptyFields,
  deleteGame,
  checkIsGameExists,
  checkIsVoteRequest,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendCreatedGame,
  sendUpdatedGame,
  sendDeleteGame,
  sendGameById,
} = require("../controllers/games");
const { checkIfCategoriesAvaliable } = require("../middlewares/categories");
const { checkIfUsersAreSafe } = require("../middlewares/users");
const { checkAuth } = require("../middlewares/auth");

gamesRouter.get("/games", findAllGames, sendAllGames);

gamesRouter.get("/games/:id", findGameById, sendGameById);

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendCreatedGame
);

gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendUpdatedGame
);

gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendDeleteGame);

module.exports = gamesRouter;
