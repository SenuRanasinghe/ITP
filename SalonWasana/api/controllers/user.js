import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
  const { name, email, phone, password} = req.body;

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;

  if (!name || !email || !phone || !password  ||
    name === "" || email === "" || phone === "" || password === "" ) {
      return next(errorHandler(400, 'All fields are required'));
  } else if (!emailRegex.test(email)) {
      return next(errorHandler(400, 'Invalid email format'));
  } else if (!mobileRegex.test(phone)) {
      return next(errorHandler(400, 'Invalid mobile number format'));
  } else if (!passwordRegex.test(password)) {
      return next(errorHandler(400, 'Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+).'));
  }else if (name.length < 5 || req.body.name.length > 15) {
    return next(errorHandler(400, 'Username must be between 5 and 15 characters'));
}

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, phone });

  try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
  } catch (err) {
      next(err);
  }
};

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || email==="" || password===""){
      next(errorHandler(400,"All fields are required"));
    }
    try{
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'User not found!'));
      const validPassword = bcryptjs.compareSync(password,validUser.password);
      if(!validPassword) return next(errorHandler(400,'Invalid Credentials!'));
      const token = jwt.sign({id:validUser._id , isAdmin:validUser.isAdmin},process.env.JWT_SECRET);
      const{password:hashedPassword, ...rest} = validUser._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie('acess_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    }catch(error){
      next(error);
    }
  }
  export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your Account'));
    }
  
    try {
      const updates = {};
      if (req.body.password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
        if (!passwordRegex.test(req.body.password)) {
          return next(errorHandler(400, 'Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+).'));
        }
        updates.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      if (req.body.name) {
        if (req.body.name.length < 5 || req.body.name.length > 15) {
          return next(errorHandler(400, 'Name must be between 5 and 15 characters'));
        }
        updates.name = req.body.name;
      }
  
      if (req.body.phone) {
        const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
        if (!mobileRegex.test(req.body.phone)) {
          return next(errorHandler(400, 'Invalid mobile number format.'));
        }
        updates.phone = req.body.phone;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
      );
  
      if (!updatedUser) {
        return next(errorHandler(404, 'User not found'));
      }
  
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser = async(req,res,next)=>{
    if (!req.user.isAdmin && req.user.id !== req.params.id) {
      return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
  
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been Deleted...")
    } catch (error) {
        next(error)
    }
  }

  export const signout = (req, res, next) => {
    try {
      res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };

  export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
        const searchTerm = req.query.searchTerm || '';
  
      const usersQuery = User.find({
  
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { phone: { $regex: searchTerm, $options: 'i' } },
         
        ]
       
      });
  
      const users = await usersQuery
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
  
      });
    } catch (error) {
      next(error);
    }
  };
  
  