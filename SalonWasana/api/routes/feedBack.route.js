import express from "express";
import { 
    create,
    getFeedBack,
    updateFeedBack,
    deleteFeedBack
 } from "../controllers/feedBack.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getFeedBack)
router.put("/:id", updateFeedBack)
router.delete("/:id" ,deleteFeedBack)

export default router;

