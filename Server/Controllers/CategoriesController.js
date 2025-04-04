import asyncHandler from "express-async-handler";
import Categories from "../Modals/CategoriesModal.js";

//@desc get all categories
//@route GET /api/categories
//@access Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    //find all categories in db
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//**************************Admin Controller*********************

//@desc create new categories
//@route POST /api/categories
//@access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    //create title from request
    const { title } = req.body;
    //create new category
    const category = new Categories({
      title,
    });
    const createCategory = await category.save();
    res.status(201).json(createCategory);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc update category
//@route PUT /api/categories/:id
//@access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    //get category id from request params
    const category = await Categories.findById(req.params.id);
    if (category) {
      //update category title
      category.title = req.body.title || title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc delete category
//@route DELETE /api/categories/:id
//@access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    //get category id from request params
    const category = await Categories.findById(req.params.id);
    if (category) {
      //delete category from db
      await category.deleteOne();
      res.json({ message: "category removed" });
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
