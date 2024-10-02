import { Router } from "express";
import { createAboutUs, getAboutUs,updateAboutUs,deleteAboutUs } from "../controllers/aboutus.controller";

const router = Router();

router.get("/", getAboutUs);
router.post("/", createAboutUs);
router.put("/", updateAboutUs);
router.delete("/", deleteAboutUs);

export default router;
