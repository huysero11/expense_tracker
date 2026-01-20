import * as categoriesService from "../services/categories.service.js";

export async function createCategory(req, res, next) {
  try {
    const userId = req.user?.userId;
    const { name, type } = req.body;

    const newCategory = await categoriesService.createCategory({
      userId,
      name,
      type,
    });

    return res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: {
        category: newCategory,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getCategories(req, res, next) {
  try {
    const userId = req.user?.userId;
    const type = req.query?.type;
    const categories = await categoriesService.getCategories({
      userId,
      type,
    }); // [{id, userId, name, type}, ...]

    return res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
}
