import express from "express";
import { addVoucher,getAVoucher,getAllVouchers,updateVoucher,deleteVoucher,testVoucher } from "../controllers/voucher.controller.js";


const router = express.Router();

router.get("/test",testVoucher)
router.post("/create",addVoucher);
router.get("/get-voucher/:id" , getAVoucher);
router.get("/get-vouchers" , getAllVouchers);
router.put('/update/:id',updateVoucher);
router.delete('/delete/:id', deleteVoucher);



export default router;