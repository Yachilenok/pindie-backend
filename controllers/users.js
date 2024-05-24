const sendAllUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.usersArray));
};

const sendCreatedUser = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.users));
};

const sendUpdatedUser = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Пользователь обновлен" }));
};

const sendDeleteUser = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

const sendUserById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

const sendMe = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

module.exports = {
  sendAllUsers,
  sendCreatedUser,
  sendUpdatedUser,
  sendDeleteUser,
  sendUserById,
  sendMe,
};
