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
