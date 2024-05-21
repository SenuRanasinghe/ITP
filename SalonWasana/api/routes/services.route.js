import express from "express";
import { 
    create,
    getServises,
    updateServises,
    deleteServises
 } from "../controllers/servises.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getServises)
router.put("/:id", updateServises)
router.delete("/:id" ,deleteServises)

export default router;

