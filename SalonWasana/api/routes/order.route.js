import express from "express";
import { getAOrder,getAllOrders,updateOrder,deleteOrder,testOrder, getOrdersByCustomerId } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/test",testOrder)
router.get("/get-order/:id" , getAOrder);
router.get("/get-orders" , getAllOrders);
router.put('/update/:id',updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get("/customer/:id", getOrdersByCustomerId);



export default router;

