import express from "express";
import { 
    create,
    getCourse,
    updateCourse,
    deleteCourse
 } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getCourse)
router.put("/:id", updateCourse)
router.delete("/:id" , deleteCourse)

export default router;

