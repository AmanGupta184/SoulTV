import express from "express";
import { protect, admin } from "../Middlewares/Auth.js";
import * as categoryController from "../Controllers/CategoriesController.js";

const router = express.Router();

//public routes
router.get("/", categoryController.getCategories);

//Admin routes
router.post("/", protect, admin, categoryController.createCategory);
router.put("/:id", protect, admin, categoryController.updateCategory);
router.delete("/:id", protect, admin, categoryController.deleteCategory);

export default router;
