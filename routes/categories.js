const categoriesRouter = require("express").Router();

const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  checkEmptyName,
  deleteCategory,
  checkIsCategoryExists,
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCreatedCategory,
  sendUpdatedCategory,
  sendDeleteCategory,
  sendCategoryById,
} = require("../controllers/categories");
const { checkAuth } = require("../middlewares/auth");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);

categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCreatedCategory
);

categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendUpdatedCategory
);

categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendDeleteCategory
);

module.exports = categoriesRouter;
