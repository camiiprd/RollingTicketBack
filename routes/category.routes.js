import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { verifyToken, restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getCategories);
router.post("/", verifyToken, restrictTo(['admin']), createCategory);
router.put("/:id", verifyToken, restrictTo(['admin']), updateCategory);
router.delete("/:id", verifyToken, restrictTo(['admin']), deleteCategory);

export default router;