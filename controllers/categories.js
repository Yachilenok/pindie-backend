const sendAllCategories = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.categoriesArray));
};

const sendCreatedCategory = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.created));
};

const sendUpdatedCategory = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Категория обновлена" }));
};

const sendDeleteCategory = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

const sendCategoryById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

module.exports = {
  sendAllCategories,
  sendCreatedCategory,
  sendUpdatedCategory,
  sendDeleteCategory,
  sendCategoryById,
};
