import express from "express";
import { 
    create,
    getInventory,
    updateInventory,
    deleteInventory
 } from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getInventory)
router.put("/:id", updateInventory)
router.delete("/:id" , deleteInventory)

export default router;

