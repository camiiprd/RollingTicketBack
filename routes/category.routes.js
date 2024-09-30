import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";


const router = Router();

router.get("/", getCategories);
router.post("/",  createCategory);
router.put("/:id", updateCategory);
router.delete("/:id",  deleteCategory);

export default router;