import express from "express";
import { 
    create,
    getAppointment,
    updateAppointment,
    deleteAppointment
 } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/", create)
router.get("/", getAppointment)
router.put("/:id", updateAppointment)
router.delete("/:id" , deleteAppointment)

export default router;

