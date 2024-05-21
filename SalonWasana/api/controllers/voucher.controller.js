import Voucher from "../models/voucher.model.js";
import { errorHandler } from "../utils/error.js";

//Add new voucher to databse
export const addVoucher = async (req, res, next) => {
    if (!req.body.voucherName || !req.body.voucherCode || !req.body.description || !req.body.discountType || !req.body.discountValue) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      const voucherName = req.body.voucherName;
      const voucherCode = req.body.voucherCode;
      const description = req.body.description;
      const discountType = req.body.discountType;
      const discountValue = req.body.discountValue;

      //create new object with voucher model
      const newVocher = new Voucher({
        voucherName,voucherCode,description,discountType,discountValue
      })

      try {
        const savedVoucher = await newVocher.save(); // save to database using new created object and save details to savedVoucher variavle
        res.status(201).json(savedVoucher);//send result to frontend
      } catch (error) {
        next(error);
      }
}

//get all voucher details from database
export const getAllVouchers = async (req, res, next) => {
  Voucher.find().then((voucher)=>{
    res.json(voucher);
  }).catch((error)=>{
      console.log(error);
  })
}

//get only one voucher details from databse
export const getAVoucher = async (req, res, next) => {
  try {
    const voucherId = req.params.id;
    const voucher = await Voucher.findById(voucherId);
    
    if (!voucher) {
        return res.status(404).json({ error: 'Voucher not found' });
    }
    
    res.json(voucher);    

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
}

//update  the existing voucher in the database
export const updateVoucher = async (req, res, next) => {
    let voucherId = req.params.id;
    const {voucherName,voucherCode,description,discountType,discountValue,isActive} = req.body;
    
    // console.log(req.body);

    const updateVoucher = {
      voucherName,voucherCode,description,discountType,discountValue,isActive,
    }

    try {
        await Voucher.findByIdAndUpdate(voucherId, updateVoucher);
        res.status(200).json(updateVoucher);
    } catch (error) {
        next(error);
    }
}

//delete  a specific voucher from the database
export const deleteVoucher = async (req, res, next) => {
  let voucherId = req.params.id;
    try {
        await Voucher.findByIdAndDelete(voucherId);
        res.status(200).json('The Voucher has been deleted');
      } catch (error) {
        next(error);
      }
}

//testing route
export const testVoucher = (req, res) => {
    res.json({ msg: "Voucher route works" });// for postman testing purpose
}