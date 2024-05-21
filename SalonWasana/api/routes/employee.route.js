import express from "express";
import { 
    create,
    getEmployee,
    updateEmployee,
    deleteEmployee
 } from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getEmployee)
router.put("/:id", updateEmployee)
router.delete("/:id" ,deleteEmployee)



export default router;

