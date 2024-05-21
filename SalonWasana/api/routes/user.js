import express from "express";
import { deleteUser, getUsers, signin, signout, signup, updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/register",signup);
router.post("/signin",signin);
router.put("/update/:id" , verifyToken , updateUser);
router.delete("/delete/:id" , verifyToken , deleteUser);
router.get('/signout',signout);
router.get('/getusers', verifyToken, getUsers);



export default router;