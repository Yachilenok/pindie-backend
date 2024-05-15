const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  if (req.query["categories.name"]) {
    req.gamesArray = await games.findGameByCategory(
      req.query["categories.name"]
    );
    next();
    return;
  }
  req.gamesArray = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password",
  });
  next();
};

const findGameById = async (req, res, next) => {
  console.log(`GET /games/${req.params.id}`);
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("users")
      .populate("categories");
    next();
  } catch (err) {
    res.status(404).json({ message: "Игра не найдена" });
  }
};

const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: "Не удалось создать игру" });
  }
};

const updateGame = async (req, res, next) => {
  console.log(`PUT /games/${req.params.id}`);
  try {
    console.log(req.body);
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: "Не удалось обновить игру" });
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите все данные в полях" }));
  } else {
    next();
  }
};

const deleteGame = async (req, res, next) => {
  console.log(`DELETE /games/${req.params.id}`);
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (err) {
    res.status(400).json({ message: "Не удалось удалить игру" });
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Игра с таким названием уже существует" })
      );
  } else {
    next();
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};

module.exports = {
  createGame,
  findAllGames,
  findGameById,
  updateGame,
  checkEmptyFields,
  deleteGame,
  checkIsGameExists,
  checkIsVoteRequest,
};
